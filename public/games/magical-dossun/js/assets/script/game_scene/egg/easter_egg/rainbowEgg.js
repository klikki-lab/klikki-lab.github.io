window.gLocalAssetContainer["rainbowEgg"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.RainbowEgg = void 0;
var easterEgg_1 = require("./easterEgg");
var RainbowEgg = /** @class */ (function (_super) {
    __extends(RainbowEgg, _super);
    function RainbowEgg(scene, shadow) {
        var _this = _super.call(this, scene, "easter_egg_rainbow", 1000, shadow, 4) || this;
        _this.onCracked = new g.Trigger();
        _this.crack = function (pos, distance) {
            if (_this._status !== easterEgg_1.Status.NORMAL)
                return;
            _this._isJumping = true;
            _this.stop();
            _this.z = _this.y;
            _this._step = 0 - distance;
            _this.setVelocity(pos.x, pos.y, _this.x, _this.y);
            _this.modified();
        };
        _this.updateHandler = function () {
            if (_this._isJumping) {
                if (_this._step < 0) {
                    _this._step++;
                    return;
                }
                var sin = Math.sin(Math.PI * (++_this._step / easterEgg_1.EasterEgg.JUMP_FRAMES));
                var rate = 2 / g.game.fps;
                _this.z += (_this.vy / _this._velocity) * _this.height * rate;
                _this.x += (_this.vx / _this._velocity) * _this.width * rate;
                var jumpHeight = _this.height * easterEgg_1.EasterEgg.BOUNCE_HEIGHT_RATE * sin;
                _this.y = _this.z - jumpHeight;
                _this._shadow.move({ x: _this.x, y: _this.z, width: 0, height: _this.height });
                if (_this._step === easterEgg_1.EasterEgg.JUMP_FRAMES) {
                    _this.onBounced.fire(_this);
                    _this.y = _this.z;
                    _this._step = 0;
                    _this._isJumping = false;
                    if (_this._status === easterEgg_1.Status.NORMAL) {
                        _this._status++;
                        _this.frames = [2, 3];
                        _this.interval = Math.floor(g.game.random.generate() * 200);
                        _this.vx *= easterEgg_1.VelocityRate.CRACKED;
                        _this.vy *= easterEgg_1.VelocityRate.CRACKED;
                        _this.scaleX = _this.vx < 0 ? 1 : -1;
                        _this.frameNumber = 0;
                        _this.loop = false;
                        _this.start();
                    }
                    _this._shadow.move(_this);
                }
                _this.modified();
                return;
            }
            if (_this._status === easterEgg_1.Status.NORMAL) {
                _this.move();
                _this._shadow.move(_this);
            }
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
        };
        return _this;
    }
    RainbowEgg.prototype.init = function (x, y, targetX, targetY) {
        var _this = this;
        this.onFinish.add(function (_) { return _this.onCracked.fire(_this); });
        _super.prototype.init.call(this, x, y, targetX, targetY);
    };
    RainbowEgg.prototype.move = function () {
        this.x += this.vx;
        this.y += this.vy;
        this.modified();
    };
    RainbowEgg.COLOR = "#ff8040";
    return RainbowEgg;
}(easterEgg_1.EasterEgg));
exports.RainbowEgg = RainbowEgg;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}