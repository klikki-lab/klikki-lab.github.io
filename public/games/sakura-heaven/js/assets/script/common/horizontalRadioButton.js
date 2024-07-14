window.gLocalAssetContainer["horizontalRadioButton"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.HorizontalRadioButton = void 0;
var button_1 = require("./button");
;
var HorizontalRadioButton = /** @class */ (function (_super) {
    __extends(HorizontalRadioButton, _super);
    function HorizontalRadioButton(scene, font, texts, selectedIndex) {
        if (selectedIndex === void 0) { selectedIndex = 0; }
        var _this = _super.call(this, { scene: scene }) || this;
        _this.selectedIndex = selectedIndex;
        _this.onClicked = new g.Trigger();
        _this.buttons = [];
        _this.setColor = function (button, selected) {
            button.setColor(selected ? button_1.Button.DEFAULT_COLOR : HorizontalRadioButton.UNSELECTED_COLOR);
        };
        _this.getSelectedIndex = function () { return _this.selectedIndex; };
        if (!texts || texts.length === 0) {
            throw new Error("texts is invalid arg: texts = ".concat(texts));
        }
        if (selectedIndex < 0 || selectedIndex >= texts.length) {
            throw new Error("selectedIndex is invalid arg: selectedIndex = ".concat(selectedIndex));
        }
        var width = 0;
        var height = 0;
        texts.forEach(function (text, index) {
            var button = new button_1.Button(scene, font, text);
            button.disableAnimation();
            _this.setColor(button, selectedIndex === index);
            if (index > 0) {
                var offsetX = _this.buttons[index - 1].x + _this.buttons[index - 1].width / 2 + button.width / 2;
                button.x = offsetX - button.getMargin();
            }
            button.onClickDown.add(function (clickedButton) {
                _this.buttons.forEach(function (button, index) {
                    _this.setColor(button, clickedButton === button);
                    if (clickedButton === button) {
                        _this.selectedIndex = index;
                    }
                });
                _this.onClicked.fire(_this);
            });
            button.modified();
            _this.buttons.push(button);
            _this.append(button);
            width += button.width;
            height = Math.max(height, button.height);
        });
        _this.width = width;
        _this.height = height;
        _this.modified();
        return _this;
    }
    HorizontalRadioButton.UNSELECTED_COLOR = "#422";
    return HorizontalRadioButton;
}(g.E));
exports.HorizontalRadioButton = HorizontalRadioButton;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}