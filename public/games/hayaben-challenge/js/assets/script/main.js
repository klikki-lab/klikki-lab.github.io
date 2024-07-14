window.gLocalAssetContainer["main"] = function(g) { (function(exports, require, module, __filename, __dirname) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
var gameScene_1 = require("./game_scene/gameScene");
var titleScene_1 = require("./title_scene/titleScene");
function main(param) {
    g.game.audio.music.volume = 0.25;
    g.game.audio.sound.volume = 0.25;
    g.game.vars.gameState = {
        score: 0,
        playThreshold: 1,
        clearThreshold: undefined,
    };
    var titleScene = new titleScene_1.TitleScene(7);
    titleScene.onFinish.add(function () {
        g.game.replaceScene(new gameScene_1.GameScene(param, 50));
    });
    g.game.pushScene(titleScene);
}
exports.main = main;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}