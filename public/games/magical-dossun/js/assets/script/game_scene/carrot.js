window.gLocalAssetContainer["carrot"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.Carrot = void 0;
var Carrot = /** @class */ (function (_super) {
    __extends(Carrot, _super);
    function Carrot(scene, pos, _shadow, _score) {
        if (_score === void 0) { _score = Carrot.SCORE; }
        var _this = _super.call(this, {
            scene: scene,
            src: scene.asset.getImageById("img_carrot"),
            x: pos.x,
            y: pos.y,
            anchorX: .5,
            anchorY: .5,
        }) || this;
        _this._shadow = _shadow;
        _this._score = _score;
        return _this;
    }
    Carrot.prototype.destroy = function (destroySurface) {
        this._shadow.destroy(destroySurface);
        if (!this.destroyed()) {
            _super.prototype.destroy.call(this, destroySurface);
        }
    };
    Object.defineProperty(Carrot.prototype, "score", {
        get: function () { return this._score; },
        enumerable: false,
        configurable: true
    });
    Carrot.SCORE = 1000;
    return Carrot;
}(g.Sprite));
exports.Carrot = Carrot;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}