window.gLocalAssetContainer["missileLauncher"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.MissileLauncher = void 0;
var Anim = {
    ENABLE: 0,
    EMPTY: 1,
    DISABLE: 2,
};
var MissileLauncher = /** @class */ (function (_super) {
    __extends(MissileLauncher, _super);
    function MissileLauncher(scene, baseAsset, bx, by) {
        var _this = _super.call(this, { scene: scene }) || this;
        _this._sprites = [];
        _this._remainingCount = 10;
        _this.fire = function (isUnlimited) {
            if (isUnlimited === void 0) { isUnlimited = false; }
            if (isUnlimited)
                return true;
            _this._remainingCount = Math.max(--_this._remainingCount, 0);
            for (var i = MissileLauncher.MAX_COUNT - 1; i >= 0; i--) {
                if (_this._sprites[i].frameNumber === Anim.ENABLE) {
                    _this._sprites[i].frameNumber = Anim.EMPTY;
                    _this._sprites[i].modified();
                    return true;
                }
            }
            return false;
        };
        _this.reload = function (addCount) {
            var prevCount = _this._remainingCount;
            _this._remainingCount = Math.min(_this._remainingCount + addCount, MissileLauncher.MAX_COUNT);
            var count = 0;
            for (var i = prevCount; i < prevCount + addCount && i < MissileLauncher.MAX_COUNT; i++) {
                if (_this._sprites[i].frameNumber === Anim.EMPTY) {
                    _this._sprites[i].frameNumber = Anim.ENABLE;
                    _this._sprites[i].modified();
                    count++;
                }
            }
            return count;
        };
        _this.enable = function () {
            _this._sprites.forEach(function (spr) {
                if (spr.frameNumber === Anim.DISABLE) {
                    spr.frameNumber = Anim.ENABLE;
                    spr.modified();
                }
            });
        };
        _this.disable = function () {
            _this._sprites.forEach(function (spr) {
                if (spr.frameNumber === Anim.ENABLE) {
                    spr.frameNumber = Anim.DISABLE;
                    spr.modified();
                }
            });
        };
        _this.getRemainingCount = function () { return _this._remainingCount; };
        _this.isFull = function () { return _this._remainingCount === MissileLauncher.MAX_COUNT; };
        _this.isEmpty = function () { return _this._remainingCount === 0; };
        var x = bx - baseAsset.width / 2;
        var y = by + baseAsset.height / 3;
        var asset = scene.asset.getImageById("remaining_missile");
        var srcWidth = 18;
        var margin = (x + (4 % 5) * srcWidth * 1.25 - x + (0 % 5) * srcWidth * 1.25 - baseAsset.width) / 2;
        for (var i = 0; i < MissileLauncher.MAX_COUNT; i++) {
            var sprite = new g.FrameSprite({
                scene: scene,
                src: asset,
                srcWidth: srcWidth,
                srcHeight: asset.height,
                width: srcWidth,
                height: asset.height,
                anchorX: 0.5,
                anchorY: 0.5,
                x: x + (i % 5) * srcWidth * 1.25 - margin,
                y: y + Math.floor(i / 5) * asset.height * 1.5,
                frames: [Anim.ENABLE, Anim.EMPTY, Anim.DISABLE],
                frameNumber: 0,
                loop: false,
            });
            _this._sprites.push(sprite);
            _this.append(sprite);
        }
        return _this;
    }
    MissileLauncher.MAX_COUNT = 10;
    return MissileLauncher;
}(g.E));
exports.MissileLauncher = MissileLauncher;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}