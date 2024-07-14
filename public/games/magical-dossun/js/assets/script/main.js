window.gLocalAssetContainer["main"] = function(g) { (function(exports, require, module, __filename, __dirname) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
var gameScene_1 = require("./game_scene/gameScene");
var titleScene_1 = require("./title_scene/titleScene");
var customLoadingScene_1 = require("./loading_scene/customLoadingScene");
function main(param) {
    g.game.audio.music.volume = 0.75;
    g.game.audio.sound.volume = 0.75;
    g.game.vars.gameState = {
        score: 0,
        playThreshold: 100,
        clearThreshold: undefined,
    };
    g.game.loadingScene = new customLoadingScene_1.CustomLoadingScene();
    //const totalTimeLimit = param.sessionParameter.totalTimeLimit ?? 75;
    var titleScene = new titleScene_1.TitleScene(param, 7);
    titleScene.onFinish.add(function (_) {
        g.game.replaceScene(new gameScene_1.GameScene(param, 60));
    });
    g.game.pushScene(titleScene);
}
exports.main = main;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}