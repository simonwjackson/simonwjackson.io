#!/bin/sh
# Write a plain Markdown copy of every published log next to its HTML page:
#   content/logs/<name>.md or content/logs/<name>/index.md
#   -> <out>/logs/<slug>/index.md
# Zola cannot output raw Markdown, so this runs after `zola build`.
# It uses only POSIX sh and awk, because it runs on Vercel's build image.
#
# Usage: scripts/emit-markdown.sh [output-dir]   (default: public)
set -eu

out=${1:-public}
base_url=$(awk -F'"' '/^base_url *=/ { print $2; exit }' config.toml)
holder=$(awk -F'"' '/^copyright_holder *=/ { print $2; exit }' config.toml)
[ -n "$base_url" ] || { echo "emit-markdown: no base_url in config.toml" >&2; exit 1; }
[ -d "$out" ] || { echo "emit-markdown: $out does not exist; run zola build first" >&2; exit 1; }

# Print one front-matter value: a quoted string, or a bare true/false/date.
field() {
  awk -v key="$2" '
    NR == 1 && $0 == "+++" { fm = 1; next }
    fm && $0 == "+++" { exit }
    fm {
      line = $0
      if (match(line, "^" key "[ \t]*=[ \t]*")) {
        v = substr(line, RLENGTH + 1)
        sub(/[ \t]*#.*$/, "", v)
        if (v ~ /^".*"$/) { v = substr(v, 2, length(v) - 2); gsub(/\\"/, "\"", v) }
        print v
        exit
      }
    }
  ' "$1"
}

count=0
for src in content/logs/*.md content/logs/*/index.md; do
  [ -f "$src" ] || continue
  case "$src" in */_index.md) continue ;; esac
  [ "$(field "$src" draft)" = "true" ] && continue

  slug=$(field "$src" slug)
  if [ -z "$slug" ]; then
    case "$src" in
      */index.md) slug=$(basename "$(dirname "$src")") ;;
      *) slug=$(basename "$src" .md) ;;
    esac
  fi
  dir="$out/logs/$slug"
  [ -f "$dir/index.html" ] || { echo "emit-markdown: no $dir/index.html for $src" >&2; exit 1; }

  title=$(field "$src" title)
  description=$(field "$src" description)
  date=$(field "$src" date)
  agent=$(field "$src" agent)
  model=$(field "$src" agent_model)
  maker=$(field "$src" agent_maker)
  reviewed=$(field "$src" reviewed)
  repository=$(field "$src" repository)
  [ -n "$agent" ] && [ -n "$model" ] && [ -n "$reviewed" ] ||
    { echo "emit-markdown: $src needs extra.agent, extra.agent_model and extra.reviewed" >&2; exit 1; }

  if [ "$reviewed" = "true" ]; then review="He read this log before publishing it."
  else review="He did not edit or review this log."; fi
  made_by=""
  [ -n "$maker" ] && made_by=", made by $maker"

  {
    printf '# %s\n\n' "$title"
    printf '> %s (%s%s) wrote this log while it did the work. %s directed the work and ran each step on real hardware. %s\n' \
      "$agent" "$model" "$made_by" "$holder" "$review"
    printf '>\n> Web version: %s/logs/%s/\n' "$base_url" "$slug"
    [ -n "$repository" ] && printf '> Code: %s\n' "$repository"
    [ -n "$date" ] && printf '> Published: %s\n' "$date"
    printf '> License: CC0 1.0, https://creativecommons.org/publicdomain/zero/1.0/\n\n'
    [ -n "$description" ] && printf '%s\n\n' "$description"
    awk 'NR == 1 && $0 == "+++" { fm = 1; next } fm && $0 == "+++" { fm = 0; body = 1; next } body' "$src"
  } > "$dir/index.md"
  count=$((count + 1))
done
echo "emit-markdown: wrote $count Markdown cop$( [ "$count" = 1 ] && echo y || echo ies)"
