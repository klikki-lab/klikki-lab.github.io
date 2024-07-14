window.gLocalAssetContainer["titleScene"] = function(g) { (function(exports, require, module, __filename, __dirname) {
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.TitleScene = void 0;
var button_1 = require("../common/button");
var commonScene_1 = require("../common/commonScene");
var fontSize_1 = require("../common/fontSize");
var player_1 = require("../game_scene/character/player");
var teacher_1 = require("../game_scene/character/teacher");
var TitleScene = /** @class */ (function (_super) {
    __extends(TitleScene, _super);
    function TitleScene(timeLimit) {
        var _this = _super.call(this, {
            game: g.game,
            assetIds: [
                "img_bg", "img_player", "img_teacher", "img_surprise", "img_heat", "img_aura",
            ]
        }, timeLimit) || this;
        _this.onFinish = new g.Trigger();
        _this.loadHandler = function () {
            _this.font = new g.DynamicFont({
                game: g.game,
                fontFamily: "sans-serif",
                fontWeight: "bold",
                strokeWidth: (fontSize_1.FontSize.LARGE / 6) * 2,
                strokeColor: "#222",
                fontColor: "white",
                size: fontSize_1.FontSize.LARGE * 2
            });
            _this.createBackground();
            _this.createTitle();
            _this.createMessage();
            _this.createCopyright();
            var player = _this.createPlayer();
            var description = _this.createDescription(player);
            // const timer = new StartTimer(this, this.font, this.timeLimit);
            // timer.onTick.add(sec => {
            //     if (sec === 3) {
            //         this.createScoldedSummary();
            //     }
            // });
            // timer.onFinish.addOnce(() => this.onFinish.fire());
            // timer.start();
            // this.append(timer);
            description.show();
            _this.createScoldedSummary();
            var font = new g.DynamicFont({
                game: g.game,
                fontFamily: "sans-serif",
                fontWeight: "bold",
                strokeWidth: fontSize_1.FontSize.MEDIUM / 6,
                strokeColor: "#222",
                fontColor: "white",
                size: fontSize_1.FontSize.MEDIUM,
            });
            var startButton = new button_1.Button(_this, font, "START!");
            startButton.x = g.game.width / 2;
            startButton.y = g.game.height - startButton.height * 1.25;
            startButton.onClicked.add(function (_) { return _this.onFinish.fire(); });
            _this.append(startButton);
            _this.onPointDownCapture.add(function (ev) {
                if (ev.target instanceof button_1.Button)
                    return;
                player.startEating();
                //description.show();
            });
            _this.onPointUpCapture.add(function (ev) {
                if (ev.target instanceof button_1.Button)
                    return;
                player.stopEating();
                //description.hide();
            });
        };
        _this.createBackground = function () {
            new g.FilledRect({
                scene: _this,
                parent: _this,
                width: g.game.width,
                height: g.game.height,
                cssColor: "rgb(192,176,160)",
            });
        };
        _this.createTitle = function () {
            new g.Label({
                scene: _this,
                parent: _this,
                text: "早弁チャレンジ",
                font: _this.font,
                fontSize: fontSize_1.FontSize.LARGE * 2,
                x: g.game.width / 2,
                y: fontSize_1.FontSize.LARGE * 2,
                anchorX: 0.5,
                anchorY: 0.5,
            });
        };
        _this.createPlayer = function () {
            var player = new player_1.Player(_this);
            player.x = g.game.width / 2 - player.width * 2;
            player.y = (g.game.height + player.height) / 2;
            _this.append(player);
            return player;
        };
        _this.createMessage = function () {
            return new g.Label({
                scene: _this,
                parent: _this,
                text: "画面にタッチしてみよう！",
                font: _this.font,
                fontSize: fontSize_1.FontSize.MEDIUM,
                x: g.game.width / 2,
                y: fontSize_1.FontSize.LARGE * 5.5,
                anchorX: 0.5,
                anchorY: 0.5,
            });
        };
        _this.createDescription = function (player) {
            return new g.Label({
                scene: _this,
                parent: player,
                text: "長押し中は食べまくる！",
                font: _this.font,
                fontSize: fontSize_1.FontSize.MEDIUM,
                x: player.width / 2,
                y: -player.height / 4,
                anchorX: 0.5,
                anchorY: 0.5,
                hidden: true,
            });
        };
        _this.createScoldedSummary = function () {
            var player = new player_1.Player(_this);
            player.x = g.game.width / 2 + player.width * 2;
            player.y = (g.game.height + player.height) / 2;
            player.scolded();
            _this.append(player);
            var teacher = new teacher_1.Teacher(_this, g.game.random);
            teacher.x = player.x - teacher.width;
            teacher.y = player.y;
            teacher.startAngryAnimation();
            _this.append(teacher);
            new g.Label({
                scene: _this,
                parent: player,
                text: "先生に見つかるとタイムロスだ！",
                font: _this.font,
                fontSize: fontSize_1.FontSize.MEDIUM,
                x: player.width / 2,
                y: -player.height / 4,
                anchorX: 0.5,
                anchorY: 0.5,
            });
        };
        _this.createCopyright = function () {
            var font = new g.DynamicFont({
                game: g.game,
                fontFamily: "sans-serif",
                fontWeight: "bold",
                strokeWidth: (fontSize_1.FontSize.TINY / 4),
                strokeColor: "#222",
                fontColor: "white",
                size: fontSize_1.FontSize.TINY
            });
            new g.Label({
                scene: _this,
                parent: _this,
                text: "音楽 (C)PANICPUMPKIN",
                font: font,
                fontSize: fontSize_1.FontSize.TINY,
                x: g.game.width / 2,
                y: g.game.height - fontSize_1.FontSize.TINY,
                anchorX: 0.5,
                anchorY: 0.5,
            });
        };
        _this.onLoad.addOnce(_this.loadHandler);
        return _this;
    }
    return TitleScene;
}(commonScene_1.CommonScene));
exports.TitleScene = TitleScene;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}