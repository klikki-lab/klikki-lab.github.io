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
var Button = /** @class */ (function (_super) {
    __extends(Button, _super);
    function Button(scene, font, text, color) {
        if (color === void 0) { color = Button.DEFAULT_COLOR; }
        var _this = this;
        var label = new g.Label({
            scene: scene,
            font: font,
            text: text,
            anchorX: 0.5,
            anchorY: 0.5,
        });
        var maxLength = text.length;
        var maxWidth = maxLength * label.fontSize;
        _this = _super.call(this, {
            scene: scene,
            width: maxWidth + (maxWidth / maxLength) * 2,
            height: label.height * 2,
            cssColor: color,
            anchorX: 0.5,
            anchorY: 0.5,
            touchable: true,
        }) || this;
        _this.onClickDown = new g.Trigger();
        _this.onClicked = new g.Trigger();
        _this.isClick = false;
        _this._disabelAnimation = false;
        _this.setColor = function (color) {
            _this._rect.cssColor = color;
            _this._rect.modified();
        };
        _this.getMargin = function () { return (_this.width - _this._rect.width) / 2; };
        _this.isNormalColor = function () { return _this._rect.cssColor === Button.DEFAULT_COLOR; };
        _this.disableAnimation = function () { _this._disabelAnimation = true; };
        _this._rect = new g.FilledRect({
            scene: scene,
            parent: _this,
            width: _this.width - font.size * .25,
            height: _this.height - font.size * .25,
            cssColor: color,
            anchorX: 0.5,
            anchorY: 0.5,
            x: _this.width / 2,
            y: _this.height / 2,
            touchable: true,
        });
        label.x = _this.width / 2;
        label.y = _this.height / 2;
        _this.append(label);
        var setScale = function (scale) {
            if (_this._disabelAnimation)
                return;
            _this.scale(scale);
            _this.modified();
        };
        _this._rect.onPointDown.add(function (_ev) {
            _this.isClick = true;
            setScale(Button.SCALE_RATE);
            _this.onClickDown.fire(_this);
        });
        _this._rect.onPointMove.add(function (ev) {
            var ex = ev.point.x + ev.startDelta.x;
            var ey = ev.point.y + ev.startDelta.y;
            _this.isClick = _this.isClick && 0 <= ex && _this.width >= ex && 0 <= ey && _this.height >= ey;
            setScale(_this.isClick ? Button.SCALE_RATE : 1.0);
        });
        _this._rect.onPointUp.add(function (_ev) {
            setScale(1.0);
            if (_this.isClick) {
                _this.onClicked.fire(_this);
                _this.isClick = false;
            }
        });
        return _this;
    }
    Button.DEFAULT_COLOR = "#ffaaaa";
    Button.SCALE_RATE = .9;
    return Button;
}(g.FilledRect));
exports.Button = Button;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}