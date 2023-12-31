window.gLocalAssetContainer["ticker"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.Ticker = void 0;
var fontSize_1 = require("../../common/fontSize");
var Ticker = /** @class */ (function (_super) {
    __extends(Ticker, _super);
    function Ticker(scene, font, _timeLimit) {
        var _this = _super.call(this, {
            scene: scene,
            font: font,
            text: "".concat(Ticker.TIME).concat(_timeLimit),
            anchorX: 0.5,
            anchorY: 0.5,
            fontSize: fontSize_1.FontSize.SMALL,
            x: g.game.width - font.defaultGlyphWidth * 7,
            y: fontSize_1.FontSize.SMALL * 1.5,
        }) || this;
        _this._timeLimit = _timeLimit;
        _this.onCountdown = new g.Trigger();
        _this.onFinish = new g.Trigger();
        _this.start = function () {
            _this.onUpdate.add(_this.updateHandler);
        };
        _this.updateHandler = function () {
            _this._timeLimit -= 1 / g.game.fps;
            var time = Math.ceil(_this._timeLimit);
            var text = "".concat(Ticker.TIME).concat(time.toString().slice(-3));
            if (_this.text !== text) {
                _this.text = text;
                _this.invalidate();
                if (time <= 5 && time >= 0) {
                    _this.onCountdown.fire();
                }
            }
            if (_this._timeLimit < 0) {
                _this.onUpdate.remove(_this.updateHandler);
                _this.onFinish.fire();
            }
        };
        _this.isTimeOver = function () { return _this._timeLimit < 0; };
        return _this;
    }
    Ticker.TIME = "TIME ";
    return Ticker;
}(g.Label));
exports.Ticker = Ticker;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}