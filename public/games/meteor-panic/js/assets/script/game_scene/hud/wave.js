window.gLocalAssetContainer["wave"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.Wave = void 0;
var fontSize_1 = require("../../common/fontSize");
var Wave = /** @class */ (function (_super) {
    __extends(Wave, _super);
    function Wave(scene, font, _times) {
        if (_times === void 0) { _times = 0; }
        var _this = _super.call(this, {
            scene: scene,
            font: font,
            text: "".concat(Wave.WAVE, " 0"),
            anchorX: 0.5,
            anchorY: 0.5,
            fontSize: fontSize_1.FontSize.SMALL,
            x: font.defaultGlyphWidth * 7,
            y: fontSize_1.FontSize.SMALL * 1.5,
        }) || this;
        _this._times = _times;
        _this.next = function () {
            _this.text = "".concat(Wave.WAVE, " ").concat(++_this._times);
            _this.invalidate();
        };
        return _this;
    }
    Object.defineProperty(Wave.prototype, "times", {
        get: function () {
            return this._times;
        },
        enumerable: false,
        configurable: true
    });
    Wave.WAVE = "WAVE";
    return Wave;
}(g.Label));
exports.Wave = Wave;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}