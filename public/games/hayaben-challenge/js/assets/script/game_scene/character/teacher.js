window.gLocalAssetContainer["teacher"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.Teacher = void 0;
var character_1 = require("./character");
var heat_1 = require("../effect/heat");
var tl = require("@akashic-extension/akashic-timeline");
var Status = {
    WAITING: 0x0,
    NORMAL: 0x2,
    MONITORING: 0x0f,
    ANGRY: 0xff,
};
var Duration = {
    TURN: 500,
    MOVE: 250,
    JUMP: 100,
};
var Direction = {
    STUDENTS: 1,
    BLACKBOARD: -1,
};
var Teacher = /** @class */ (function (_super) {
    __extends(Teacher, _super);
    function Teacher(scene, random, _aura) {
        if (_aura === void 0) { _aura = undefined; }
        var _this = _super.call(this, scene, scene.asset.getImageById("img_teacher")) || this;
        _this.random = random;
        _this._aura = _aura;
        /** 教師の監視中は毎フレーム通知される。 */
        _this.onMonitoring = new g.Trigger();
        /** 教師が怒り状態から落ち着き状態に移行したときに通知される。 */
        _this.onCalm = new g.Trigger();
        /** フェイント時に通知される。 */
        _this.onFeint = new g.Trigger();
        _this.status = Status.WAITING;
        _this._level = 1;
        _this.normalAnimation = function () {
            _this.scaleX = Direction.BLACKBOARD;
            _this.frames = [0, 1];
            _this.frameNumber = 0;
            _this.interval = Math.round((1000 / 30) * 3);
            _this.loop = true;
            _this.modified();
            _this.start();
        };
        _this.slippingGlassesAnimation = function () {
            _this.frames = [2, 3];
            _this.frameNumber = 0;
            _this.interval = Math.round((1000 / 30) * 5);
            _this.loop = false;
            _this.modified();
            _this.start();
        };
        _this.getTurnDuration = function () { return Duration.TURN - (_this._level - 1) * 100; };
        _this.turnToStudents = function () {
            _this.tween = _this.timeline
                .create(_this)
                .to({ scaleX: Direction.STUDENTS }, _this.getTurnDuration(), tl.Easing.easeInSine)
                .call(function () { return _this.status = Status.MONITORING; });
        };
        _this.turnToBlackboard = function () {
            var turnDuration = _this.getTurnDuration();
            _this.tween = _this.timeline
                .create(_this)
                .to({ scaleX: Direction.BLACKBOARD }, turnDuration, tl.Easing.easeInSine);
            var isFeint = _this.random.generate() < _this._level * Teacher.FEINT_RATE;
            if (isFeint) {
                _this.scene.setTimeout(function () {
                    _this.onFeint.fire(_this);
                    _this.turnToStudents();
                }, turnDuration * 0.4);
            }
            else {
                _this.tween.call(function () { return _this.status = Status.NORMAL; });
            }
        };
        _this.updateHandler = function () {
            switch (_this.status) {
                case Status.WAITING:
                    break;
                case Status.NORMAL:
                    if (_this.random.generate() < _this._level / (g.game.fps * 2)) {
                        _this.status = Status.WAITING;
                        _this.slippingGlassesAnimation();
                    }
                    break;
                case Status.MONITORING:
                    _this.onMonitoring.fire(_this);
                    if (!_this.isAngry() && _this.random.generate() < _this._level / g.game.fps) {
                        _this.status = Status.WAITING;
                        _this.turnToBlackboard();
                    }
                    break;
                case Status.ANGRY:
                    if (g.game.age % Math.floor(g.game.fps * .2) === 0) {
                        new heat_1.Heat(_this.scene, _this);
                    }
                    break;
            }
        };
        _this.isAngry = function () { return Status.ANGRY === _this.status; };
        /**
         * 授業開始。教師が振り向き行動を開始する。ゲーム開始時に必ず呼び出すこと。
         */
        _this.startClass = function () { _this.status = Status.NORMAL; };
        _this.startAngryAnimation = function () {
            _this.status = Status.ANGRY;
            _this.scaleX = Direction.STUDENTS;
            _this.frames = [4, 5];
            _this.interval = Math.round((1000 / 30) * 2 + 0.5);
            _this.modified();
            _this.start();
        };
        _this.angry = function (player) {
            var _a;
            _this.startAngryAnimation();
            (_a = _this.tween) === null || _a === void 0 ? void 0 : _a.cancel();
            var tempY = _this.y;
            _this.tween = _this.timeline
                .create(_this)
                .moveY(tempY - _this.height, Duration.JUMP, tl.Easing.easeOutQuart)
                .moveY(tempY, Duration.JUMP, tl.Easing.easeInCubic)
                .moveX(player.x - _this.width, Duration.MOVE, tl.Easing.easeInSine)
                .moveY(tempY - _this.height, Duration.JUMP, tl.Easing.easeOutQuart)
                .moveY(tempY, Duration.JUMP, tl.Easing.easeInCubic)
                .moveY(tempY - _this.height, Duration.JUMP, tl.Easing.easeOutSine)
                .moveY(tempY, Duration.JUMP, tl.Easing.easeInCubic)
                .moveY(tempY - _this.height, Duration.JUMP, tl.Easing.easeOutQuart)
                .moveY(tempY, Duration.JUMP, tl.Easing.easeInCubic)
                .wait(3000)
                .call(function () {
                _this.timeline
                    .create(_this)
                    .to({ scaleX: Direction.BLACKBOARD }, _this.getTurnDuration(), tl.Easing.easeInSine)
                    .call(_this.normalAnimation)
                    .moveX(_this.width * 2, Duration.MOVE, tl.Easing.easeInSine)
                    .con()
                    .call(function () {
                    _this.status = Status.NORMAL;
                    _this.onCalm.fire(_this);
                });
            });
        };
        _this.levelUp = function () {
            if (_this._level < Teacher.MAX_LEVEL) {
                _this._level++;
                if (_this._aura) {
                    if (!_this._aura.visible()) {
                        _this._aura.show();
                    }
                    _this._aura.opacity += 0.1;
                    _this._aura.opacity = (Math.min(2, _this._aura.opacity));
                    console.log(_this._aura.opacity);
                    _this._aura.modified();
                    _this._aura.start();
                }
                return true;
            }
            ;
            return false;
        };
        _this.stopTween = function () { var _a; (_a = _this.tween) === null || _a === void 0 ? void 0 : _a.pause(); };
        _this.timeline = new tl.Timeline(scene);
        if (_aura) {
            _aura.x = _this.width * .5;
            _aura.y = _this.height * 0.45;
            _aura.hide();
            _this.append(_aura);
        }
        _this.normalAnimation();
        _this.onFinish.add(function () {
            _this.normalAnimation();
            if (_this.random.generate() < _this._level / g.game.fps) {
                _this.status = Status.NORMAL;
            }
            else {
                _this.status = Status.WAITING;
                _this.turnToStudents();
            }
        });
        _this.onUpdate.add(_this.updateHandler);
        return _this;
    }
    Object.defineProperty(Teacher.prototype, "level", {
        get: function () { return this._level; },
        enumerable: false,
        configurable: true
    });
    Teacher.MAX_LEVEL = 6;
    Teacher.FEINT_RATE = 0.04;
    return Teacher;
}(character_1.Character));
exports.Teacher = Teacher;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}