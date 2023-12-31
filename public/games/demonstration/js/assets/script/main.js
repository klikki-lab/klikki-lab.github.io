window.gLocalAssetContainer["main"] = function(g) { (function(exports, require, module, __filename, __dirname) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
var mainScene_1 = require("./main/mainScene");
function main(param) {
    g.game.vars.version = "0.3.5"; //バージョン更新忘れずに!!
    g.game.pushScene(new mainScene_1.MainScene(param));
}
exports.main = main;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}