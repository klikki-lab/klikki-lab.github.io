window.gLocalAssetContainer["BitmapFontLabel"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.BitmapFontLabel = void 0;
var BitmapFontLabel = /** @class */ (function (_super) {
    __extends(BitmapFontLabel, _super);
    function BitmapFontLabel(scene, text, fontSize) {
        if (text === void 0) { text = ""; }
        if (fontSize === void 0) { fontSize = BitmapFontLabel.DEFAULT_FONT_SIZE; }
        var glyph = JSON.parse(scene.asset.getTextById("font_glyphs").data);
        var bitmapFont = new g.BitmapFont({
            src: scene.asset.getImageById("bitmap_font"),
            map: glyph.map,
            defaultGlyphWidth: glyph.width,
            defaultGlyphHeight: glyph.height,
            missingGlyph: glyph.missingGlyph
        });
        return _super.call(this, {
            scene: scene,
            text: text,
            font: bitmapFont,
            fontSize: fontSize,
        }) || this;
    }
    BitmapFontLabel.DEFAULT_FONT_SIZE = 64;
    return BitmapFontLabel;
}(g.Label));
exports.BitmapFontLabel = BitmapFontLabel;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}