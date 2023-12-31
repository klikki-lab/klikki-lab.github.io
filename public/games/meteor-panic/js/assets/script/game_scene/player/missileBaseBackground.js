window.gLocalAssetContainer["missileBaseBackground"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.MissileBaseBackground = void 0;
var MissileBaseBackground = /** @class */ (function (_super) {
    __extends(MissileBaseBackground, _super);
    function MissileBaseBackground(scene, x, y) {
        return _super.call(this, {
            scene: scene,
            src: scene.asset.getImageById("destroyed_missile_base_back"),
            anchorX: 0.5,
            anchorY: 0.5,
            x: x,
            y: y,
            hidden: true,
        }) || this;
    }
    return MissileBaseBackground;
}(g.Sprite));
exports.MissileBaseBackground = MissileBaseBackground;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}