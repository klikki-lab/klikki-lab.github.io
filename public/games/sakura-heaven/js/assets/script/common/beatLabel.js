window.gLocalAssetContainer["beatLabel"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.BeatLabel = void 0;
var BeatLabel = /** @class */ (function (_super) {
    __extends(BeatLabel, _super);
    function BeatLabel(scene, font, text, ticks) {
        if (ticks === void 0) { ticks = 0; }
        var _this = _super.call(this, {
            scene: scene,
            font: font,
            text: text,
            anchorX: .5,
            anchorY: .5,
            scaleX: BeatLabel.MAX_SCALE,
            scaleY: BeatLabel.MAX_SCALE,
        }) || this;
        _this._ticks = 0;
        _this._beat = 0;
        _this.start = function (beat) {
            _this._beat = beat;
            _this.onUpdate.add(_this.updateHandler);
        };
        _this.restart = function () {
            _this._ticks = 0;
            _this.scale(1);
            _this.modified();
        };
        _this.updateHandler = function () {
            if (_this._ticks++ % _this._beat === 0) {
                _this.scale(BeatLabel.MAX_SCALE);
            }
            else if (_this.scaleX > 1) {
                _this.scale(_this.scaleX * 0.93);
                if (_this.scaleX <= 0.01) {
                    _this.scale(1);
                }
            }
            _this.modified();
        };
        _this._ticks = ticks;
        return _this;
    }
    BeatLabel.MAX_SCALE = 1.5;
    return BeatLabel;
}(g.Label));
exports.BeatLabel = BeatLabel;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}