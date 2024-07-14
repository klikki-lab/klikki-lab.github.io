window.gLocalAssetContainer["gameStart"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.GameStart = void 0;
var GameStart = /** @class */ (function (_super) {
    __extends(GameStart, _super);
    function GameStart(scene, font, remainingSec) {
        if (remainingSec === void 0) { remainingSec = 2; }
        var _this = _super.call(this, {
            scene: scene,
            text: "スタート!",
            font: font,
            fontSize: font.size,
            anchorX: 0.5,
            anchorY: 0.5,
            x: g.game.width / 2,
            y: -font.size,
        }) || this;
        _this.onFinish = new g.Trigger();
        var vy = _this.height / 10;
        var isWaiting = false;
        _this.onUpdate.add(function () {
            if (!isWaiting) {
                if (_this.y < g.game.height / 2) {
                    _this.y += vy;
                    vy *= 1.5;
                    if (_this.y >= g.game.height / 2) {
                        isWaiting = true;
                        _this.y = g.game.height / 2;
                        vy = _this.height / 10;
                    }
                    _this.modified();
                }
            }
            else {
                remainingSec -= 1 / g.game.fps;
                if (remainingSec < 0) {
                    _this.y -= vy;
                    vy *= 1.5;
                    _this.modified();
                    if (_this.y + _this.height < 0) {
                        _this.onFinish.fire();
                        _this.destroy();
                    }
                }
            }
        });
        return _this;
    }
    return GameStart;
}(g.Label));
exports.GameStart = GameStart;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}