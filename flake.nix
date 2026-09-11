{
  description = "Simon W. Jackson - Personal Site (Zola)";

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

        # Nivis theme requires Zola >= 0.23.4
        zola =
          if system == "x86_64-linux" then
            pkgs.stdenv.mkDerivation {
              pname = "zola";
              version = "0.23.4";
              src = pkgs.fetchurl {
                url = "https://github.com/getzola/zola/releases/download/v0.23.4/zola-v0.23.4-x86_64-unknown-linux-musl.tar.gz";
                sha256 = "0cc59jmdrw60g2cadi29vj9nmda5sza1jhrxv2h0kydv5qq5376r";
              };
              sourceRoot = ".";
              installPhase = "install -m755 -D zola $out/bin/zola";
            }
          else
            pkgs.zola;
      in {
        packages.default = zola;

        devShells.default = pkgs.mkShell {
          buildInputs = [
            zola
            pkgs.git
          ];

          shellHook = ''
            echo "Zola ($(${zola}/bin/zola --version)) development environment loaded"
          '';
        };
      }
    );
}
