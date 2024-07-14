window.gLocalAssetContainer["main"] = function(g) { (function(exports, require, module, __filename, __dirname) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
var gameScene_1 = require("./game_scene/gameScene");
var loadingScene_1 = require("./loading_scene/loadingScene");
var titleScene_1 = require("./title_scene/titleScene");
function main(param) {
    g.game.vars.gameState = {
        score: 0,
        playThreshold: 100,
        clearThreshold: undefined,
    };
    // g.game.audio.music.volume = 0.5;
    // g.game.audio.sound.volume = 0.25;
    g.game.loadingScene = new loadingScene_1.CustomLoadingScene();
    var titleScene = new titleScene_1.TitleScene(param, 10, 0.5);
    titleScene.onFinish.add(function (props) {
        g.game.replaceScene(new gameScene_1.GameScene(param, 70, props));
    });
    g.game.pushScene(titleScene);
}
exports.main = main;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}