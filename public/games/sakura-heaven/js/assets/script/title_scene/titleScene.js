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
var fontSize_1 = require("../common/fontSize");
var titleSceneTimer_1 = require("./titleSceneTimer");
var beatLabel_1 = require("../common/beatLabel");
var noteGuide_1 = require("../game_scene/sakura/noteGuide");
var chartSequencer_1 = require("../game_scene/chart/chartSequencer");
var chart_1 = require("../game_scene/chart/chart");
var common_1 = require("../common/common");
var petalEffect_1 = require("../game_scene/effect/petalEffect");
var sakuraNote_1 = require("../game_scene/sakura/sakuraNote");
var dispersal_1 = require("../game_scene/sakura/dispersal");
var ratingScore_1 = require("../game_scene/effect/ratingScore");
var bloomEffect_1 = require("../game_scene/effect/bloomEffect");
var bloom_1 = require("../game_scene/sakura/bloom");
var button_1 = require("../common/button");
var keyEvent_1 = require("../common/keyEvent");
var horizontalRadioButton_1 = require("../common/horizontalRadioButton");
var TitleScene = /** @class */ (function (_super) {
    __extends(TitleScene, _super);
    function TitleScene(_param, _timeLimit, _volume) {
        var _this = _super.call(this, {
            game: g.game,
            assetIds: [
                "img_sakura", "img_sakura_border", "img_sakura_no_gradation", "img_petal",
                "se_spawn", "se_perfect", "se_excellent", "se_good", // "se_bad",
            ],
        }) || this;
        _this._timeLimit = _timeLimit;
        _this._volume = _volume;
        _this.onFinish = new g.Trigger();
        _this.posTable = [];
        _this.isButtonClicked = false;
        _this.isClicked = false;
        _this.isFinished = false;
        _this.createSequencer = function (charts, bpm, timeBase) {
            var sequencer = new chartSequencer_1.ChartSequencer(charts, bpm, timeBase);
            sequencer.onNote.add(function (_) {
                _this.playSE("se_spawn");
                _this.createNote();
                _this.guide.beat();
            });
            sequencer.onTiming.add(function (_) {
                _this.timingLabel.x = _this.guide.x;
                _this.timingLabel.y = _this.guide.y;
                _this.timingLabel.modified();
                _this.timingLabel.show();
                _this.setTimeout(function () {
                    _this.timingLabel.hide();
                }, 250);
            });
            return sequencer;
        };
        _this.createNote = function () {
            var note = new sakuraNote_1.SakuraNote(_this, _this.guide, _this.sequencer.bpm);
            note.onFailed.addOnce(function (_note) { return failed(); });
            note.onClicked.addOnce(function (note) {
                var rating = (0, ratingScore_1.withinTimingWindow)(note.ticks);
                switch (rating) {
                    case ratingScore_1.Rating.PERFECT:
                    case ratingScore_1.Rating.SEMI_PERFECT:
                        _this.bloomSakura(rating.scoreRate, note);
                        _this.showMessage("リズムカンペキ！");
                        break;
                    case ratingScore_1.Rating.EXCELLENT:
                        _this.bloomSakura(rating.scoreRate, _this.guide);
                        _this.showMessage("エクセレント！");
                        break;
                    case ratingScore_1.Rating.GOOD:
                        _this.bloomSakura(rating.scoreRate, _this.guide);
                        _this.showMessage("イイ感じ！");
                        break;
                    case ratingScore_1.Rating.BAD:
                        failed();
                        return;
                }
                _this.playSE(rating.assetId.sound);
            });
            _this.notesLayer.append(note);
            var failed = function () {
                _this.bloomLayer.append(new dispersal_1.Dispersal(_this, note));
            };
        };
        _this.playSE = function (assetId) {
            if (_this.isClicked || _this.isButtonClicked) {
                _this.asset.getAudioById(assetId).play().changeVolume(_this._volume * TitleScene.SE_VOLUME_RATE);
            }
        };
        _this.showMessage = function (message) {
            if (!_this.isClicked)
                return;
            _this.messageLabel.text = message;
            _this.messageLabel.invalidate();
            _this.messageLabel.show();
            _this.setTimeout(function () {
                _this.messageLabel.hide();
            }, 750);
        };
        _this.bloomSakura = function (scoreRate, target) {
            _this.bloomLayer.append(new bloomEffect_1.BloomEffect(_this, target, scoreRate));
            _this.bloomLayer.append(new bloom_1.Bloom(_this, target, scoreRate));
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
            _this.titleLabel = new beatLabel_1.BeatLabel(_this, common_1.Common.createDynamicFont(fontSize_1.FontSize.XL), "SAKURA HEAVEN");
            _this.titleLabel.x = g.game.width / 2;
            _this.titleLabel.y = _this.titleLabel.height * 1.5;
            _this.titleLabel.start(60);
            _this.append(_this.titleLabel);
            var font = common_1.Common.createDynamicFont(fontSize_1.FontSize.MEDIUM);
            _this.timingLabel = _this.createTimingLabel(font);
            _this.append(_this.timingLabel);
            _this.messageLabel = _this.createMessageLabel(font);
            _this.append(_this.messageLabel);
            // const timer = this.createCountdownTimer(font);
            // this.append(timer);
            var buttonFont = common_1.Common.createDynamicFont(fontSize_1.FontSize.MEDIUM, "sans-serif", "white");
            _this.startButton = new button_1.Button(_this, buttonFont, "今すぐはじめる");
            _this.startButton.x = g.game.width - _this.startButton.width * 0.65;
            _this.startButton.y = g.game.height - _this.startButton.height * 1.25;
            _this.startButton.modified();
            _this.startButton.onClickDown.add(function (_button) {
                _this.isButtonClicked = true;
                _this.playSE("se_excellent");
            });
            _this.startButton.onClicked.add(function (_button) {
                //timer?.stop();
                _this.setTimeout(function () { return _this.finishScene(true); }, 100);
            });
            _this.append(_this.startButton);
            var radioButtonFont = common_1.Common.createDynamicFont(fontSize_1.FontSize.TINY, "sans-serif", "white");
            var texts = ["もう少し小さめ", "少し小さめ", "最大"];
            _this.radioButton = new horizontalRadioButton_1.HorizontalRadioButton(_this, radioButtonFont, texts, 2);
            _this.radioButton.x = g.game.width - _this.radioButton.width * 0.925;
            _this.radioButton.y = _this.startButton.y - _this.radioButton.height * 3;
            _this.radioButton.modified();
            _this.radioButton.onClicked.add(function (_button) {
                _this._volume = _this.getVolume();
                if (!_this.isButtonClicked) {
                    _this.isButtonClicked = true;
                }
                _this.playSE("se_good");
            });
            _this.append(_this.radioButton);
            var volume = new g.Label({
                scene: _this,
                font: font,
                fontSize: fontSize_1.FontSize.SMALL,
                text: "音量",
                anchorX: .5,
                anchorY: .5,
            });
            volume.x = _this.radioButton.x - volume.width;
            volume.y = _this.startButton.y - _this.startButton.height * 2;
            _this.append(volume);
            _this.guide = new noteGuide_1.NoteGuide(_this, _this.posTable[0]);
            _this.append(_this.guide);
            _this.keyEvent = new keyEvent_1.KeyEvent();
            _this.keyEvent.addListener();
            _this.keyEvent.onKeyDown.add(function () { return _this.clickListener(); });
            _this.onPointDownCapture.add(_this.clickListener);
        };
        _this.getVolume = function () { return _this.radioButton.getSelectedIndex() * 0.25 + TitleScene.MIN_VOLUME; };
        _this.finishScene = function (isClicked) {
            if (!_this.isFinished) {
                _this.isFinished = true;
                _this.keyEvent.removeListener();
                _this._volume = _this.getVolume();
                _this.onFinish.fire({
                    isAlreadyClicked: isClicked,
                    musicVolume: _this._volume,
                    soundVolume: _this._volume * TitleScene.SE_VOLUME_RATE,
                });
            }
        };
        _this.createMessageLabel = function (font) {
            var message = new g.Label({
                scene: _this,
                font: font,
                text: "クリックしてネ！",
                anchorX: .5,
                anchorY: .5,
                x: g.game.width / 2,
                y: g.game.height / 2,
            });
            return message;
        };
        _this.createTimingLabel = function (font) { return new g.Label({
            scene: _this,
            font: font,
            text: "クリック！",
            anchorX: .5,
            anchorY: .5,
            hidden: true,
        }); };
        _this.createCountdownTimer = function (font) {
            var timer = new titleSceneTimer_1.TitleSceneTimer(_this, font, _this._timeLimit);
            timer.onFinish.addOnce(function () { return _this.finishScene(_this.isClicked || _this.isButtonClicked); });
            timer.start();
            return timer;
        };
        _this.clickListener = function (ev) {
            if ((ev === null || ev === void 0 ? void 0 : ev.target) instanceof g.FilledRect)
                return;
            if (!_this.isClicked) {
                _this.isClicked = true;
                _this.onUpdate.add(_this.updateHandler);
                _this.messageLabel.text = "クリックのタイミングを覚えよう！ (PCはZキーでも可能)";
                _this.messageLabel.invalidate();
                _this.titleLabel.restart();
            }
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
        var charts = [[1, 0, 0, 0, 1, 0, 0, 0], [2, 0, 0, 0, 2, 0, 0, chart_1.Chart.State.LOOP]];
        _this.sequencer = _this.createSequencer(charts, 120, 4);
        _this.posTable = common_1.Common.createNoteGuidePosTable(_this.sequencer.bpm, 0.75);
        _this.onLoad.addOnce(_this.loadHandler);
        return _this;
    }
    TitleScene.MIN_VOLUME = 0.5;
    TitleScene.SE_VOLUME_RATE = 0.8;
    return TitleScene;
}(g.Scene));
exports.TitleScene = TitleScene;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}