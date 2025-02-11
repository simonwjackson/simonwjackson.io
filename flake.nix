{
  description = "Astro.js Portfolio Site";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = {
    self,
    nixpkgs,
    flake-utils,
  }:
    flake-utils.lib.eachDefaultSystem (
      system: let
        pkgs = nixpkgs.legacyPackages.${system};
      in {
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            nodejs_latest
            pnpm
            typescript
            typescript-language-server
            nodePackages.eslint
          ];

          shellHook = ''
            echo "Node.js development environment loaded"
            export LANG=en_US.UTF-8
          '';
        };
      }
    );
}
