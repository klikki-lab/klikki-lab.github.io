window.gLocalAssetContainer["ufoBullet"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.UFOBullet = void 0;
var missileBase_1 = require("../player/missileBase");
var invader_1 = require("./invader");
var UFOBullet = /** @class */ (function (_super) {
    __extends(UFOBullet, _super);
    function UFOBullet(scene, start, target, _waveTimes) {
        var _this = this;
        var asset = scene.asset.getImageById("ufo_bullet");
        var radian = Math.atan2(target.y - start.y, target.x - start.x);
        _this = _super.call(this, {
            scene: scene,
            src: asset,
            anchorX: 0.5,
            anchorY: 0.5,
            width: asset.width,
            height: asset.height,
            x: start.x,
            y: start.y - asset.height / 2,
            scaleX: 2,
            scaleY: 2,
            angle: radian * (180 / Math.PI) + 90,
        }) || this;
        _this.onFalling = new g.Trigger();
        _this.vx = 0;
        _this.vy = 0;
        _this._prevX = 0;
        _this._prevY = 0;
        _this.frame = 0;
        _this.level = 0;
        _this._isStrike = false;
        _this.updateHandler = function () {
            for (var i = 0; i < _this.level; i++) {
                _this.x += _this.vx;
                _this.y += _this.vy;
                _this.onFalling.fire(_this);
                if (_this._isStrike) {
                    break;
                }
            }
            _this.angle += _this.level * 10;
            _this.modified();
        };
        _this._destroy = function (combo) {
            _this.deactivate();
            _this.onDestroy.fire({ invader: _this, combo: combo });
        };
        _this.deactivate = function () {
            var _a;
            _this._isStrike = true;
            (_a = _this.onUpdate) === null || _a === void 0 ? void 0 : _a.remove(_this.updateHandler);
        };
        if (target instanceof missileBase_1.MissileBase) {
            _this._target = target;
        }
        _this.level = Math.floor(_waveTimes / 5) + 2;
        var velocity = 30 / g.game.fps;
        _this.vx = Math.cos(radian) * velocity;
        _this.vy = Math.sin(radian) * velocity;
        _this._prevX = Math.floor(start.x);
        _this._prevY = Math.floor(start.y);
        _this.onUpdate.add(_this.updateHandler);
        return _this;
    }
    Object.defineProperty(UFOBullet.prototype, "prevX", {
        get: function () {
            return this._prevX;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UFOBullet.prototype, "prevY", {
        get: function () {
            return this._prevY;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UFOBullet.prototype, "targetBase", {
        get: function () {
            return this._target;
        },
        enumerable: false,
        configurable: true
    });
    return UFOBullet;
}(invader_1.Invader));
exports.UFOBullet = UFOBullet;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}