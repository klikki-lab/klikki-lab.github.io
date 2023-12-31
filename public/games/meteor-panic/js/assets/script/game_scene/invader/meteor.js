window.gLocalAssetContainer["Meteor"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.Meteor = void 0;
var missileBase_1 = require("../player/missileBase");
var invader_1 = require("./invader");
var Meteor = /** @class */ (function (_super) {
    __extends(Meteor, _super);
    function Meteor(scene, random, start, target, _waveTimes, _crackCount) {
        if (_crackCount === void 0) { _crackCount = Meteor.MAX_CRACK_COUNT; }
        var _this = this;
        var asset = scene.asset.getImageById("meteor");
        var radian = Math.atan2(target.y - start.y, target.x - start.x);
        var scale = Math.pow(0.75, Meteor.MAX_CRACK_COUNT - _crackCount);
        _this = _super.call(this, {
            scene: scene,
            src: asset,
            anchorX: 0.5,
            anchorY: 0.5,
            width: asset.width,
            height: asset.height,
            x: start.x,
            y: start.y - asset.height / 2,
            scaleX: scale,
            scaleY: scale,
            angle: radian * (180 / Math.PI) + 90,
        }) || this;
        _this.random = random;
        _this._waveTimes = _waveTimes;
        _this._crackCount = _crackCount;
        _this.onFalling = new g.Trigger();
        _this.onSmoke = new g.Trigger();
        _this.onCracked = new g.Trigger();
        _this.vx = 0;
        _this.vy = 0;
        _this._prevX = 0;
        _this._prevY = 0;
        _this.frame = 0;
        _this.level = 0;
        _this.crackRate = 0;
        _this.crackPeriod = 0;
        _this._isStrike = false;
        _this.updateHandler = function () {
            if (_this._isStrike)
                return;
            _this.frame++;
            if (_this._crackCount > 0 && g.game.height * 0.1 < _this.y && g.game.height * 0.6 > _this.y) {
                if (_this.frame >= _this.crackPeriod) {
                    _this.crackPeriod = Math.floor(g.game.fps / 2 * _this.random.generate());
                    _this.frame = 0;
                    if (_this.random.generate() < _this.crackRate) {
                        _this._crackCount--;
                        _this.onCracked.fire(_this);
                    }
                }
            }
            var smokeW = _this.width * 0.5;
            for (var i = 0; i < _this.level; i++) {
                _this.x += _this.vx;
                _this.y += _this.vy;
                if (Math.abs(_this._prevX - _this.x) + Math.abs(_this._prevY - _this.y) >
                    smokeW + _this.random.generate() * smokeW * 0.5 * _this.level) {
                    _this._prevX = _this.x;
                    _this._prevY = _this.y;
                    _this.onSmoke.fire(_this);
                }
                _this.onFalling.fire(_this);
                if (_this._isStrike) {
                    break;
                }
            }
            _this.modified();
        };
        _this._destroy = function (combo) {
            _this.deactivate();
            _this.onDestroy.fire({ invader: _this, combo: combo });
        };
        _this.deactivate = function () {
            _this._isStrike = true;
        };
        if (target instanceof missileBase_1.MissileBase) {
            _this._target = target;
        }
        _this.level = Math.floor(_waveTimes / 3) + 3;
        _this.crackRate = _waveTimes / 300;
        _this.crackPeriod = Math.floor(g.game.fps / 2 * random.generate());
        var velocity = 30 / g.game.fps;
        _this.vx = Math.cos(radian) * velocity;
        _this.vy = Math.sin(radian) * velocity;
        _this._prevX = Math.floor(start.x);
        _this._prevY = Math.floor(start.y);
        var heatAsset = scene.asset.getImageById("heat");
        var assetW = Math.floor(heatAsset.width / 3);
        var heat = new g.FrameSprite({
            scene: scene,
            src: heatAsset,
            width: assetW,
            height: heatAsset.height,
            srcWidth: assetW,
            srcHeight: heatAsset.height,
            anchorX: 0.5,
            anchorY: 0.3,
            x: _this.width / 2,
            y: _this.height / 2,
            opacity: 0.5,
            interval: 1000 / g.game.fps,
            frames: [0, 1, 2],
            loop: true,
        });
        _this.append(heat);
        heat.start();
        _this.onUpdate.add(_this.updateHandler);
        return _this;
    }
    Object.defineProperty(Meteor.prototype, "waveTimes", {
        get: function () {
            return this._waveTimes;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Meteor.prototype, "prevX", {
        get: function () {
            return this._prevX;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Meteor.prototype, "prevY", {
        get: function () {
            return this._prevY;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Meteor.prototype, "targetBase", {
        get: function () {
            return this._target;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Meteor.prototype, "crackCount", {
        get: function () {
            return this._crackCount;
        },
        enumerable: false,
        configurable: true
    });
    Meteor.MAX_CRACK_COUNT = 2;
    return Meteor;
}(invader_1.Invader));
exports.Meteor = Meteor;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}