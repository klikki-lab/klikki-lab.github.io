window.gLocalAssetContainer["surprise"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.Surprise = void 0;
var Surprise = /** @class */ (function (_super) {
    __extends(Surprise, _super);
    function Surprise(scene, parent) {
        var _this = _super.call(this, {
            scene: scene,
            parent: parent,
            src: scene.asset.getImageById("img_surprise"),
            anchorX: 0.5,
            anchorY: 0.5,
        }) || this;
        _this.x = parent.width / 2 - _this.width * .2;
        _this.y = _this.height * .2;
        var frame = 0;
        _this.onUpdate.add(function () {
            if (frame++ > g.game.fps * 0.1) {
                _this.destroy();
            }
        });
        return _this;
    }
    return Surprise;
}(g.Sprite));
exports.Surprise = Surprise;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}