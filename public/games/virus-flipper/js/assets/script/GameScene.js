window.gLocalAssetContainer["GameScene"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.GameScene = void 0;
var Backgroung_1 = require("./Backgroung");
var BaseScene_1 = require("./BaseScene");
var BounceEffect_1 = require("./BounceEffect");
var Button_1 = require("./Button");
var Finish_1 = require("./Finish");
var Flipper_1 = require("./Flipper");
var ScoreEffect_1 = require("./ScoreEffect");
var Score_1 = require("./Score");
var Start_1 = require("./Start");
var Ticker_1 = require("./Ticker");
var TitleScene_1 = require("./TitleScene");
var BlackVirus_1 = require("./virus/BlackVirus");
var BlackVirus2_1 = require("./virus/BlackVirus2");
var BlackVirus3_1 = require("./virus/BlackVirus3");
var Virus_1 = require("./virus/Virus");
var WhiteVirus_1 = require("./virus/WhiteVirus");
var WhiteVirus2_1 = require("./virus/WhiteVirus2");
var WhiteVirus3_1 = require("./virus/WhiteVirus3");
var GameScene = /** @class */ (function (_super) {
    __extends(GameScene, _super);
    function GameScene(param, gameMode, lifeTimeSec) {
        if (lifeTimeSec === void 0) { lifeTimeSec = GameScene.LIFE_TIME_SEC; }
        var _this = _super.call(this, {
            game: g.game,
            name: "GameScene",
            assetIds: [
                "bgm", "bgm_intro", "se_bound", "se_laugh", "font_glyphs", "bitmap_font",
                "start", "finish", "perfect", "home", "restart", "ranking",
                "black_1", "white_1", "black_2", "white_2", "black_3", "white_3",
                "bounce_effect",
            ],
        }, lifeTimeSec) || this;
        _this.levelRate = 1;
        _this.totalFrame = 0;
        _this.virusPeriod = 0;
        _this.updateHandler = function () {
            if (_this.virusPeriod % (Math.floor(GameScene.VIRUS_INVADE_PERIOD * _this.levelRate)) == 0) {
                _this.virusPeriod = 0;
                _this.virusLayer.append(_this.createVirus());
            }
            _this.virusPeriod++;
            _this.totalFrame++;
            if (_this.totalFrame % GameScene.LEVEL_UP_PERIOD == 0) {
                _this.virusPeriod %= Math.floor(GameScene.VIRUS_INVADE_PERIOD * _this.levelRate);
                if (_this.gameMode == TitleScene_1.TitleScene.GAME_MODE_NORMAL) {
                    var rate = _this.totalFrame < _this.lifeTimeSec * g.game.fps * 0.95 ?
                        GameScene.LEVEL_UP_RATE : Math.pow(GameScene.LEVEL_UP_RATE, 3);
                    _this.levelRate *= rate;
                }
                else {
                    _this.levelRate *= GameScene.LEVEL_UP_RATE;
                    _this.levelRate = Math.max(_this.levelRate, GameScene.MAX_LEVEL_UP_RATE);
                }
                console.log("levelRate=" + _this.levelRate);
            }
        };
        _this.gameMode = gameMode;
        _this.isAtsumaru = param.isAtsumaru;
        _this.random = g.game.random;
        _this.append(new Backgroung_1.Backgroung(_this));
        _this.onLoad.add(function (_) {
            _this.flipper = new Flipper_1.Flipper(_this);
            _this.score = new Score_1.Score(_this);
            _this.score.onCounterStop.add(function (_) { return _this.gameOver(); });
            _this.ticker = new Ticker_1.Ticker(_this, _this.lifeTimeSec);
            _this.ticker.hide();
            _this.ticker.onFinish.add(function (_) { return _this.gameOver(); });
            _this.virusLayer = new g.E({ scene: _this });
            var font = new g.DynamicFont({
                game: g.game,
                fontFamily: "monospace",
                size: 15
            });
            _this.label = new g.Label({
                scene: _this,
                text: "MISS:".concat(_this.score.getFailCount()),
                fontSize: 15,
                font: font,
                textColor: "white",
                x: g.game.width - 8 * 8,
                y: g.game.height / 4 * 3 - 15 * 2,
                hidden: true
            });
            _this.append(_this.flipper);
            _this.append(_this.virusLayer);
            _this.append(_this.label);
            _this.append(_this.ticker);
            _this.append(_this.score);
            _this.startMusic();
            _this.startGame();
        });
        return _this;
    }
    GameScene.prototype.startMusic = function () {
        var _this = this;
        var intro = this.asset.getAudioById("bgm_intro").play();
        intro.onStop.add(function (_) {
            _this.asset.getAudioById("bgm").play();
        });
    };
    /**
    * ゲーム初期化。
    */
    GameScene.prototype.init = function () {
        this.levelRate = 1;
        this.totalFrame = 0;
        this.virusPeriod = 0;
        var entities = this.virusLayer.children;
        if (entities) {
            for (var i = entities.length - 1; i >= 0; i--)
                entities[i].destroy();
        }
        this.score.init();
        this.flipper.init();
        this.label.text = "MISS:".concat(this.score.getFailCount());
        this.label.invalidate();
    };
    /**
     * ゲーム開始。
     */
    GameScene.prototype.startGame = function () {
        var _this = this;
        var start = new Start_1.Start(this);
        this.append(start);
        start.onFinish.add(function () {
            start.destroy();
            _this.onUpdate.add(_this.updateHandler);
            if (_this.gameMode === TitleScene_1.TitleScene.GAME_MODE_NORMAL) {
                if (!_this.ticker.visible()) {
                    _this.ticker.show();
                }
                _this.ticker.start();
            }
            else {
                _this.ticker.hide();
            }
        });
    };
    GameScene.prototype.gameOver = function () {
        var _this = this;
        this.onUpdate.remove(this.updateHandler);
        this.flipper.removeMouseEvent();
        if (this.virusLayer.children) {
            this.virusLayer.children.forEach(function (element) {
                if (element instanceof Virus_1.Virus) {
                    element.removeUpdate();
                }
                else if (element instanceof BounceEffect_1.BounceEffect) {
                    element.removeUpdate();
                }
                else if (element instanceof ScoreEffect_1.ScoreEffect) {
                    element.removeUpdate();
                }
            });
        }
        var finish = new Finish_1.Finish(this);
        finish.onFinish.add(function (_) {
            _this.showResult(finish);
        });
        this.append(finish);
    };
    GameScene.prototype.showResult = function (finish) {
        var _this = this;
        var isExcellent = this.score.isPerfect() && this.score.isExcellentScore();
        var perfect = undefined;
        var message = undefined;
        if (isExcellent) {
            perfect = new g.Sprite({
                scene: this,
                src: this.asset.getImageById("perfect")
            });
            perfect.x = finish.x - perfect.width / 4;
            perfect.y = finish.y - perfect.height / 3;
            this.append(perfect);
            if (!this.isAtsumaru) {
                var fontSize = 24;
                var font = new g.DynamicFont({
                    game: g.game,
                    fontFamily: "monospace",
                    size: fontSize,
                    fontColor: this.flipper.isWhite() ? Flipper_1.Flipper.COLOR_BLACK : Flipper_1.Flipper.COLOR_WHITE
                });
                message = new g.Label({
                    scene: this,
                    text: "エクセレント！アツマールでハードコアモードに挑戦してみよう！",
                    font: font
                });
                message.x = g.game.width - message.width - fontSize;
                message.y = g.game.height - message.height * 2;
                this.append(message);
            }
        }
        var homeButton = new Button_1.Button(this, "home");
        homeButton.x = g.game.width / 2 - homeButton.width * 2;
        homeButton.y = g.game.height / Flipper_1.Flipper.DIVISION * 3;
        homeButton.onClick.add(function (_tag) {
            _this.asset.getAudioById("bgm").stop();
            _this.onFinish.fire();
        });
        this.append(homeButton);
        var restartButton = new Button_1.Button(this, "restart");
        restartButton.x = g.game.width / 2 + restartButton.width * 2;
        restartButton.y = g.game.height / Flipper_1.Flipper.DIVISION * 3;
        restartButton.onClick.add(function (_tag) {
            destroyEntities();
            _this.init();
            _this.startGame();
        });
        this.append(restartButton);
        var destroyEntities = function () {
            finish.destroy();
            if (message) {
                message.destroy();
            }
            if (perfect) {
                perfect.destroy();
            }
            homeButton.destroy();
            restartButton.destroy();
        };
        if (!this.isAtsumaru)
            return;
        (function () {
            var SCOREBOARDS_ID = _this.gameMode + 1;
            var rankingButton = undefined;
            var scoreboards = window.RPGAtsumaru.experimental.scoreboards;
            scoreboards.setRecord(SCOREBOARDS_ID, g.game.vars.gameState.score)
                .then(function () {
                rankingButton = new Button_1.Button(_this, "ranking");
                rankingButton.x = g.game.width / 2 - rankingButton.width * 2;
                rankingButton.y = g.game.height / Flipper_1.Flipper.DIVISION * 3;
                rankingButton.onClick.add(function (_tag) {
                    scoreboards.display(SCOREBOARDS_ID);
                });
                _this.append(rankingButton);
                scoreboards.getRecords(SCOREBOARDS_ID)
                    .then(function (scoreboardData) {
                    if (scoreboardData.myRecord && scoreboardData.myRecord.isNewRecord) {
                        scoreboards.display(SCOREBOARDS_ID);
                    }
                });
            })
                .catch(function (error) {
                console.log(error);
                if ("INTERNAL_SERVER_ERROR" === error.code) {
                    // TODO
                }
            }).finally(function () {
                var homeButton = new Button_1.Button(_this, "home");
                homeButton.x = g.game.width / 2 - homeButton.width;
                homeButton.y = g.game.height / Flipper_1.Flipper.DIVISION * 3;
                homeButton.onClick.add(function (_tag) {
                    _this.asset.getAudioById("bgm").stop();
                    _this.onFinish.fire();
                });
                _this.append(homeButton);
                var restartButton = new Button_1.Button(_this, "restart");
                restartButton.x = g.game.width / 2 + restartButton.width * 2;
                restartButton.y = g.game.height / Flipper_1.Flipper.DIVISION * 3;
                restartButton.onClick.add(function (_tag) {
                    destroyEntities();
                    _this.init();
                    _this.startGame();
                });
                _this.append(restartButton);
                var destroyEntities = function () {
                    finish.destroy();
                    if (message) {
                        message.destroy();
                    }
                    if (perfect) {
                        perfect.destroy();
                    }
                    if (rankingButton) {
                        rankingButton.destroy();
                    }
                    homeButton.destroy();
                    restartButton.destroy();
                };
            });
        })();
    };
    GameScene.prototype.createVirus = function () {
        var _this = this;
        var isWhite = this.random.generate() < 0.5;
        var virus = undefined;
        if (this.totalFrame > g.game.fps * this.lifeTimeSec * 0.5) {
            if (this.levelRate > this.random.generate()) {
                virus = isWhite ?
                    new WhiteVirus3_1.WhiteVirus3(this, this.flipper.y) : new BlackVirus3_1.BlackVirus3(this, this.flipper.y);
            }
        }
        if (virus === undefined && this.totalFrame > g.game.fps * this.lifeTimeSec * 0.25) {
            if (this.levelRate > this.random.generate()) {
                virus = isWhite ?
                    new WhiteVirus2_1.WhiteVirus2(this, this.flipper.y) : new BlackVirus2_1.BlackVirus2(this, this.flipper.y);
            }
        }
        if (virus === undefined) {
            virus = isWhite ?
                new WhiteVirus_1.WhiteVirus(this, this.flipper.y) : new BlackVirus_1.BlackVirus(this, this.flipper.y);
        }
        virus.onCollideFlipper.add(function (vrs) {
            if (vrs.isWhite() !== _this.flipper.isWhite()) {
                _this.asset.getAudioById("se_bound").play();
                vrs.rebound();
                var addScore = _this.score.add();
                var bound_1 = new BounceEffect_1.BounceEffect(_this, vrs.x - vrs.width / 2, vrs.y + vrs.height / 4);
                bound_1.onFinish.add(function (_) {
                    _this.virusLayer.remove(bound_1);
                    bound_1.destroy();
                });
                _this.virusLayer.append(bound_1);
                var score_1 = new ScoreEffect_1.ScoreEffect(_this, addScore, vrs.x, vrs.y);
                score_1.onFinish.add(function (_) {
                    _this.virusLayer.remove(score_1);
                    score_1.destroy();
                });
                _this.virusLayer.append(score_1);
            }
        });
        virus.onPassing.add(function (_) {
            _this.asset.getAudioById("se_laugh").play();
            _this.score.fail();
            _this.label.text = "MISS:".concat(_this.score.getFailCount());
            _this.label.invalidate();
            if (TitleScene_1.TitleScene.GAME_MODE_HARDCORE === _this.gameMode) {
                _this.gameOver();
            }
        });
        return virus;
    };
    GameScene.LIFE_TIME_SEC = 60;
    GameScene.LEVEL_UP_PERIOD = g.game.fps * 5;
    GameScene.VIRUS_INVADE_PERIOD = g.game.fps * 0.75;
    /**ニコ生モードでは、1.0 から 実質0.3138（内部的には0.2287）まで難易度が上昇 */
    GameScene.LEVEL_UP_RATE = 0.90;
    /** ハードコアモード難易度最大に達すると、およそ 11.25フレーム(0.1875秒) ごとにウイルス出現 */
    GameScene.MAX_LEVEL_UP_RATE = Math.pow(GameScene.LEVEL_UP_RATE, 13);
    return GameScene;
}(BaseScene_1.BaseScene));
exports.GameScene = GameScene;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}