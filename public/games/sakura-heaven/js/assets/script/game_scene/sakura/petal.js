window.gLocalAssetContainer["petal"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.Petal = void 0;
var Petal = /** @class */ (function (_super) {
    __extends(Petal, _super);
    function Petal(scene, assetId) {
        var _this = _super.call(this, {
            scene: scene,
            src: scene.asset.getImageById(assetId),
            anchorX: 0.5,
            anchorY: 0.5,
        }) || this;
        _this.velocity = { x: 0, y: 0 };
        return _this;
    }
    return Petal;
}(g.Sprite));
exports.Petal = Petal;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}