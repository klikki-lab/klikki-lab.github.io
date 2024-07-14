window.gLocalAssetContainer["exclamation"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.Exclamation = void 0;
var Exclamation = /** @class */ (function (_super) {
    __extends(Exclamation, _super);
    function Exclamation(scene, parent, e) {
        var _this = _super.call(this, {
            scene: scene,
            parent: parent,
            src: scene.asset.getImageById("img_exclamation_mark"),
            anchorX: .5,
            anchorY: .5,
            x: e.x,
            y: e.y - e.height * .75,
        }) || this;
        scene.setTimeout(function () {
            _this.destroy();
        }, 150);
        return _this;
    }
    return Exclamation;
}(g.Sprite));
exports.Exclamation = Exclamation;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}