window.gLocalAssetContainer["blackout"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.Blackout = void 0;
var Blackout = /** @class */ (function (_super) {
    __extends(Blackout, _super);
    function Blackout(scene, parent) {
        var _this = _super.call(this, {
            scene: scene,
            parent: parent,
            width: g.game.width,
            height: g.game.height,
            cssColor: "black",
        }) || this;
        _this.open = function () {
            _this.opacity = 0.5;
            _this.modified();
            _this.onUpdate.add(_this.openHandler);
        };
        _this.openHandler = function () {
            _this.opacity -= (1 / g.game.fps) * 3;
            if (_this.opacity <= 0) {
                _this.opacity = 0;
                _this.onUpdate.remove(_this.openHandler);
            }
            _this.modified();
        };
        _this.close = function () {
            _this.opacity = 0;
            _this.modified();
            _this.onUpdate.add(_this.closeHandler);
        };
        _this.closeHandler = function () {
            _this.opacity += (1 / g.game.fps) * 3;
            if (_this.opacity >= 0.5) {
                _this.opacity = 0.5;
                _this.onUpdate.remove(_this.closeHandler);
            }
            _this.modified();
        };
        return _this;
    }
    return Blackout;
}(g.FilledRect));
exports.Blackout = Blackout;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}