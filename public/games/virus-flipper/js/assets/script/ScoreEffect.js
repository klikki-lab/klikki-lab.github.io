window.gLocalAssetContainer["ScoreEffect"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.ScoreEffect = void 0;
var ScoreEffect = /** @class */ (function (_super) {
    __extends(ScoreEffect, _super);
    function ScoreEffect(scene, score, x, y, lifeTimeSec) {
        if (lifeTimeSec === void 0) { lifeTimeSec = ScoreEffect.LIFE_TIME_SEC; }
        var _this = _super.call(this, { scene: scene, font: ScoreEffect.FONT, text: score.toString(), textColor: "white", fontSize: ScoreEffect.FONT_SIZE }) || this;
        _this.onFinish = new g.Trigger();
        _this.updateHandler = function () {
            _this.y -= _this.vy;
            _this.vy *= 0.92;
            if (_this.vy <= 0.1) {
                _this.vy = 0;
                _this.onUpdate.remove(_this.updateHandler);
                _this.onFinish.fire();
            }
            if (_this.vy <= 0.3) {
                _this.opacity *= 0.8;
            }
            _this.modified();
        };
        _this.x = x - _this.width / 2;
        _this.y = y;
        _this.vy = _this.height / g.game.fps * 8;
        _this.onUpdate.add(_this.updateHandler);
        return _this;
    }
    ScoreEffect.prototype.removeUpdate = function () {
        this.onUpdate.remove(this.updateHandler);
    };
    ScoreEffect.LIFE_TIME_SEC = 0.5;
    ScoreEffect.FONT_SIZE = 32;
    ScoreEffect.FONT = new g.DynamicFont({
        game: g.game,
        fontFamily: "monospace",
        size: ScoreEffect.FONT_SIZE
    });
    return ScoreEffect;
}(g.Label));
exports.ScoreEffect = ScoreEffect;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}