window.gLocalAssetContainer["noteGuide"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.NoteGuide = void 0;
var NoteGuide = /** @class */ (function (_super) {
    __extends(NoteGuide, _super);
    function NoteGuide(scene, pos) {
        var _this = _super.call(this, {
            scene: scene,
            src: scene.asset.getImageById("img_sakura_border"),
            anchorX: .5,
            anchorY: .5,
            x: pos.x,
            y: pos.y,
        }) || this;
        _this.beat = function () {
            _this.scale(1.5);
            _this.modified();
        };
        _this.updateHandler = function () {
            if (_this.scaleX === 1) {
                return;
            }
            _this.scale(_this.scaleX *= 0.9);
            if (_this.scaleX <= 1) {
                _this.scale(1);
            }
            _this.modified();
        };
        _this.onUpdate.add(_this.updateHandler);
        return _this;
    }
    return NoteGuide;
}(g.Sprite));
exports.NoteGuide = NoteGuide;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}