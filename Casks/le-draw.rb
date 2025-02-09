cask "le-draw" do
  arch arm: "arm64"

  version "1.0.0"
  sha256 arm: "fc46ddfea425a77dfaa8d178a8badeab8860e59bb3165eb56a3b4d7d4b482174"

  url "https://github.com/leafac/le-draw/releases/download/v#{version.major_minor_patch}/Le-draw.app.zip",
      verified: "github.com/leafac/le-draw/"
  name "Le-draw"
  desc "Draw on top of your computer screen"
  homepage "https://github.com/leafac/le-draw"

  depends_on macos: ">= :big_sur"

  app "Le-draw.app"
end