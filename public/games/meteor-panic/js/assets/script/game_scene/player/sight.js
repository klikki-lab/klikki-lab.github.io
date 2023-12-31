window.gLocalAssetContainer["Sight"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.Sight = void 0;
var Sight = /** @class */ (function (_super) {
    __extends(Sight, _super);
    function Sight(scene, point) {
        var _this = this;
        var asset = scene.asset.getImageById("sight");
        _this = _super.call(this, {
            scene: scene,
            src: asset,
            width: asset.width,
            height: asset.height,
            x: point.x,
            y: point.y,
            anchorX: 0.5,
            anchorY: 0.5,
            opacity: 0.75,
        }) || this;
        var time = 0;
        var framePerMillis = 1 / g.game.fps;
        var threshold = 1 / 30;
        _this.onUpdate.add(function () {
            if (time >= threshold) {
                time = 0;
                _this.opacity = 1 - _this.opacity;
                _this.modified();
            }
            else {
                time += framePerMillis;
            }
        });
        return _this;
    }
    return Sight;
}(g.Sprite));
exports.Sight = Sight;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}