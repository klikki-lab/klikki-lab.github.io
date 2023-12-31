window.gLocalAssetContainer["Ticker"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
var BitmapFontLabel_1 = require("./BitmapFontLabel");
var Ticker = /** @class */ (function (_super) {
    __extends(Ticker, _super);
    function Ticker(scene, duration) {
        if (duration === void 0) { duration = Ticker.DEFAULT_MAX_DURATION; }
        var _this = _super.call(this, scene, "T".concat(duration)) || this;
        _this.onFinish = new g.Trigger();
        _this.duration = duration;
        _this.x = g.game.width - _this.fontSize * 2.5;
        _this.y = _this.height / 4;
        return _this;
    }
    Ticker.prototype.start = function () {
        var _this = this;
        var left = this.duration;
        var updateHandler = function () {
            if (left <= 0) {
                _this.onFinish.fire();
                _this.onUpdate.remove(updateHandler);
            }
            left -= 1 / g.game.fps;
            _this.text = "T".concat(Math.ceil(left));
            _this.invalidate();
        };
        this.onUpdate.add(updateHandler);
    };
    Ticker.DEFAULT_MAX_DURATION = 60;
    return Ticker;
}(BitmapFontLabel_1.BitmapFontLabel));
exports.Ticker = Ticker;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}