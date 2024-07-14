window.gLocalAssetContainer["gameFinish"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.GameFinish = void 0;
var GameFinish = /** @class */ (function (_super) {
    __extends(GameFinish, _super);
    function GameFinish(scene, font, remainingSec) {
        if (remainingSec === void 0) { remainingSec = 2; }
        var _this = _super.call(this, {
            scene: scene,
            text: "おしまい",
            font: font,
            fontSize: font.size,
            anchorX: 0.5,
            anchorY: 0.5,
            x: g.game.width / 2,
            y: -font.size,
        }) || this;
        _this.onFinish = new g.Trigger();
        var gravity = 0.98;
        var vy = font.size * .25;
        _this.onUpdate.add(function () {
            _this.y += vy;
            vy += gravity;
            if (_this.y >= g.game.height / 2) {
                _this.y = g.game.height / 2;
                vy = -vy * .5;
                if (Math.abs(vy) < font.size * .05) {
                    return true;
                }
            }
            _this.modified();
        });
        return _this;
    }
    return GameFinish;
}(g.Label));
exports.GameFinish = GameFinish;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}