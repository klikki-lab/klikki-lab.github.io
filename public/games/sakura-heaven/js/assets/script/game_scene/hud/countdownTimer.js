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
var CountdownTimer = /** @class */ (function (_super) {
    __extends(CountdownTimer, _super);
    function CountdownTimer(scene, font, remainingSec) {
        var _this = _super.call(this, {
            scene: scene,
            text: "",
            font: font,
            x: g.game.width - font.size * 5.5,
            y: font.size / 2,
        }) || this;
        _this.remainingSec = remainingSec;
        _this.onFinish = new g.Trigger();
        _this.isEnd = function () { return _this.remainingSec <= 0; };
        _this.start = function () { _this.onUpdate.add(_this.updateHandler); };
        _this.spacePadding = function (sec) { return (CountdownTimer.SPACE + sec).slice(-CountdownTimer.SPACE.length); };
        _this.updateHandler = function () {
            _this.remainingSec -= 1 / g.game.fps;
            var sec = Math.ceil(_this.remainingSec);
            var text = "TIME ".concat(_this.spacePadding(sec.toString()));
            if (_this.text !== text) {
                _this.text = text;
                _this.invalidate();
                if (sec <= 0) {
                    _this.onFinish.fire();
                    _this.onUpdate.destroy();
                }
            }
        };
        _this.text = "TIME ".concat(_this.spacePadding(remainingSec.toString()));
        _this.invalidate();
        return _this;
    }
    CountdownTimer.SPACE = "  ";
    return CountdownTimer;
}(g.Label));
exports.CountdownTimer = CountdownTimer;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}