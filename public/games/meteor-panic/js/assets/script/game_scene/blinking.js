window.gLocalAssetContainer["blinking"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.Blinking = void 0;
var Blinking = /** @class */ (function (_super) {
    __extends(Blinking, _super);
    function Blinking(scene) {
        var _this = _super.call(this, {
            scene: scene,
            width: g.game.width,
            height: g.game.height,
            cssColor: "red",
            opacity: 0.25,
            hidden: true,
        }) || this;
        _this.updateHandler = function () {
            _this.opacity -= (1 / g.game.fps);
            if (_this.opacity <= 0) {
                _this.onUpdate.remove(_this.updateHandler);
                _this.hide();
            }
        };
        _this.blink = function () {
            _this.opacity = 0.5;
            _this.modified();
            _this.onUpdate.add(_this.updateHandler);
            _super.prototype.show.call(_this);
        };
        return _this;
    }
    return Blinking;
}(g.FilledRect));
exports.Blinking = Blinking;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}