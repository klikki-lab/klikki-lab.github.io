window.gLocalAssetContainer["button"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.Button = void 0;
var fontSize_1 = require("./fontSize");
var Button = /** @class */ (function (_super) {
    __extends(Button, _super);
    function Button(scene, font, text, fontSize) {
        if (fontSize === void 0) { fontSize = fontSize_1.FontSize.TINY; }
        var _this = _super.call(this, { scene: scene }) || this;
        _this.onClicked = new g.Trigger();
        var label = new g.Label({
            scene: scene,
            font: font,
            text: text,
            anchorX: 0.5,
            anchorY: 0.5,
            fontSize: fontSize,
        });
        var maxLength = text.length;
        var maxWidth = maxLength * label.fontSize;
        var rect = new g.FilledRect({
            scene: scene,
            width: maxWidth + (maxWidth / maxLength) * 2,
            height: label.height * 3,
            cssColor: Button.NORMAL,
            anchorX: 0.5,
            anchorY: 0.5,
            touchable: true,
        });
        rect.onPointDown.add(function (e) {
            _this.onClicked.fire();
        });
        _this.append(rect);
        _this.append(label);
        return _this;
    }
    Button.NORMAL = "orange";
    Button.PRESSED = "grey";
    return Button;
}(g.E));
exports.Button = Button;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}