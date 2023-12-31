window.gLocalAssetContainer["countdownTimer"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.CountdownTimer = void 0;
var fontSize_1 = require("../common/fontSize");
var CountdownTimer = /** @class */ (function (_super) {
    __extends(CountdownTimer, _super);
    function CountdownTimer(scene, font, timeLimit) {
        var _this = _super.call(this, {
            scene: scene,
            font: font,
            text: "".concat(timeLimit, " SEC TO START!"),
            anchorX: 0.5,
            anchorY: 0.5,
            fontSize: fontSize_1.FontSize.SMALL,
            x: g.game.width / 2,
        }) || this;
        _this.timeLimit = timeLimit;
        _this.onFinish = new g.Trigger();
        _this.start = function () {
            _this.onUpdate.add(_this.updateHandler);
        };
        _this.updateHandler = function () {
            _this.timeLimit -= 1 / g.game.fps;
            var time = Math.ceil(_this.timeLimit);
            var text = "".concat(time, " SEC TO START!");
            if (_this.text !== text) {
                _this.text = text;
                _this.invalidate();
            }
            if (time < 0) {
                _this.onUpdate.remove(_this.updateHandler);
                _this.onFinish.fire();
            }
        };
        _this.isTimeOver = function () { return _this.timeLimit < 0; };
        return _this;
    }
    CountdownTimer.TIME = "TIME ";
    return CountdownTimer;
}(g.Label));
exports.CountdownTimer = CountdownTimer;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}