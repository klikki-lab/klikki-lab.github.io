window.gLocalAssetContainer["TitleScene"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
var Backgroung_1 = require("./Backgroung");
var BaseScene_1 = require("./BaseScene");
var Button_1 = require("./Button");
var BlackVirus_1 = require("./virus/BlackVirus");
var WhiteVirus_1 = require("./virus/WhiteVirus");
var TitleScene = /** @class */ (function (_super) {
    __extends(TitleScene, _super);
    function TitleScene(param, lifeTimeSec) {
        if (lifeTimeSec === void 0) { lifeTimeSec = TitleScene.LIFE_TIME_SEC; }
        var _this = _super.call(this, {
            game: g.game,
            name: "TitleScene",
            assetIds: [
                "se_bound",
                "title_logo", "how_to_play", "mode_normal", "mode_normal_msg", "mode_hardcore", "mode_hardcore_msg",
                "black_1", "white_1",
            ],
        }, lifeTimeSec) || this;
        _this.onClickStartGame = new g.Trigger();
        console.log(param);
        _this.append(new Backgroung_1.Backgroung(_this));
        var virusLayer = new g.E({ scene: _this });
        _this.append(virusLayer);
        _this.onLoad.add(function (_) {
            var fontSize = 16;
            var font = new g.DynamicFont({
                game: g.game,
                fontFamily: "monospace",
                size: fontSize
            });
            var version = new g.Label({
                scene: _this,
                text: "ver. ".concat(g.game.vars.version),
                font: font,
                textColor: "white",
            });
            _this.append(version);
            var titleLogo = new g.Sprite({
                scene: _this,
                src: _this.asset.getImageById("title_logo")
            });
            titleLogo.x = (g.game.width - titleLogo.width) / 2;
            titleLogo.y = titleLogo.height * 0.1;
            titleLogo.modified();
            _this.append(titleLogo);
            var normalModeButton = new Button_1.Button(_this, "mode_normal");
            normalModeButton.x = g.game.width / 4;
            normalModeButton.y = titleLogo.y + titleLogo.height + normalModeButton.height * 0.7;
            normalModeButton.modified();
            normalModeButton.onClick.add(function (_tag) {
                _this.onUpdate.removeAll();
                _this.onClickStartGame.fire(TitleScene.GAME_MODE_NORMAL);
            });
            var normalMsg = new g.Sprite({ scene: _this, src: _this.asset.getImageById("mode_normal_msg") });
            normalMsg.x = g.game.width / 4 - normalMsg.width / 2;
            normalMsg.y = normalModeButton.y + normalModeButton.height * 0.55;
            normalMsg.modified();
            var hardcoreButton = new Button_1.Button(_this, "mode_hardcore");
            hardcoreButton.x = g.game.width / 2 + g.game.width / 4;
            hardcoreButton.y = titleLogo.y + titleLogo.height + hardcoreButton.height * 0.7;
            hardcoreButton.modified();
            hardcoreButton.onClick.add(function (_tag) {
                _this.onUpdate.removeAll();
                _this.onClickStartGame.fire(TitleScene.GAME_MODE_HARDCORE);
            });
            var hardcoreMsg = new g.Sprite({ scene: _this, src: _this.asset.getImageById("mode_hardcore_msg") });
            hardcoreMsg.x = g.game.width / 2 + g.game.width / 4 - hardcoreMsg.width / 2;
            hardcoreMsg.y = hardcoreButton.y + hardcoreButton.height * 0.55;
            hardcoreMsg.modified();
            _this.append(normalMsg);
            _this.append(normalModeButton);
            _this.append(hardcoreMsg);
            _this.append(hardcoreButton);
            // if (param.isAtsumaru) {
            //     const howToPlayButton = new Button(this, "how_to_play");
            //     howToPlayButton.x = g.game.width - howToPlayButton.width * 0.6;
            //     howToPlayButton.y = howToPlayButton.height * 0.6;
            //     howToPlayButton.modified();
            //     howToPlayButton.onClick.add(_tag => {
            //         const howToPlayScene = new HowToPlayScene(param);
            //         howToPlayScene.onFinish.add(_ => {
            //             g.game.popScene();
            //         })
            //         g.game.pushScene(howToPlayScene);
            //     });
            //     this.append(howToPlayButton);
            //     const normalModeButton = new Button(this, "mode_normal");
            //     normalModeButton.x = g.game.width / 4;
            //     normalModeButton.y = titleLogo.y + titleLogo.height + normalModeButton.height * 0.7;
            //     normalModeButton.modified();
            //     normalModeButton.onClick.add(_tag => {
            //         this.onUpdate.removeAll();
            //         this.onClickStartGame.fire(TitleScene.GAME_MODE_NORMAL);
            //     });
            //     const normalMsg = new g.Sprite({ scene: this, src: this.asset.getImageById("mode_normal_msg") });
            //     normalMsg.x = g.game.width / 4 - normalMsg.width / 2;
            //     normalMsg.y = normalModeButton.y + normalModeButton.height * 0.55;
            //     normalMsg.modified();
            //     const hardcoreButton = new Button(this, "mode_hardcore");
            //     hardcoreButton.x = g.game.width / 2 + g.game.width / 4;
            //     hardcoreButton.y = titleLogo.y + titleLogo.height + hardcoreButton.height * 0.7;
            //     hardcoreButton.modified();
            //     hardcoreButton.onClick.add(_tag => {
            //         this.onUpdate.removeAll();
            //         this.onClickStartGame.fire(TitleScene.GAME_MODE_HARDCORE);
            //     });
            //     const hardcoreMsg = new g.Sprite({ scene: this, src: this.asset.getImageById("mode_hardcore_msg") });
            //     hardcoreMsg.x = g.game.width / 2 + g.game.width / 4 - hardcoreMsg.width / 2;
            //     hardcoreMsg.y = hardcoreButton.y + hardcoreButton.height * 0.55;
            //     hardcoreMsg.modified();
            //     this.append(normalMsg);
            //     this.append(normalModeButton);
            //     this.append(hardcoreMsg);
            //     this.append(hardcoreButton);
            //     const SCOREBOARDS_NORMAL_MODE = 1;
            //     const SCOREBOARDS_HARDCORE_MODE = 2;
            //     const scoreboards = window.RPGAtsumaru.experimental.scoreboards;
            //     scoreboards.getRecords(SCOREBOARDS_NORMAL_MODE)
            //         .then((_scoreboardData: ScoreboardData) => {
            //             const button1 = new Button(this, "ranking");
            //             button1.x = normalModeButton.x - normalModeButton.width / 2 + button1.width / 2;
            //             button1.y = normalModeButton.y - normalModeButton.height / 2 - button1.height / 1.5;
            //             button1.modified();
            //             button1.onClick.add(_tag => {
            //                 scoreboards.display(SCOREBOARDS_NORMAL_MODE);
            //             });
            //             this.append(button1);
            //         });
            //     scoreboards.getRecords(SCOREBOARDS_HARDCORE_MODE)
            //         .then((_scoreboardData: ScoreboardData) => {
            //             const button2 = new Button(this, "ranking");
            //             button2.x = hardcoreButton.x + hardcoreButton.width / 2 - button2.width / 2;
            //             button2.y = hardcoreButton.y - hardcoreButton.height / 2 - button2.height / 1.5;
            //             button2.modified();
            //             button2.onClick.add(_tag => {
            //                 scoreboards.display(SCOREBOARDS_HARDCORE_MODE);
            //             });
            //             this.append(button2);
            //         });
            // } else {
            //     this.setTimeout(() => {
            //         this.onUpdate.removeAll();
            //         this.onFinish.fire();
            //     }, this.lifeTimeSec * 1000);
            // }
            var frame = 0;
            var ARRIVE_PERIOD = g.game.fps / 3;
            _this.onUpdate.add(function (_) {
                if (frame++ % ARRIVE_PERIOD === 0) {
                    var virus = g.game.random.generate() > 0.5 ? new WhiteVirus_1.WhiteVirus(_this) : new BlackVirus_1.BlackVirus(_this);
                    virus.opacity = 0.5;
                    virusLayer.append(virus);
                    frame = 1;
                }
            });
        });
        return _this;
    }
    /** ニコ生仕様のノーマルモード */
    TitleScene.GAME_MODE_NORMAL = 0;
    /** アルマール仕様のハードコアモード */
    TitleScene.GAME_MODE_HARDCORE = 1;
    TitleScene.LIFE_TIME_SEC = 3;
    return TitleScene;
}(BaseScene_1.BaseScene));
exports.TitleScene = TitleScene;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}