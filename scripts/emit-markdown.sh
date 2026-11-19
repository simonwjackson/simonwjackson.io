#!/bin/sh
# Write a plain Markdown copy of every published log and post next to its
# HTML page, so people and their agents can read the plain text:
#   content/logs/<name>.md or content/logs/<name>/index.md
#     -> <out>/logs/<slug>/index.md
#   content/posts/<name>.md or content/posts/<name>/index.md
#     -> <out>/posts/<slug>/index.md
# Zola cannot output raw Markdown, so this runs after `zola build`.
# Comic components (voice, agent, exchange, photo, logpart, brief) become
# plain Markdown. It uses only POSIX sh and awk, because it runs on
# Vercel's build image.
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

# Print the body of a content file as plain Markdown. $2 is the page's
# absolute URL (for photo links); $3 is the URL of its build log, if any.
body() {
  awk -v page="$2" -v log_url="$3" -v base="$base_url" '
    function attr(s, name,   m) {
      if (match(s, name "=\"[^\"]*\"")) { m = substr(s, RSTART, RLENGTH); sub(/^[^"]*"/, "", m); sub(/"$/, "", m); return m }
      return ""
    }
    function abs(u) { return (u ~ /^\//) ? base u : u }
    function flag(s, name) { return s ~ (name "=\\{true\\}") }
    function inner(s, tag,   t) { t = s; sub(/^\{% <[^>]*> %\}/, "", t); sub("\\{% </" tag "> %\\}$", "", t); return t }
    NR == 1 && $0 == "+++" { fm = 1; next }
    fm && $0 == "+++" { fm = 0; inbody = 1; next }
    !inbody { next }
    /^\{% <voice / {
      who = attr($0, "who"); name = toupper(substr(who, 1, 1)) substr(who, 2)
      print "**" name ":** " inner($0, "voice"); next
    }
    /^\{% <agent / {
      head = "Agent"; w = attr($0, "when"); if (w != "") head = head ", " w
      pre = flag($0, "cut") ? "↯ " : ""
      src = abs(attr($0, "src")); link = (src != "") ? " ([original](" src "))" : ""
      print pre "**" head "**" link ": " inner($0, "agent"); next
    }
    /^\{% <exchange / {
      said = attr($0, "said"); note = attr($0, "said_note"); src = abs(attr($0, "said_src"))
      tag = (note != "") ? " (" tolower(note) ", [original](" src "))" : " ([original](" src "))"
      print "> **Simon:** " said tag
      reply = inner($0, "exchange")
      if (reply != "") {
        head = "Agent"; w = attr($0, "did_when"); if (w != "") head = head ", " w
        pre = flag($0, "cut") ? "↯ " : ""
        print ">"; print "> " pre "**" head ":** " reply
      }
      next
    }
    /^\{\{<photo / {
      t = attr($0, "time"); cap = (t != "") ? " (" t ")" : ""
      print "![" attr($0, "alt") "](" page attr($0, "src") ")" cap; next
    }
    /^\{\{<logpart / {
      if (log_url != "") {
        n = split(attr($0, "ids"), ids, ",")
        print "Build log for this part: " log_url "#" ids[1] " (Markdown: " log_url "index.md)"
      }
      next
    }
    /^\{% <brief[ >]/ { next }
    /^\{% <\/brief> %\}$/ { next }
    { print }
  ' "$1"
}

# slug_of FILE: the front-matter slug, or the file or folder name.
slug_of() {
  s=$(field "$1" slug)
  if [ -z "$s" ]; then
    case "$1" in
      */index.md) s=$(basename "$(dirname "$1")") ;;
      *) s=$(basename "$1" .md) ;;
    esac
  fi
  printf '%s' "$s"
}

count=0
for src in content/logs/*.md content/logs/*/index.md; do
  [ -f "$src" ] || continue
  case "$src" in */_index.md) continue ;; esac
  [ "$(field "$src" draft)" = "true" ] && continue

  slug=$(slug_of "$src")
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
  story=$(field "$src" story)
  [ -n "$agent" ] && [ -n "$model" ] && [ -n "$reviewed" ] ||
    { echo "emit-markdown: $src needs extra.agent, extra.agent_model and extra.reviewed" >&2; exit 1; }

  if [ "$reviewed" = "true" ]; then review="He read this log before publishing it."
  else review="He did not edit or review this log."; fi
  made_by=""
  [ -n "$maker" ] && made_by=", made by $maker"

  {
    printf '# %s\n\n' "$title"
    printf '> %s (%s%s) wrote this log. %s directed the work and ran each step on real hardware. %s\n' \
      "$agent" "$model" "$made_by" "$holder" "$review"
    printf '>\n> Web version: %s/logs/%s/\n' "$base_url" "$slug"
    [ -n "$story" ] && printf '> %s'"'"'s post about the same work: %s%sindex.md\n' "$holder" "$base_url" "$story"
    [ -n "$repository" ] && printf '> Code: %s\n' "$repository"
    [ -n "$date" ] && printf '> Published: %s\n' "$date"
    printf '> License: CC0 1.0, https://creativecommons.org/publicdomain/zero/1.0/\n\n'
    [ -n "$description" ] && printf '%s\n\n' "$description"
    body "$src" "$base_url/logs/$slug/" ""
  } > "$dir/index.md"
  count=$((count + 1))
done

for src in content/posts/*.md content/posts/*/index.md; do
  [ -f "$src" ] || continue
  case "$src" in */_index.md) continue ;; esac
  [ "$(field "$src" draft)" = "true" ] && continue

  slug=$(slug_of "$src")
  dir="$out/posts/$slug"
  [ -f "$dir/index.html" ] || { echo "emit-markdown: no $dir/index.html for $src" >&2; exit 1; }

  title=$(field "$src" title)
  description=$(field "$src" description)
  date=$(field "$src" date)
  byline=$(field "$src" byline)
  [ -n "$byline" ] || byline=$holder
  log=$(field "$src" log)
  log_url=""
  [ -n "$log" ] && log_url="$base_url$log"

  {
    printf '# %s\n\n' "$title"
    printf '> By %s.\n>\n> Web version: %s/posts/%s/\n' "$byline" "$base_url" "$slug"
    [ -n "$log_url" ] && printf '> Build log of the same work, written by an AI agent: %sindex.md\n' "$log_url"
    [ -n "$date" ] && printf '> Published: %s\n' "$date"
    printf '\n'
    [ -n "$description" ] && printf '%s\n\n' "$description"
    body "$src" "$base_url/posts/$slug/" "$log_url"
  } > "$dir/index.md"
  count=$((count + 1))
done
echo "emit-markdown: wrote $count Markdown cop$( [ "$count" = 1 ] && echo y || echo ies)"
