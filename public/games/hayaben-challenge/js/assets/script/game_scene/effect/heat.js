window.gLocalAssetContainer["heat"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.Heat = void 0;
var Heat = /** @class */ (function (_super) {
    __extends(Heat, _super);
    function Heat(scene, parent) {
        var _this = _super.call(this, {
            scene: scene,
            parent: parent,
            src: scene.asset.getImageById("img_heat"),
            srcWidth: Heat.SIZE,
            srcHeight: Heat.SIZE,
            width: Heat.SIZE,
            height: Heat.SIZE,
            anchorX: .5,
            anchorY: .5,
            x: parent.width / 2,
            y: -parent.height / 4,
            frames: [0, 1, 2],
        }) || this;
        _this.start();
        var vec = 1;
        _this.onUpdate.add(function () {
            _this.y -= (_this.height * .2) * vec;
            _this.opacity = vec;
            vec *= 0.5;
            _this.modified();
            if (vec <= 0.1) {
                _this.destroy();
            }
        });
        return _this;
    }
    Heat.SIZE = 64;
    return Heat;
}(g.FrameSprite));
exports.Heat = Heat;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}