window.gLocalAssetContainer["score"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.Score = void 0;
var fontSize_1 = require("../../common/fontSize");
var Score = /** @class */ (function (_super) {
    __extends(Score, _super);
    function Score(scene, font) {
        var _this = _super.call(this, {
            scene: scene,
            text: "SCORE  ".concat(g.game.vars.gameState.score),
            font: font,
            fontSize: fontSize_1.FontSize.LARGE,
            x: g.game.width / 2,
            y: fontSize_1.FontSize.LARGE / 2,
            anchorX: 0.5,
        }) || this;
        /**
         * 得点を加算する。マルチコンボボーナスを含めた得点は スコア * combo。
         * @param score スコア
         * @param combo マルチコンボ数
         * @returns score + combo * 100
         */
        _this.add = function (score, combo) {
            if (combo === void 0) { combo = 1; }
            var result = score * Math.max(combo, 1);
            // const multiComboBonus = combo <= 1 ? 0 : Score.MULTI_BONUS << (combo - 1);
            // const result = score + multiComboBonus;
            g.game.vars.gameState.score += result;
            _this.text = "SCORE ".concat(g.game.vars.gameState.score);
            _this.invalidate();
            return result;
        };
        return _this;
    }
    Score.MULTI_BONUS = 10;
    return Score;
}(g.Label));
exports.Score = Score;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}