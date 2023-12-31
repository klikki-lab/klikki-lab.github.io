window.gLocalAssetContainer["BounceEffect"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.BounceEffect = void 0;
var BounceEffect = /** @class */ (function (_super) {
    __extends(BounceEffect, _super);
    function BounceEffect(scene, x, y) {
        var _this = this;
        var image = scene.asset.getImageById("bounce_effect");
        _this = _super.call(this, {
            scene: scene,
            src: image,
            x: x,
            y: y,
            opacity: 0.8
        }) || this;
        _this.onFinish = new g.Trigger();
        _this.lifeTime = 0;
        _this.updateHandler = function () {
            if (_this.lifeTime++ >= BounceEffect.LIFE_TIME) {
                _this.removeUpdate();
                _this.onFinish.fire();
            }
        };
        _this.onUpdate.add(_this.updateHandler);
        return _this;
    }
    BounceEffect.prototype.removeUpdate = function () {
        this.onUpdate.remove(this.updateHandler);
    };
    BounceEffect.LIFE_TIME = g.game.fps * 0.05;
    return BounceEffect;
}(g.Sprite));
exports.BounceEffect = BounceEffect;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}