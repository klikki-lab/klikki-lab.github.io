window.gLocalAssetContainer["startTimer"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.StartTimer = void 0;
var StartTimer = /** @class */ (function (_super) {
    __extends(StartTimer, _super);
    function StartTimer(scene, font, remainingSec) {
        var _this = _super.call(this, {
            scene: scene,
            text: "\u3042\u3068 ".concat(remainingSec.toString(), " \u79D2\u3067\u30B2\u30FC\u30E0\u30B9\u30BF\u30FC\u30C8\uFF01"),
            font: font,
            fontSize: font.size,
            anchorX: 0.5,
            anchorY: 0.5,
        }) || this;
        _this.remainingSec = remainingSec;
        _this.onTick = new g.Trigger();
        _this.onFinish = new g.Trigger();
        _this.start = function () { _this.onUpdate.add(_this.updateHandler); };
        _this.updateHandler = function () {
            _this.remainingSec -= 1 / g.game.fps;
            var sec = Math.ceil(_this.remainingSec);
            var text = "\u3042\u3068 ".concat(sec.toString(), " \u79D2\u3067\u30B2\u30FC\u30E0\u30B9\u30BF\u30FC\u30C8\uFF01");
            if (_this.text !== text) {
                _this.text = text;
                _this.invalidate();
                if (sec > 0) {
                    _this.onTick.fire(sec);
                }
                else if (sec < 0) {
                    _this.onFinish.fire();
                    return true;
                }
            }
        };
        return _this;
    }
    return StartTimer;
}(g.Label));
exports.StartTimer = StartTimer;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}