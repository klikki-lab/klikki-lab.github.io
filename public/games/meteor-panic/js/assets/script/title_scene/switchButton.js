window.gLocalAssetContainer["switchButton"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.SwitchButton = void 0;
var fontSize_1 = require("../common/fontSize");
var SwitchButton = /** @class */ (function (_super) {
    __extends(SwitchButton, _super);
    function SwitchButton(scene, font, switchLabel, fontSize) {
        if (fontSize === void 0) { fontSize = fontSize_1.FontSize.TINY; }
        var _this = _super.call(this, { scene: scene }) || this;
        _this.onClicked = new g.Trigger();
        _this._on = true;
        var label = new g.Label({
            scene: scene,
            font: font,
            text: switchLabel.ON,
            anchorX: 0.5,
            anchorY: 0.5,
            fontSize: fontSize,
        });
        var colors = ["orange", "grey"];
        var maxLength = Math.max(switchLabel.ON.length, switchLabel.OFF.length);
        var maxWidth = maxLength * label.fontSize;
        var rect = new g.FilledRect({
            scene: scene,
            width: maxWidth + (maxWidth / maxLength) * 2,
            height: label.height * 3,
            cssColor: colors[0],
            anchorX: 0.5,
            anchorY: 0.5,
            touchable: true,
        });
        rect.onPointDown.add(function (_e) {
            _this._on = !_this._on;
            label.text = _this._on ? switchLabel.ON : switchLabel.OFF;
            label.invalidate();
            rect.cssColor = colors[_this._on ? 0 : 1];
            rect.modified();
            _this.onClicked.fire(_this._on);
        });
        _this.append(rect);
        _this.append(label);
        _this.width = rect.width;
        _this.height = rect.height;
        return _this;
    }
    Object.defineProperty(SwitchButton.prototype, "on", {
        get: function () {
            return this._on;
        },
        enumerable: false,
        configurable: true
    });
    return SwitchButton;
}(g.E));
exports.SwitchButton = SwitchButton;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}