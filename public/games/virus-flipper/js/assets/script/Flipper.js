window.gLocalAssetContainer["Flipper"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.Flipper = void 0;
var Flipper = /** @class */ (function (_super) {
    __extends(Flipper, _super);
    function Flipper(scene) {
        var _this = _super.call(this, {
            scene: scene,
            x: 0,
            y: g.game.height / Flipper.DIVISION * (Flipper.DIVISION - 1),
            width: g.game.width,
            height: g.game.height / Flipper.DIVISION,
            cssColor: Flipper.COLOR_BLACK,
        }) || this;
        _this.setWhite = function () { return _this.setColor(Flipper.COLOR_WHITE); };
        _this.setBlack = function () { return _this.setColor(Flipper.COLOR_BLACK); };
        _this.isWhite = function () { return _this.cssColor === Flipper.COLOR_WHITE; };
        _this.init();
        return _this;
    }
    Flipper.prototype.init = function () {
        var _this = this;
        this.setColor(Flipper.COLOR_BLACK);
        this.removeMouseEvent();
        this.scene.onPointDownCapture.add(function (_) { return _this.setWhite(); });
        this.scene.onPointUpCapture.add(function (_) { return _this.setBlack(); });
    };
    Flipper.prototype.removeMouseEvent = function () {
        this.scene.onPointDownCapture.removeAll();
        this.scene.onPointUpCapture.removeAll();
    };
    Flipper.prototype.setColor = function (cssColor) {
        this.cssColor = cssColor;
        this.modified();
    };
    Flipper.DIVISION = 4;
    Flipper.COLOR_WHITE = "white";
    Flipper.COLOR_BLACK = "black";
    return Flipper;
}(g.FilledRect));
exports.Flipper = Flipper;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}