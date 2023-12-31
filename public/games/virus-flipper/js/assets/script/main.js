window.gLocalAssetContainer["main"] = function(g) { (function(exports, require, module, __filename, __dirname) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
var SceneController_1 = require("./SceneController");
function main(param) {
    var totalTimeLimit = 78; // 制限時間
    if (param.sessionParameter.totalTimeLimit) {
        totalTimeLimit = param.sessionParameter.totalTimeLimit; // セッションパラメータで制限時間が指定されたらその値を使用します
    }
    // アツマールデバッグ用
    //param.isAtsumaru = true;
    g.game.vars.gameState = {
        score: 0,
        playThreshold: 100,
        clearThreshold: undefined, //クリア閾値
    };
    g.game.vars.version = "0.2.0.2"; //バージョン更新忘れずに!!
    g.game.audio.music.volume = 0.1;
    g.game.audio.sound.volume = 0.1;
    new SceneController_1.SceneController(param);
}
exports.main = main;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}