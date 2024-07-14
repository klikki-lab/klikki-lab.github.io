window.gLocalAssetContainer["easterBunny"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.EasterBunny = void 0;
var egg_1 = require("../egg");
var ears_1 = require("./ears");
var AnimFrames = {
    NORMAL: [1, 0],
    JUMPING: [0],
    GROUND: [2],
    POWER_UP: [3, 4],
    POWER_UP_JUMPING: [4],
    POWER_UP_GROUND: [4],
};
var Direction = {
    LEFT: 1,
    RIGHT: -1,
};
var EasterBunny = /** @class */ (function (_super) {
    __extends(EasterBunny, _super);
    function EasterBunny(scene, shadow) {
        var _this = _super.call(this, {
            scene: scene,
            src: scene.asset.getImageById("easter_bunny_egg"),
            srcWidth: 72,
            srcHeight: 64,
            width: 72,
            height: 64,
            x: g.game.width / 2,
            y: g.game.height / 2,
            anchorX: 0.5,
            anchorY: 0.5,
            frames: AnimFrames.NORMAL,
            interval: EasterBunny.ANIM_INTERVAL,
        }, shadow) || this;
        _this.onGround = new g.Trigger();
        _this.onNormal = new g.Trigger();
        _this._power = EasterBunny.DEFAULT_POWER;
        _this._jumpFrames = 0;
        _this._step = 0;
        _this._cooldownTime = 0;
        _this._isPowerUp = false;
        _this._powerUpFrames = 0;
        _this._clideTime = 0;
        _this.jump = function (pos) {
            _this._isJumping = true;
            _this._clideTime = 0;
            _this.frames = _this._isPowerUp ? AnimFrames.POWER_UP_JUMPING : AnimFrames.JUMPING;
            _this.frameNumber = 0;
            _this.loop = false;
            _this.modified();
            _this._ears.jumping(_this._isPowerUp);
            _this._step = 0;
            _this.z = _this.y;
            var dx = pos.x - _this.x;
            var dy = pos.y - _this.height / 2 - _this.y;
            var distance = Math.sqrt(dx * dx + dy * dy);
            var frames = Math.floor((distance / EasterBunny.MAX_DISTANCE) * g.game.fps) + g.game.fps;
            _this._jumpFrames = frames * (_this._isPowerUp ? EasterBunny.POWER_UP_JUMP_RATE : 1);
            _this.vx = dx / _this._jumpFrames;
            _this.vy = dy / _this._jumpFrames;
            _this._dest = { x: pos.x, y: pos.y };
        };
        _this.setDirection = function (vx, scale) {
            if (scale === void 0) { scale = 1; }
            _this.scaleX = scale * (vx < 0 ? Direction.LEFT : Direction.RIGHT);
            _this.scaleY = scale;
            _this.modified();
        };
        _this.collideEgg = function () {
            if (_this._isPowerUp)
                return;
            _this._clideTime = EasterBunny.COOLDOWN_TIME;
            _this.frames = AnimFrames.GROUND;
            _this.frameNumber = 0;
            _this.loop = false;
            _this.modified();
            _this._ears.ground(false);
        };
        _this.powerUp = function () {
            _this._isPowerUp = true;
            _this._power = EasterBunny.DEFAULT_POWER * EasterBunny.POWER_UP_RATE;
            _this._powerUpFrames = EasterBunny.POWER_UP_TIME;
            _this.startPowerUpAnimation();
        };
        _this.startNormalAnimation = function () {
            _this.frames = AnimFrames.NORMAL;
            _this.frameNumber = 0;
            _this.loop = true;
            _this.modified();
            _this.start();
            _this._ears.startNormalAnimation();
        };
        _this.startPowerUpAnimation = function () {
            _this.frames = AnimFrames.POWER_UP;
            _this.frameNumber = 0;
            _this.loop = true;
            _this.modified();
            _this.start();
            _this._ears.startPowerUpAnimation();
        };
        _this.setX = function (x) {
            _this.x = x;
            _this.modified();
            _this._shadow.x = x;
            _this._shadow.modified();
        };
        _this.setY = function (y) {
            _this.y = y;
            _this.modified();
            _this._shadow.y = _this.y + _this.height / 2;
            _this._shadow.modified();
        };
        _this.start();
        _this._shadow.move(_this);
        _this._ears = new ears_1.Ears(scene, EasterBunny.ANIM_INTERVAL);
        _this._ears.x = _this.width / 2;
        _this._ears.y = -_this.height / 2 + _this._ears.height * 0.2;
        _this._ears.start();
        _this.append(_this._ears);
        var updateHandler = function () {
            if (_this._isPowerUp) {
                if (_this._powerUpFrames-- <= 0) {
                    _this._isPowerUp = false;
                    _this._power = EasterBunny.DEFAULT_POWER;
                    _this.startNormalAnimation();
                    _this.onNormal.fire(_this);
                }
            }
            if (!_this.isJumping) {
                if (_this._cooldownTime > 0) {
                    _this._cooldownTime--;
                    if (_this._cooldownTime <= 0) {
                        if (!_this._isPowerUp) {
                            _this.startNormalAnimation();
                        }
                    }
                }
                if (_this._clideTime > 0) {
                    _this._clideTime--;
                    if (_this._clideTime <= 0) {
                        _this.startNormalAnimation();
                    }
                }
                return;
            }
            ;
            _this.x += _this.vx;
            var sin = Math.sin(Math.PI * (++_this._step / _this._jumpFrames));
            var vz = _this.height * sin * EasterBunny.MAX_JUMP_HEIGHT;
            _this.z += _this.vy;
            _this.y = _this.z - vz;
            _this.setDirection(_this.vx, sin * EasterBunny.MAX_SCALE + 1);
            if (_this._step === Math.floor(_this._jumpFrames * 0.8)) {
                _this._ears.falling(_this._isPowerUp);
            }
            else if (_this._step >= _this._jumpFrames) {
                _this._isJumping = false;
                if (_this._isPowerUp) {
                    _this._cooldownTime = 1;
                    _this.frames = AnimFrames.POWER_UP_GROUND;
                }
                else {
                    _this._cooldownTime = EasterBunny.COOLDOWN_TIME;
                    _this.frames = AnimFrames.GROUND;
                    _this.frameNumber = 0;
                    _this.loop = false;
                }
                _this.x = _this._dest.x;
                _this.y = _this._dest.y - _this.height / 2;
                _this.setDirection(_this.vx, 1);
                _this._ears.ground(_this._isPowerUp);
                _this._shadow.scale(1);
                _this._shadow.move(_this);
                _this.onGround.fire(_this);
            }
            else {
                _this._shadow.scale((1 - sin) * (1 - 0.25) + 0.25);
                _this._shadow.move({ x: _this.x, y: _this.z, width: 0, height: _this.height });
            }
            _this.modified();
        };
        _this.onUpdate.add(updateHandler);
        return _this;
    }
    Object.defineProperty(EasterBunny.prototype, "canJump", {
        get: function () { return !this._isJumping && this._cooldownTime <= 0; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EasterBunny.prototype, "power", {
        get: function () { return this._power * this.width; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EasterBunny.prototype, "isPowerUp", {
        get: function () { return this._isPowerUp; },
        enumerable: false,
        configurable: true
    });
    EasterBunny.prototype.getSize = function () {
        return { width: this._power * this.width, height: this._power * this.height };
    };
    EasterBunny.ANIM_INTERVAL = 1000 * .5;
    EasterBunny.COOLDOWN_TIME = Math.floor(g.game.fps * 0.2);
    EasterBunny.MAX_DISTANCE = Math.sqrt(Math.pow(g.game.width, 2) + Math.pow(g.game.height, 2));
    EasterBunny.MAX_JUMP_HEIGHT = 5;
    EasterBunny.MAX_SCALE = 3;
    EasterBunny.DEFAULT_POWER = 2.5;
    EasterBunny.POWER_UP_TIME = g.game.fps * 8;
    EasterBunny.POWER_UP_RATE = 1.5;
    EasterBunny.POWER_UP_JUMP_RATE = 0.75;
    return EasterBunny;
}(egg_1.Egg));
exports.EasterBunny = EasterBunny;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}