window.gLocalAssetContainer["effectLine"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.EffectLine = void 0;
var EffectLine = /** @class */ (function (_super) {
    __extends(EffectLine, _super);
    function EffectLine(scene) {
        var _this = _super.call(this, {
            scene: scene,
            src: scene.asset.getImageById("img_effect_line"),
            anchorX: 0.5,
            anchorY: 0.5,
            opacity: .1,
            hidden: true,
        }) || this;
        _this.updateHandler = function () {
            if (g.game.age % 2 === 0) {
                _this.scaleX *= -1;
                _this.modified();
            }
        };
        return _this;
    }
    EffectLine.prototype.start = function () {
        if (!this.onUpdate.contains(this.updateHandler)) {
            this.onUpdate.add(this.updateHandler);
        }
        this.show();
    };
    EffectLine.prototype.stop = function () {
        if (this.onUpdate.contains(this.updateHandler)) {
            this.onUpdate.remove(this.updateHandler);
        }
        this.hide();
    };
    return EffectLine;
}(g.Sprite));
exports.EffectLine = EffectLine;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}