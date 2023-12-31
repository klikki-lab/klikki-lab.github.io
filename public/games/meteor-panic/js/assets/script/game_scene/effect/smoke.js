window.gLocalAssetContainer["Smoke"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.Smoke = void 0;
var Smoke = /** @class */ (function (_super) {
    __extends(Smoke, _super);
    function Smoke(scene, smoky) {
        var _this = this;
        var asset = scene.asset.getImageById("smoke");
        _this = _super.call(this, {
            scene: scene,
            src: asset,
            width: asset.width,
            height: asset.height,
            anchorX: 0.5,
            anchorY: 0.5,
            opacity: 1,
            x: smoky.prevX,
            y: smoky.prevY,
            scaleX: 0.75 * smoky.scaleX,
            scaleY: 0.75 * smoky.scaleY,
            angle: g.game.random.generate() * 360,
        }) || this;
        var rate = 1 / g.game.fps / 2;
        var scaleRate = rate * 0.5;
        var updateHandler = function () {
            _this.scale(_this.scaleX - scaleRate * smoky.scaleX);
            _this.opacity = Math.max(_this.opacity - rate, 0);
            _this.modified();
            if (_this.opacity <= 0.01) {
                _this.onUpdate.remove(updateHandler);
                _this.destroy();
            }
        };
        _this.onUpdate.add(updateHandler);
        return _this;
    }
    return Smoke;
}(g.Sprite));
exports.Smoke = Smoke;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}