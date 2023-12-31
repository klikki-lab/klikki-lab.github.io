window.gLocalAssetContainer["Missile"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.Missile = void 0;
var Missile = /** @class */ (function (_super) {
    __extends(Missile, _super);
    function Missile(scene, start, end, _speed) {
        if (_speed === void 0) { _speed = 20; }
        var _this = this;
        var asset = scene.asset.getImageById("missile");
        var radian = Math.atan2(end.y - start.y, end.x - start.x);
        _this = _super.call(this, {
            scene: scene,
            src: asset,
            width: asset.width,
            height: asset.height,
            anchorX: 0.5,
            anchorY: 0.5,
            x: start.x,
            y: start.y,
            angle: radian * (180 / Math.PI) + 90,
        }) || this;
        _this._speed = _speed;
        _this.onFlying = new g.Trigger();
        _this.onSmoke = new g.Trigger();
        _this.onReachTarget = new g.Trigger();
        _this._isStrike = false;
        _this.strike = function () {
            _this._isStrike = true;
        };
        var combustionAsset = scene.asset.getImageById("combustion");
        var combustion = new g.FrameSprite({
            scene: scene,
            src: combustionAsset,
            srcWidth: 16,
            srcHeight: combustionAsset.height,
            width: 16,
            height: combustionAsset.height,
            anchorX: 0.5,
            anchorY: 0.5,
            x: _this.width * 0.5,
            y: _this.height * 1.52,
            opacity: 0.75,
            frames: [0, 1],
            interval: Math.floor((2 / 30) * 1000),
            loop: true,
        });
        _this.append(combustion);
        combustion.start();
        var velocity = 30 / g.game.fps;
        var vx = Math.cos(radian) * velocity;
        var vy = Math.sin(radian) * velocity;
        _this._prevX = start.x;
        _this._prevY = start.y;
        _this.onUpdate.add(function () {
            if (_this._isStrike)
                return;
            for (var i = 0; i < _this._speed; i++) {
                _this.x += vx;
                _this.y += vy;
                if (Math.abs(end.x - _this.x) <= 1 && Math.abs(end.y - _this.y) <= 1) {
                    _this.x = end.x;
                    _this.y = end.y;
                    _this.onReachTarget.fire(_this);
                    return;
                }
                if (Math.abs(_this._prevX - _this.x) + Math.abs(_this._prevY - _this.y) >
                    _this.width + g.game.random.generate() * _this.width) {
                    _this.onSmoke.fire(_this);
                    _this._prevX = _this.x;
                    _this._prevY = _this.y;
                }
                _this.onFlying.fire(_this);
                if (_this._isStrike) {
                    return;
                }
            }
            _this.modified();
        });
        return _this;
    }
    Object.defineProperty(Missile.prototype, "isStrike", {
        get: function () {
            return this._isStrike;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Missile.prototype, "prevX", {
        get: function () {
            return this._prevX;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Missile.prototype, "prevY", {
        get: function () {
            return this._prevY;
        },
        enumerable: false,
        configurable: true
    });
    return Missile;
}(g.Sprite));
exports.Missile = Missile;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}