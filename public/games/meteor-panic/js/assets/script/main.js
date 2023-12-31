window.gLocalAssetContainer["main"] = function(g) { (function(exports, require, module, __filename, __dirname) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
var gameScene_1 = require("./game_scene/gameScene");
var titleScene_1 = require("./title_scene/titleScene");
function main(param) {
    var _a;
    g.game.vars.gameState = {
        score: 0,
        playThreshold: 100,
        clearThreshold: undefined,
    };
    g.game.audio.music.volume = 0.5;
    g.game.audio.sound.volume = 0.5;
    g.game.vars.version = "0.1.3"; //バージョン更新忘れずに!!
    var isDebug = false;
    var random = (_a = param.random) !== null && _a !== void 0 ? _a : g.game.random;
    //const _totalTimeLimit = param.sessionParameter.totalTimeLimit ?? 116;
    var titleTimeLimit = 7;
    var gameTimeLimit = 99;
    var titleScene = new titleScene_1.TitleScene(titleTimeLimit);
    titleScene.onFinish.add(function (props) {
        if (props.muteBGM)
            g.game.audio.music.volume = 0;
        if (props.muteSE)
            g.game.audio.sound.volume = 0;
        var gameScene = new gameScene_1.GameScene(random, gameTimeLimit, props.background, isDebug);
        g.game.replaceScene(gameScene);
    });
    g.game.pushScene(titleScene);
}
exports.main = main;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}