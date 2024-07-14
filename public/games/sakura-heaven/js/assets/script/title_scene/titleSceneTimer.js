window.gLocalAssetContainer["titleSceneTimer"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.TitleSceneTimer = void 0;
var TitleSceneTimer = /** @class */ (function (_super) {
    __extends(TitleSceneTimer, _super);
    function TitleSceneTimer(scene, font, remainingSec) {
        var _this = _super.call(this, {
            scene: scene,
            text: "\u958B\u59CB\u307E\u3067".concat(remainingSec, " \u79D2"),
            font: font,
            anchorX: .5,
            anchorY: .5,
        }) || this;
        _this.remainingSec = remainingSec;
        _this.onFinish = new g.Trigger();
        _this.isStop = false;
        _this.isEnd = function () { return _this.remainingSec <= 0; };
        _this.start = function () { _this.onUpdate.add(_this.updateHandler); };
        _this.stop = function () {
            _this.isStop = true;
            if (_this.onUpdate.contains(_this.updateHandler)) {
                _this.onUpdate.remove(_this.updateHandler);
            }
        };
        _this.updateHandler = function () {
            _this.remainingSec -= 1 / g.game.fps;
            var sec = Math.ceil(_this.remainingSec);
            var text = "\u958B\u59CB\u307E\u3067 ".concat(sec, " \u79D2");
            if (_this.text !== text) {
                _this.text = text;
                _this.invalidate();
                if (sec < 0 && !_this.isStop) {
                    _this.onFinish.fire();
                    _this.onUpdate.destroy();
                }
            }
        };
        _this.x = g.game.width / 2;
        _this.y = g.game.height - _this.height * 2;
        _this.modified();
        return _this;
    }
    TitleSceneTimer.SPACE = "  ";
    return TitleSceneTimer;
}(g.Label));
exports.TitleSceneTimer = TitleSceneTimer;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}