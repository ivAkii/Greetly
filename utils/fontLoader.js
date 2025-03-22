const { GlobalFonts } = require("@napi-rs/canvas");

module.exports.registerFonts = () => {
  GlobalFonts.registerFromPath("./fonts/Vampire Wars.ttf", "Vampire Wars");
  GlobalFonts.registerFromPath("./fonts/Quicksand-SemiBold.ttf", "Quicksand-SemiBold");
  GlobalFonts.registerFromPath("./fonts/Montserratb.ttf", "Montserrat-Bold");
};
