window.gLocalAssetContainer["shockWave"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.ShockWave = void 0;
var ShockWave = /** @class */ (function (_super) {
    __extends(ShockWave, _super);
    function ShockWave(scene, asset, point, isStrike, power, existsBackground, _combo, speed) {
        if (power === void 0) { power = 1; }
        if (speed === void 0) { speed = 2; }
        var _this = _super.call(this, {
            scene: scene,
            src: asset,
            width: asset.width,
            height: asset.height,
            x: point.x,
            y: point.y,
            anchorX: 0.5,
            anchorY: 0.5,
            scaleX: 0,
            scaleY: 0,
            opacity: existsBackground ? 0.75 : 1,
            compositeOperation: "xor"
        }) || this;
        _this._combo = _combo;
        _this.onSpread = new g.Trigger();
        var _power = power * (isStrike ? 1.5 : 1);
        var step = Math.PI / g.game.fps / speed;
        var frame = 0;
        _this.onUpdate.add(function () {
            _this.x = point.x + (g.game.random.generate() * 2 - 1) * _power * 2;
            _this.y = point.y + (g.game.random.generate() * 2 - 1) * _power * 2;
            var rate = Math.sin(++frame * step) * 1.01;
            var scele = Math.min(1, rate) * _power;
            _this.scale(scele);
            _this.onSpread.fire(_this);
            if (scele <= 0) {
                _this.x = point.x;
                _this.y = point.y;
                _this.scale(0);
                _this.destroy();
            }
            _this.modified();
        });
        return _this;
    }
    Object.defineProperty(ShockWave.prototype, "combo", {
        get: function () {
            return this._combo;
        },
        enumerable: false,
        configurable: true
    });
    return ShockWave;
}(g.Sprite));
exports.ShockWave = ShockWave;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}