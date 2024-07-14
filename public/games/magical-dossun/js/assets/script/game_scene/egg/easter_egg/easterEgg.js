window.gLocalAssetContainer["easterEgg"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.EasterEgg = exports.VelocityRate = exports.Status = void 0;
var egg_1 = require("../egg");
exports.Status = {
    NORMAL: 0,
    CRACKED: 1,
    NAKED: 2,
};
exports.VelocityRate = {
    CRACKED: 1.2,
    NAKED: 1.4,
    RUN: 1.6,
};
var EasterEgg = /** @class */ (function (_super) {
    __extends(EasterEgg, _super);
    function EasterEgg(scene, assetId, _score, shadow, velocity) {
        if (velocity === void 0) { velocity = 1.5; }
        var _this = _super.call(this, {
            scene: scene,
            src: scene.asset.getImageById(assetId),
            srcWidth: EasterEgg.SIZE,
            srcHeight: EasterEgg.SIZE,
            width: EasterEgg.SIZE,
            height: EasterEgg.SIZE,
            anchorX: 0.5,
            anchorY: 0.5,
            frames: [0, 1],
            interval: 300,
        }, shadow) || this;
        _this._score = _score;
        _this.onBounced = new g.Trigger();
        _this._velocity = 0;
        _this._step = 0;
        _this._status = exports.Status.NORMAL;
        _this._isTransform = false;
        _this._isAppear = false;
        _this.crack = function (pos, distance) {
            if (_this._isTransform) {
                _this.transform();
            }
            _this._isJumping = true;
            _this.stop();
            _this.z = _this.y;
            _this._step = 0 - distance;
            _this.setVelocity(pos.x, pos.y, _this.x, _this.y);
            _this.modified();
        };
        _this.collide = function (bunny) { _this.setVelocity(bunny.x, bunny.y, _this.x, _this.y); };
        _this.setVelocity = function (x1, y1, x2, y2) {
            var rad = Math.atan2(y2 - y1, x2 - x1);
            _this.vx = Math.cos(rad) * _this._velocity;
            _this.vy = Math.sin(rad) * _this._velocity;
        };
        _this.isNaked = function () { return _this._status >= exports.Status.NAKED; };
        _this.updateHandler = function () {
            if (_this._isJumping) {
                if (_this._step < 0) {
                    _this._step++;
                    return;
                }
                var sin = Math.sin(Math.PI * (++_this._step / EasterEgg.JUMP_FRAMES));
                var rate = 2 / g.game.fps;
                _this.z += (_this.vy / _this._velocity) * _this.height * rate;
                _this.x += (_this.vx / _this._velocity) * _this.width * rate;
                var jumpHeight = _this.height * EasterEgg.BOUNCE_HEIGHT_RATE * sin;
                _this.y = _this.z - jumpHeight;
                _this._shadow.move({ x: _this.x, y: _this.z, width: 0, height: _this.height });
                if (_this._step === EasterEgg.JUMP_FRAMES) {
                    _this.onBounced.fire(_this);
                    _this.y = _this.z;
                    _this._step = 0;
                    _this._isJumping = false;
                    _this._isTransform = true;
                    if (_this._status === exports.Status.NORMAL) {
                        _this.frames = [2, 3];
                        _this.interval = Math.floor(g.game.random.generate() * 300);
                        _this.vx *= exports.VelocityRate.CRACKED;
                        _this.vy *= exports.VelocityRate.CRACKED;
                    }
                    else if (_this._status === exports.Status.CRACKED) {
                        _this.frames = [6, 7];
                        _this.interval = Math.floor(g.game.random.generate() * 300);
                        _this.vx *= exports.VelocityRate.NAKED;
                        _this.vy *= exports.VelocityRate.NAKED;
                    }
                    else if (_this._status >= exports.Status.NAKED) {
                        _this.frames = [8, 9];
                        _this.interval = Math.floor(g.game.random.generate() * 300);
                        var velocityRate = 1 + ((_this._status + 1) - exports.Status.NAKED) * .2;
                        _this.vx *= exports.VelocityRate.RUN * velocityRate;
                        _this.vy *= exports.VelocityRate.RUN * velocityRate;
                    }
                    _this.scaleX = _this.vx < 0 ? 1 : -1;
                    _this.frameNumber = 0;
                    _this.loop = false;
                    _this.start();
                    _this._shadow.move(_this);
                }
                _this.modified();
                return;
            }
            if (_this._isTransform) {
                if (_this._step++ === Math.floor(g.game.fps / 3)) {
                    _this.transform();
                }
                return;
            }
            if (_this._status >= exports.Status.CRACKED) {
                _this.run();
            }
            else {
                _this.move();
            }
            _this._shadow.move(_this);
            if (!_this._isAppear) {
                if (_this.x + _this.width / 2 > 0 && _this.x - _this.width / 2 < g.game.width &&
                    _this.y + _this.height / 2 > 0 && _this.y - _this.height / 2 < g.game.height) {
                    _this._isAppear = true;
                }
            }
            else {
                if (_this.x + _this.width / 2 < 0 || _this.x - _this.width / 2 > g.game.width ||
                    _this.y + _this.height < 0 || _this.y - _this.height / 2 > g.game.height) {
                    _this.destroy();
                }
            }
            ;
        };
        _this.transform = function () {
            _this._isTransform = false;
            _this._step = 0;
            if (_this._status === exports.Status.NORMAL) {
                _this.frames = [4, 5];
                _this.frameNumber = 0;
                _this.interval = 150;
                _this.loop = true;
                _this.modified();
                _this.start();
            }
            else if (_this._status >= exports.Status.CRACKED) {
                _this.frames = [8, 9];
                _this.frameNumber = 0;
                _this.interval = 100;
                _this.loop = true;
                _this.modified();
                _this.start();
            }
            _this._status++;
        };
        _this._velocity = 1 / g.game.fps * EasterEgg.SIZE * velocity;
        return _this;
    }
    EasterEgg.prototype.init = function (x, y, targetX, targetY) {
        this.x = x;
        this.y = y;
        var x2 = targetX !== null && targetX !== void 0 ? targetX : (g.game.width - this.width) / 2;
        var y2 = targetY !== null && targetY !== void 0 ? targetY : (g.game.height - this.height) / 2;
        this.setVelocity(x, y, x2, y2);
        this.modified();
        this.start();
        this._shadow.move(this);
        this.onUpdate.add(this.updateHandler);
    };
    ;
    Object.defineProperty(EasterEgg.prototype, "score", {
        get: function () {
            var max = Math.min(this._status, 8);
            return this._score * Math.max(1, max * max * 4);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EasterEgg.prototype, "isApperar", {
        get: function () { return this._isAppear; },
        enumerable: false,
        configurable: true
    });
    EasterEgg.prototype.run = function () {
        this.x += this.vx;
        this.y += this.vy;
        this.modified();
    };
    EasterEgg.SIZE = 64;
    EasterEgg.JUMP_FRAMES = Math.floor(g.game.fps * 0.8);
    EasterEgg.BOUNCE_HEIGHT_RATE = 2.5;
    return EasterEgg;
}(egg_1.Egg));
exports.EasterEgg = EasterEgg;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}