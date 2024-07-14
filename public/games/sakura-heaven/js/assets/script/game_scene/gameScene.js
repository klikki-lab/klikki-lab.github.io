window.gLocalAssetContainer["gameScene"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
var fontSize_1 = require("../common/fontSize");
var chart_1 = require("./chart/chart");
var chartSequencer_1 = require("./chart/chartSequencer");
var petalEffect_1 = require("./effect/petalEffect");
var ratingScore_1 = require("./effect/ratingScore");
var countdownTimer_1 = require("./hud/countdownTimer");
var score_1 = require("./hud/score");
var dispersal_1 = require("./sakura/dispersal");
var bloom_1 = require("./sakura/bloom");
var sakuraNote_1 = require("./sakura/sakuraNote");
var noteGuide_1 = require("./sakura/noteGuide");
var bloomEffect_1 = require("./effect/bloomEffect");
var titleScene_1 = require("../title_scene/titleScene");
var common_1 = require("../common/common");
var blackout_1 = require("./blackout");
var keyEvent_1 = require("../common/keyEvent");
var beatLabel_1 = require("../common/beatLabel");
var border_1 = require("./sakura/border");
var button_1 = require("../common/button");
var GameScene = /** @class */ (function (_super) {
    __extends(GameScene, _super);
    function GameScene(_param, timeLimit, props) {
        var _this = _super.call(this, {
            game: g.game,
            assetIds: [
                "img_sakura", "img_sakura_no_gradation", "img_sakura_border", "img_petal",
                "img_perfect", "img_excellent", "img_good", "img_bad",
                "bgm_honjitsumouchoutennnari",
                "se_spawn", "se_perfect", "se_excellent", "se_good", "se_bad",
            ],
        }) || this;
        _this._param = _param;
        _this.timeLimit = timeLimit;
        _this.props = props;
        _this.posTable = [];
        _this.createSequencer = function (charts, bpm, timeBase) {
            var sequencer = new chartSequencer_1.ChartSequencer(charts, bpm, timeBase);
            sequencer.onStart.add(function (_) {
                if (_this.props.isAlreadyClicked) {
                    _this.timer.start();
                }
            });
            sequencer.onNote.add(function (_) {
                _this.playSoundEffect("se_spawn");
                _this.appendNote();
            });
            sequencer.onFinish.add(function (_) {
                _this.setTimeout(function () {
                    var _a;
                    _this.gameOver();
                    _this.onUpdate.add(function () { return _this.effectLayer.append(new petalEffect_1.PetalEffect(_this, _this.guide)); });
                    _this.onPointDownCapture.add(addClickListner);
                    (_a = _this.keyEvent) === null || _a === void 0 ? void 0 : _a.onKeyDown.add(addClickListner);
                }, 750);
                if (_this.onPointDownCapture.contains(_this.waitClickListener)) {
                    _this.onPointDownCapture.remove(_this.waitClickListener);
                }
            });
            var addClickListner = function () {
                _this.playSoundEffect("se_spawn");
                _this.guide.beat();
                _this.bloomLayer.append(new bloomEffect_1.BloomEffect(_this, _this.guide, ratingScore_1.Rating.PERFECT.scoreRate));
            };
            return sequencer;
        };
        _this.appendNote = function () {
            var note = new sakuraNote_1.SakuraNote(_this, _this.guide, _this.sequencer.bpm);
            note.onFailed.addOnce(function (_note) { return failed(); });
            note.onClicked.addOnce(function (note) {
                var rating = (0, ratingScore_1.withinTimingWindow)(note.ticks);
                switch (rating) {
                    case ratingScore_1.Rating.PERFECT:
                        appendBloomSakura(rating.scoreRate + 0.5, note);
                        break;
                    case ratingScore_1.Rating.SEMI_PERFECT:
                        appendBloomSakura(rating.scoreRate, note);
                        break;
                    case ratingScore_1.Rating.EXCELLENT:
                    case ratingScore_1.Rating.GOOD:
                        appendBloomSakura(rating.scoreRate, _this.guide);
                        break;
                    case ratingScore_1.Rating.BAD:
                        failed();
                        _this.bloomLayer.append(new border_1.Border(_this, _this.guide));
                        return;
                }
                result(rating);
            });
            _this.notesLayer.append(note);
            var appendBloomSakura = function (scoreRate, target) {
                _this.bloomLayer.append(new bloomEffect_1.BloomEffect(_this, target, scoreRate));
                _this.bloomLayer.append(new bloom_1.Bloom(_this, target, scoreRate));
            };
            var result = function (rating) {
                _this.score.add(rating);
                _this.playSoundEffect(rating.assetId.sound);
                _this.ratingLayer.append(new ratingScore_1.RatingScore(_this, note, rating));
            };
            var failed = function () {
                _this.bloomLayer.append(new dispersal_1.Dispersal(_this, note));
                result(ratingScore_1.Rating.BAD);
            };
        };
        _this.updateHandler = function () {
            _this.sequencer.tick();
            var pos = _this.posTable[_this.sequencer.ticks % _this.sequencer.bpm];
            _this.guide.x = pos.x;
            _this.guide.y = pos.y;
            _this.guide.modified();
            if (_this.sequencer.ticks % 3 === 0) {
                _this.effectLayer.append(new petalEffect_1.PetalEffect(_this, _this.guide));
            }
        };
        _this.loadHandler = function () {
            _this.append(common_1.Common.createFloor(_this));
            _this.effectLayer = new g.E({ scene: _this, parent: _this, });
            _this.notesLayer = new g.E({ scene: _this, parent: _this, });
            _this.bloomLayer = new g.E({ scene: _this, parent: _this, });
            _this.ratingLayer = new g.E({ scene: _this, parent: _this, });
            _this.guide = new noteGuide_1.NoteGuide(_this, _this.posTable[0]);
            _this.append(_this.guide);
            _this.font = common_1.Common.createDynamicFont();
            _this.appendHudLayer();
            var startLabel = new beatLabel_1.BeatLabel(_this, _this.font, "スタート！");
            startLabel.moveTo(g.game.width / 2, g.game.height / 2);
            _this.hudLayer.append(startLabel);
            _this.createAudioPlayer(startLabel);
        };
        _this.appendHudLayer = function () {
            _this.hudLayer = new g.E({ scene: _this, parent: _this });
            _this.score = new score_1.Score(_this, _this.font);
            _this.hudLayer.append(_this.score);
            var timeLimit = _this.timeLimit - (_this.props.isAlreadyClicked ? 5 : 0);
            _this.timer = new countdownTimer_1.CountdownTimer(_this, _this.font, timeLimit);
            _this.timer.onFinish.add(function () { });
            if (!_this.props.isAlreadyClicked) {
                _this.timer.start();
            }
            _this.hudLayer.append(_this.timer);
        };
        _this.gameOver = function () {
            var gameOver = new beatLabel_1.BeatLabel(_this, _this.font, "おわり", _this.sequencer.ticks);
            gameOver.moveTo(g.game.width / 2, g.game.height / 2);
            gameOver.start(_this.sequencer.bpm / 2);
            _this.hudLayer.append(gameOver);
            _this.appendCopyright(_this.font);
            var resultRate = _this.calcResultRate();
            var gameOverUpdateHandler = function () {
                if (g.game.age % 5 === 0) {
                    if (g.game.random.generate() <= 1 - resultRate)
                        return;
                    var x = g.game.random.generate() * g.game.width * .7 + g.game.width * .15;
                    var y = g.game.random.generate() * g.game.height * .7 + g.game.height * .15;
                    var scoreRate = Math.floor(resultRate * 2 + 1);
                    var bloom = new bloomEffect_1.BloomEffect(_this, { x: x, y: y }, scoreRate, "img_sakura");
                    _this.bloomLayer.append(bloom);
                }
            };
            _this.setTimeout(function () { return _this.onUpdate.add(gameOverUpdateHandler); }, 1000);
            if (!_this.blackout || (_this.blackout && _this.blackout.destroyed())) {
                var rank = _this.createRank(_this.font, resultRate);
                rank.x = gameOver.x;
                rank.y = gameOver.y + gameOver.height * 2;
                _this.hudLayer.append(rank);
                _this.setTimeout(_this.appendRetryButton, 2000);
            }
            if (_this.blackout && !_this.blackout.destroyed()) {
                _this.blackout.destroy();
            }
            if (_this.waitingMessage && !_this.waitingMessage.destroyed()) {
                _this.waitingMessage.destroy();
            }
        };
        _this.appendCopyright = function (font) {
            var text = "曲: ほんじつもうちょうてんなり (C)PANICPUMPKIN";
            var copyright = _this.createLabel(font, text, fontSize_1.FontSize.SMALL);
            copyright.x = g.game.width / 2;
            copyright.y = g.game.height - copyright.height * 1.5;
            _this.hudLayer.append(copyright);
        };
        _this.appendRetryButton = function () {
            var buttonFont = common_1.Common.createDynamicFont(fontSize_1.FontSize.MEDIUM, "sans-serif", "white");
            var retryButton = new button_1.Button(_this, buttonFont, "RETRY");
            retryButton.x = g.game.width / 2;
            retryButton.y = g.game.height - retryButton.height * 1.75;
            retryButton.modified();
            retryButton.onClickDown.add(function (_) { return _this.playSoundEffect(ratingScore_1.Rating.PERFECT.assetId.sound); });
            retryButton.onClicked.add(function (_) {
                if (_this.audioPlayer.currentAudio) {
                    _this.audioPlayer.stop();
                }
                _this.setTimeout(function () {
                    _this.keyEvent.removeListener();
                    g.game.vars.gameState.score = 0;
                    var titleScene = new titleScene_1.TitleScene(_this._param, 10, 0.5);
                    titleScene.onFinish.add(function (props) {
                        g.game.replaceScene(new GameScene(_this._param, 70, props));
                    });
                    g.game.replaceScene(titleScene);
                }, 250);
            });
            _this.hudLayer.append(retryButton);
        };
        _this.createRank = function (font, resultRate) {
            var rank = "";
            var msg = "";
            if (resultRate >= 0.9999999999999999) {
                var allNoteCount = chart_1.Chart.extractNoteCount(_this.sequencer.charts);
                if (_this.score.completeryPerfectCount === allNoteCount) {
                    rank = "神";
                    msg = "You are the SAKURA GOD!!!";
                }
                else {
                    rank = "SSS";
                    msg = "オールパーフェクト！！";
                }
            }
            else if (resultRate >= 0.95) {
                rank = "SS";
                msg = "アンビリバボー！超絶満開！！";
            }
            else if (resultRate >= 0.90) {
                rank = "S";
                msg = "素晴らしい！超満開！！";
            }
            else if (resultRate >= 0.80) {
                rank = "A";
                msg = "満開！さらに上を目指そう！";
            }
            else {
                var rate = resultRate / 0.80;
                if (rate >= 0.7) {
                    rank = "B";
                    msg = "".concat(Math.floor(rate * 10), "\u5206\u54B2\u304D");
                }
                else if (rate >= 0.4) {
                    rank = "C";
                    msg = "".concat(Math.floor(rate * 10), "\u5206\u54B2\u304D");
                }
                else if (rate >= 0.1) {
                    rank = "D";
                    msg = "".concat(Math.floor(rate * 10), "\u5206\u54B2\u304D");
                }
                else {
                    rank = "E";
                    msg = "春はまだ遠いかも...";
                }
            }
            var rankLabel = _this.createLabel(font, "\u30E9\u30F3\u30AF ".concat(rank), fontSize_1.FontSize.MEDIUM);
            var msgLabel = _this.createLabel(font, msg, fontSize_1.FontSize.MEDIUM);
            msgLabel.x = rankLabel.width / 2;
            msgLabel.y = rankLabel.height * 2;
            rankLabel.append(msgLabel);
            return rankLabel;
        };
        _this.calcResultRate = function () {
            var allNoteCount = chart_1.Chart.extractNoteCount(_this.sequencer.charts);
            var bloomingRate = (_this.score.blooming / allNoteCount) * 0.6;
            var perfectRate = (_this.score.perfectCount / allNoteCount) * 0.3;
            var comboRate = (_this.score.maxCombo / allNoteCount) * 0.1;
            var resultRate = bloomingRate + perfectRate + comboRate;
            // console.log(
            //     " blooming = ", this.score.blooming,
            //     " ,max combo = ", this.score.maxCombo,
            //     " ,allNoteCount = ", allNoteCount,
            //     " ,bloomingRate = ", bloomingRate,
            //     " ,perfectRate = ", perfectRate,
            //     " ,comboRate = ", comboRate,
            //     " ,resultRate = ", resultRate);
            return resultRate;
        };
        _this.createLabel = function (font, text, fontSize) { return new g.Label({
            scene: _this,
            text: text,
            font: font,
            fontSize: fontSize !== null && fontSize !== void 0 ? fontSize : font.size,
            anchorX: .5,
            anchorY: .5,
        }); };
        _this.playSoundEffect = function (assetId) {
            _this.asset.getAudioById(assetId).play().changeVolume(_this.props.soundVolume);
        };
        _this.createAudioPlayer = function (startLabel) {
            var audiAsset = _this.asset.getAudioById("bgm_honjitsumouchoutennnari");
            _this.audioPlayer = new g.MusicAudioSystem({
                id: audiAsset.id,
                resourceFactory: g.game.resourceFactory,
                volume: _this.props.musicVolume,
            }).createPlayer();
            _this.audioPlayer.onPlay.add(function (_ev) {
                startLabel.show();
                startLabel.start(_this.sequencer.bpm / 2);
                _this.setTimeout(function () { return startLabel.destroy(); }, 1000 * 4);
                _this.onUpdate.add(_this.updateHandler);
                _this.onPointDownCapture.add(_this.clickListener);
                _this.keyEvent = new keyEvent_1.KeyEvent();
                _this.keyEvent.addListener();
                _this.keyEvent.onKeyDown.add(_this.clickListener);
            });
            _this.audioPlayer.onStop.add(function (ev) { return ev.player.stop(); });
            if (_this.props.isAlreadyClicked) {
                _this.audioPlayer.play(audiAsset);
            }
            else {
                startLabel.hide();
                _this.waitScreenClick(_this.audioPlayer, audiAsset);
            }
        };
        _this.clickListener = function () {
            var notes = _this.notesLayer.children;
            if (!notes)
                return;
            for (var _i = 0, notes_1 = notes; _i < notes_1.length; _i++) {
                var note = notes_1[_i];
                if ((note instanceof sakuraNote_1.SakuraNote) && note.judge()) {
                    return;
                }
            }
        };
        _this.waitScreenClick = function (player, asset) {
            _this.onPointDownCapture.add(_this.waitClickListener);
            _this.waitingMessage = _this.createLabel(common_1.Common.createDynamicFont(), "画面をクリックしてスタート！");
            _this.waitingMessage.x = g.game.width / 2;
            _this.waitingMessage.y = g.game.height / 2;
            _this.blackout = new blackout_1.Blackout(_this);
            _this.blackout.onStartGame.add(function (_) {
                _this.waitingMessage.destroy();
                _this.onPointDownCapture.remove(_this.waitClickListener);
                player.play(asset);
            });
            _this.hudLayer.append(_this.blackout);
            _this.hudLayer.append(_this.waitingMessage);
        };
        _this.waitClickListener = function () { _this.blackout.close(); };
        _this.sequencer = _this.createSequencer(chart_1.Chart.Charts, 120, 4);
        _this.posTable = common_1.Common.createNoteGuidePosTable(_this.sequencer.bpm);
        _this.onLoad.addOnce(_this.loadHandler);
        return _this;
    }
    return GameScene;
}(g.Scene));
exports.GameScene = GameScene;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}