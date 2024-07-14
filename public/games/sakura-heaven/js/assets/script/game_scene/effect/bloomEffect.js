window.gLocalAssetContainer["bloomEffect"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.BloomEffect = void 0;
var petal_1 = require("../sakura/petal");
var BloomEffect = /** @class */ (function (_super) {
    __extends(BloomEffect, _super);
    function BloomEffect(scene, pos, scoreRate, assetId) {
        if (assetId === void 0) { assetId = "img_sakura_no_gradation"; }
        var _this = _super.call(this, { scene: scene, x: pos.x, y: pos.y }) || this;
        _this.scoreRate = scoreRate;
        _this._petals = [];
        _this.updateHandler = function () {
            var isFinish = false;
            _this._petals.forEach(function (petal) {
                petal.x += petal.velocity.x;
                petal.y += petal.velocity.y;
                petal.velocity.x *= 0.98;
                petal.velocity.y *= 0.98;
                petal.opacity *= 0.97;
                petal.angle += _this.scoreRate;
                petal.modified();
                if (petal.opacity <= 0.01) {
                    isFinish = true;
                    return;
                }
            });
            if (isFinish) {
                _this.destroy();
            }
        };
        var count = Math.floor(scoreRate * 3);
        for (var i = 0; i < count; i++) {
            var angle = 2 * Math.PI * (i / count) - BloomEffect.OFFSET_ANGLE;
            var petal = new petal_1.Petal(scene, assetId);
            var radius = petal.height * 0.5;
            var x = Math.cos(angle) * radius;
            var y = Math.sin(angle) * radius;
            petal.x = x;
            petal.y = y;
            petal.angle = i * BloomEffect.ANGLE_RATE;
            _this.scale(scoreRate / 5);
            petal.velocity.x = x * 16 * (1 / g.game.fps) * (g.game.random.generate() * 2 - 1);
            petal.velocity.y = y * 16 * (1 / g.game.fps) * (g.game.random.generate() * 2 - 1);
            petal.modified();
            _this.append(petal);
            _this._petals.push(petal);
        }
        _this.onUpdate.add(_this.updateHandler);
        return _this;
    }
    BloomEffect.PETALS_NUM = 5;
    BloomEffect.OFFSET_ANGLE = Math.PI / 2;
    BloomEffect.ANGLE_RATE = 360 / BloomEffect.PETALS_NUM;
    return BloomEffect;
}(g.E));
exports.BloomEffect = BloomEffect;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}