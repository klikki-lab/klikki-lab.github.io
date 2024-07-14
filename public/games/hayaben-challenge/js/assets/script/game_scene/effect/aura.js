window.gLocalAssetContainer["aura"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.Aura = void 0;
var Aura = /** @class */ (function (_super) {
    __extends(Aura, _super);
    function Aura(scene) {
        return _super.call(this, {
            scene: scene,
            src: scene.asset.getImageById("img_aura"),
            srcWidth: 128,
            srcHeight: 192,
            width: 128,
            height: 192,
            opacity: 0,
            anchorX: .5,
            anchorY: .5,
            frames: [0, 1, 2],
        }) || this;
    }
    return Aura;
}(g.FrameSprite));
exports.Aura = Aura;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}