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
            text: "\u30B9\u30B3\u30A2 ".concat(g.game.vars.gameState.score),
            font: font,
            fontSize: fontSize_1.FontSize.LARGE,
            x: g.game.width / 2,
            y: fontSize_1.FontSize.LARGE / 2,
            anchorX: 0.5,
        }) || this;
        _this.add = function (score) {
            if (score === void 0) { score = Score.ADD; }
            g.game.vars.gameState.score += Math.floor(score * (30 / g.game.fps));
            _this.text = "\u30B9\u30B3\u30A2 ".concat(g.game.vars.gameState.score);
            _this.invalidate();
        };
        _this.getSatietyLevel = function (timeLimit) { return g.game.vars.gameState.score / (timeLimit * .5 * Score.ADD * 20); };
        return _this;
    }
    Score.ADD = 10;
    return Score;
}(g.Label));
exports.Score = Score;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}