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
var fontSize_1 = require("../../common/fontSize");
var CountdownTimer = /** @class */ (function (_super) {
    __extends(CountdownTimer, _super);
    function CountdownTimer(scene, font, remainingSec) {
        var _this = _super.call(this, {
            scene: scene,
            text: "\u306E\u3053\u308A\u6642\u9593 ".concat(remainingSec.toString()),
            font: font,
            fontSize: fontSize_1.FontSize.LARGE,
            x: fontSize_1.FontSize.LARGE,
            y: fontSize_1.FontSize.LARGE / 2,
        }) || this;
        _this.remainingSec = remainingSec;
        _this.onStart = new g.Trigger();
        _this.onTick = new g.Trigger();
        _this.onFinish = new g.Trigger();
        _this._isGameOver = false;
        _this.start = function () { _this.onUpdate.add(_this.updateHandler); };
        _this.updateHandler = function () {
            if (!_this.onStart.destroyed()) {
                _this.onStart.fire(_this.remainingSec);
                _this.onStart.destroy();
            }
            _this.remainingSec -= 1 / g.game.fps;
            var sec = Math.ceil(_this.remainingSec);
            var text = "\u306E\u3053\u308A\u6642\u9593 ".concat(sec);
            if (_this.text !== text) {
                _this.text = text;
                _this.invalidate();
                if (sec > 0) {
                    _this.onTick.fire(sec);
                }
                else if (sec <= 0) {
                    _this._isGameOver = true;
                    _this.onFinish.fire();
                    _this.onUpdate.destroy();
                }
            }
        };
        return _this;
    }
    Object.defineProperty(CountdownTimer.prototype, "isGameOver", {
        get: function () { return this._isGameOver; },
        enumerable: false,
        configurable: true
    });
    return CountdownTimer;
}(g.Label));
exports.CountdownTimer = CountdownTimer;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}