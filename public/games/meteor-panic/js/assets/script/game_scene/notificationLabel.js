window.gLocalAssetContainer["notificationLabel"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.NotificationLabel = void 0;
var fontSize_1 = require("../common/fontSize");
var NotificationLabel = /** @class */ (function (_super) {
    __extends(NotificationLabel, _super);
    function NotificationLabel(scene, font, text) {
        var _this = this;
        var startY = g.game.height * 0.5 - fontSize_1.FontSize.LARGE;
        _this = _super.call(this, {
            scene: scene,
            font: font,
            text: text,
            anchorX: 0.5,
            anchorY: 0.5,
            fontSize: fontSize_1.FontSize.LARGE,
            x: g.game.width / 2,
            y: startY,
            opacity: 0,
        }) || this;
        _this.onPeak = new g.Trigger();
        _this.onFinish = new g.Trigger();
        var step = Math.PI / g.game.fps / 2;
        var frame = 0;
        var updateHandler = function () {
            var sin = Math.sin(++frame * step) * 2; //1.5
            var rate = Math.min(1, sin);
            _this.y = startY + _this.height * rate;
            _this.opacity = rate;
            _this.modified();
            if (sin <= 0) {
                _this.hide();
                _this.onFinish.fire();
                _this.onUpdate.remove(updateHandler);
                _this.destroy();
            }
            else if (sin >= 0.99) {
                _this.onPeak.fire();
            }
        };
        _this.onUpdate.add(updateHandler);
        return _this;
    }
    return NotificationLabel;
}(g.Label));
exports.NotificationLabel = NotificationLabel;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}