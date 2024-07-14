window.gLocalAssetContainer["shadow"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.Shadow = void 0;
var Shadow = /** @class */ (function (_super) {
    __extends(Shadow, _super);
    function Shadow(scene, parent) {
        var _this = _super.call(this, {
            scene: scene,
            parent: parent,
            src: scene.asset.getImageById("img_shadow"),
            anchorX: 0.5,
            anchorY: 0.5,
            opacity: 0.33,
        }) || this;
        _this.move = function (e) {
            _this.x = e.x;
            _this.y = e.y + e.height / 2;
            _this.modified();
        };
        return _this;
    }
    Shadow.prototype.destroy = function (destroySurface) {
        if (!this.destroyed()) {
            _super.prototype.destroy.call(this, destroySurface);
        }
    };
    return Shadow;
}(g.Sprite));
exports.Shadow = Shadow;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}