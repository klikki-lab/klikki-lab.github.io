window.gLocalAssetContainer["SceneController"] = function(g) { (function(exports, require, module, __filename, __dirname) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SceneController = void 0;
var GameScene_1 = require("./GameScene");
var TitleScene_1 = require("./TitleScene");
var HowToPlayScene_1 = require("./HowToPlayScene");
var SceneController = /** @class */ (function () {
    function SceneController(param) {
        g.game.pushScene(this.createTitleScene(param));
    }
    SceneController.prototype.createTitleScene = function (param) {
        var _this = this;
        var titleScene = new TitleScene_1.TitleScene(param);
        titleScene.onClickStartGame.add(function (gameMode) {
            g.game.replaceScene(_this.createGameScene(param, gameMode));
        });
        titleScene.onFinish.add(function (_) {
            g.game.replaceScene(_this.createHowToPlayScene(param));
        });
        return titleScene;
    };
    ;
    SceneController.prototype.createHowToPlayScene = function (param) {
        var _this = this;
        var howToPlayScene = new HowToPlayScene_1.HowToPlayScene(param);
        howToPlayScene.onFinish.add(function (_) {
            g.game.replaceScene(_this.createGameScene(param, TitleScene_1.TitleScene.GAME_MODE_NORMAL));
        });
        return howToPlayScene;
    };
    SceneController.prototype.createGameScene = function (param, gameMode) {
        var _this = this;
        var gameScene = new GameScene_1.GameScene(param, gameMode);
        gameScene.onFinish.add(function (_) {
            g.game.replaceScene(_this.createTitleScene(param));
        });
        return gameScene;
    };
    return SceneController;
}());
exports.SceneController = SceneController;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}