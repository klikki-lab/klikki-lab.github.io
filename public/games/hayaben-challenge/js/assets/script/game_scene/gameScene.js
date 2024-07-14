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
var commonScene_1 = require("../common/commonScene");
var fontSize_1 = require("../common/fontSize");
var player_1 = require("./character/player");
var student_1 = require("./character/student");
var teacher_1 = require("./character/teacher");
var countdownTimer_1 = require("./hud/countdownTimer");
var score_1 = require("./hud/score");
var tl = require("@akashic-extension/akashic-timeline");
var exclamation_1 = require("./effect/exclamation");
var effectLine_1 = require("./effect/effectLine");
var aura_1 = require("./effect/aura");
var button_1 = require("../common/button");
var titleScene_1 = require("../title_scene/titleScene");
var GameScene = /** @class */ (function (_super) {
    __extends(GameScene, _super);
    function GameScene(param, timeLimit) {
        var _a;
        var _this = _super.call(this, {
            game: g.game,
            assetIds: [
                "img_bg", "img_player", "img_teacher", "img_student_male", "img_student_female",
                "img_surprise", "img_heat", "img_exclamation_mark", "img_effect_line",
                "se_kaminari", "img_aura", "bgm",
            ],
        }, timeLimit) || this;
        _this.param = param;
        _this.loadHandler = function () {
            _this.camera = new g.Camera2D({});
            g.game.focusingCamera = _this.camera;
            g.game.modified();
            _this.timeline = new tl.Timeline(_this);
            _this.font = new g.DynamicFont({
                game: g.game,
                fontFamily: "sans-serif",
                fontWeight: "bold",
                strokeWidth: fontSize_1.FontSize.LARGE / 6,
                strokeColor: "#222",
                fontColor: "white",
                size: fontSize_1.FontSize.LARGE
            });
            _this.createBackground();
            _this.createStudents();
            _this.append(_this.player = _this.createPlayer());
            _this.append(_this.teacher = _this.createTeacher());
            _this.append(_this.effectLayer = new g.E({ scene: _this }));
            _this.effectLine = new effectLine_1.EffectLine(_this);
            _this.effectLine.x = g.game.width / 2 - _this.teacher.width * .6;
            _this.effectLine.y = g.game.height / 2;
            _this.append(_this.effectLine);
            _this.resultLayer = new g.E({ scene: _this, parent: _this });
            _this.append(_this.createHudLayer());
            var rect = _this.createBlackout(_this);
            var label = _this.createLabel(_this, "スタート！");
            label.x = g.game.width / 2;
            label.y = g.game.height / 2;
            label.modified();
            var you = _this.createLabel(_this.player, "あなた", fontSize_1.FontSize.SMALL);
            you.x = _this.player.width / 2;
            you.y = -you.height;
            you.modified();
            _this.onPointDownCapture.add(_this.pointDownHandler);
            _this.onPointUpCapture.add(_this.pointUpHandler);
            _this.setTimeout(function () {
                rect.destroy();
                label.destroy();
                _this.teacher.startClass();
                _this.onUpdate.add(_this.updateHandler);
                _this.timer.start();
                _this.setTimeout(function () { return you.destroy(); }, 1000 * 2);
            }, 1000 * 2);
            _this.asset.getAudioById("bgm").play();
        };
        _this.updateHandler = function () {
            if (_this.player.isEating) {
                _this.score.add();
            }
        };
        _this.pointDownHandler = function (_ev) {
            if (!_this.player.isScolded) {
                _this.player.startEating();
            }
        };
        _this.pointUpHandler = function (_ev) {
            if (_this.player.isEating) {
                _this.player.stopEating();
                var satietyLevel = Math.floor(_this.score.getSatietyLevel(_this.timeLimit)) + 1;
                if (satietyLevel > _this.teacher.level) {
                    _this.teacher.levelUp();
                }
            }
        };
        _this.createBackground = function () {
            new g.FilledRect({
                scene: _this,
                parent: _this,
                width: g.game.width,
                height: g.game.height,
                cssColor: "rgb(206,160,96)",
            });
            new g.Sprite({
                scene: _this,
                src: _this.asset.getImageById("img_bg"),
                parent: _this,
            });
        };
        _this.createStudents = function () {
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) {
                    if (i === 0 && j === 1)
                        continue;
                    var gender = _this.random.generate() < 0.5 ? "img_student_male" : "img_student_female";
                    var asset = _this.asset.getImageById(gender);
                    var student = new student_1.Student(_this, asset);
                    student.x = g.game.width / 2 + i * student.width * 2 - (j - 1) * student.width * .5;
                    student.y = g.game.height / 2 + (j - 1) * student.height * 2;
                    _this.append(student);
                }
            }
        };
        _this.createPlayer = function () {
            var player = new player_1.Player(_this);
            player.x = g.game.width / 2;
            player.y = g.game.height / 2;
            return player;
        };
        _this.createTeacher = function () {
            var teacher = new teacher_1.Teacher(_this, _this.random, new aura_1.Aura(_this));
            teacher.onMonitoring.add(function (teacher) {
                if (_this.player.isEating) {
                    teacher.angry(_this.player);
                    _this.player.scolded();
                    _this.asset.getAudioById("se_kaminari").play();
                    if (_this.timer.isGameOver)
                        return;
                    var scaleRate = 0.4;
                    var moveRate = (1 - scaleRate) / 2;
                    _this.tween = _this.timeline.create(_this.camera)
                        .wait(600)
                        .scaleTo(scaleRate, scaleRate, 200, tl.Easing.easeOutSine)
                        .con()
                        .moveTo((g.game.width - _this.teacher.width * 2) * moveRate, g.game.height * moveRate, 200, tl.Easing.easeOutSine)
                        .call(function () { return _this.effectLine.start(); })
                        .wait(3800)
                        .call(function () { return _this.effectLine.stop(); })
                        .scaleTo(1, 1, 250, tl.Easing.easeInSine)
                        .con()
                        .moveTo(0, 0, 250, tl.Easing.easeInSine);
                }
            });
            teacher.onCalm.add(function (_teacher) {
                if (_this.player.isScolded) {
                    _this.player.forgiven();
                }
            });
            teacher.onFeint.add(function (teacher) {
                new exclamation_1.Exclamation(_this, _this.effectLayer, teacher);
            });
            teacher.x = teacher.width * 2;
            teacher.y = g.game.height / 2;
            return teacher;
        };
        _this.createHudLayer = function () {
            var layer = new g.E({ scene: _this });
            _this.timer = new countdownTimer_1.CountdownTimer(_this, _this.font, _this.timeLimit);
            _this.timer.onFinish.addOnce(_this.gameOver);
            layer.append(_this.timer);
            _this.score = new score_1.Score(_this, _this.font);
            layer.append(_this.score);
            return layer;
        };
        _this.gameOver = function () {
            _this.onUpdate.remove(_this.updateHandler);
            if (_this.tween && !_this.tween.isFinished()) {
                if (_this.effectLine.visible()) {
                    _this.effectLine.stop();
                }
                _this.tween.cancel();
                _this.timeline.create(_this.camera)
                    .scaleTo(1, 1, 250, tl.Easing.easeInSine)
                    .con()
                    .moveTo(0, 0, 250, tl.Easing.easeInSine);
            }
            _this.showFinish();
            _this.setTimeout(function () {
                _this.showResult();
                _this.showRetryButton();
            }, 1000 * 2);
        };
        _this.showFinish = function () {
            _this.createBlackout(_this.resultLayer);
            var label = _this.createLabel(_this.resultLayer, "おわり");
            label.x = g.game.width / 2;
            label.y = g.game.height / 2;
            label.modified();
        };
        _this.showResult = function () {
            var satietyLevel = _this.score.getSatietyLevel(_this.timeLimit);
            var label = _this.createLabel(_this.resultLayer, "\u6E80\u8179\u5EA6 ".concat((satietyLevel * 100).toFixed(1), "%"));
            label.x = g.game.width / 2;
            label.y = g.game.height / 2 + fontSize_1.FontSize.LARGE * 5;
            label.modified();
        };
        _this.showRetryButton = function () {
            var font = new g.DynamicFont({
                game: g.game,
                fontFamily: "sans-serif",
                fontWeight: "bold",
                strokeWidth: fontSize_1.FontSize.MEDIUM / 6,
                strokeColor: "#222",
                fontColor: "white",
                size: fontSize_1.FontSize.MEDIUM,
            });
            var retryButton = new button_1.Button(_this, font, "RETRY");
            retryButton.x = g.game.width - retryButton.width / 2 - fontSize_1.FontSize.MEDIUM;
            retryButton.y = g.game.height - retryButton.height / 2 - fontSize_1.FontSize.MEDIUM;
            retryButton.onClicked.add(function (_) {
                g.game.vars.gameState.score = 0;
                _this.asset.getAudioById("bgm").stop();
                var titleScene = new titleScene_1.TitleScene(7);
                titleScene.onFinish.add(function () {
                    g.game.replaceScene(new GameScene(_this.param, 50));
                });
                g.game.replaceScene(titleScene);
            });
            _this.append(retryButton);
        };
        _this.createLabel = function (parent, text, fontSize) {
            if (fontSize === void 0) { fontSize = fontSize_1.FontSize.LARGE; }
            return new g.Label({
                scene: _this,
                parent: parent,
                text: text,
                font: _this.font,
                fontSize: fontSize,
                anchorX: 0.5,
                anchorY: 0.5,
            });
        };
        _this.createBlackout = function (parent) { return new g.FilledRect({
            scene: _this,
            parent: parent,
            width: g.game.width,
            height: g.game.height,
            cssColor: "black",
            opacity: .5,
        }); };
        _this.random = (_a = param.random) !== null && _a !== void 0 ? _a : g.game.random;
        _this.onLoad.addOnce(_this.loadHandler);
        return _this;
    }
    return GameScene;
}(commonScene_1.CommonScene));
exports.GameScene = GameScene;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}