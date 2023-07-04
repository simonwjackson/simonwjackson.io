{
  description = "A simple derivation for the pnpm package";

  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";

  outputs = { self, nixpkgs }:
    let
      makeShell = system: with nixpkgs.legacyPackages.${system}; mkShell {
        buildInputs = [ nodePackages_latest.pnpm ];
        shellHook = ''
          pnpm i
        '';
      };
    in
    {
      devShell.x86_64-linux = makeShell "x86_64-linux";
      devShell.aarch64-linux = makeShell "aarch64-linux";

      # defaultPackage.x86_64-linux = self.packages.x86_64-linux.makeShell;
      # defaultPackage.aarch64-linux = self.packages.aarch64-linux.makeShell;
    };
}
