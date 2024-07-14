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
var ratingScore_1 = require("../effect/ratingScore");
var Score = /** @class */ (function (_super) {
    __extends(Score, _super);
    function Score(scene, font) {
        var _this = _super.call(this, {
            scene: scene,
            font: font,
            text: "SCORE  ".concat(g.game.vars.gameState.score),
            x: font.size,
            y: font.size / 2,
        }) || this;
        _this._combo = 0;
        _this._perfectCount = 0;
        _this._completeryPerfectCount = 0;
        _this._maxCombo = 0;
        _this._bloomimg = 0;
        _this.isAbsolutelyPerfect = function () { return g.game.vars.gameState.score >= Score.COMPLETERY_PERFECT_SCORE; };
        _this.add = function (rating) {
            var bonus = 0;
            if (rating.scoreRate >= ratingScore_1.Rating.GOOD.scoreRate) {
                _this._combo++;
                if (rating.scoreRate >= ratingScore_1.Rating.SEMI_PERFECT.scoreRate) {
                    _this._perfectCount++;
                    if (ratingScore_1.Rating.PERFECT === rating) {
                        _this._completeryPerfectCount++;
                        bonus = 10;
                    }
                }
            }
            else {
                _this._combo = 0;
                if (rating.scoreRate === ratingScore_1.Rating.BAD.scoreRate) {
                    return 0;
                }
            }
            _this._maxCombo = Math.max(_this._combo, _this._maxCombo);
            _this._bloomimg++;
            var result = (Score.BASE_SCORE + bonus) * (rating.scoreRate * rating.scoreRate) +
                (_this._combo - 1) * Score.BASE_SCORE;
            g.game.vars.gameState.score += result;
            _this.text = "SCORE ".concat(g.game.vars.gameState.score);
            _this.invalidate();
            return result;
        };
        return _this;
    }
    Object.defineProperty(Score.prototype, "blooming", {
        get: function () { return this._bloomimg; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Score.prototype, "maxCombo", {
        get: function () { return this._maxCombo; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Score.prototype, "perfectCount", {
        get: function () { return this._perfectCount; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Score.prototype, "completeryPerfectCount", {
        get: function () { return this._completeryPerfectCount; },
        enumerable: false,
        configurable: true
    });
    Score.BASE_SCORE = 100;
    Score.COMPLETERY_PERFECT_SCORE = 155290;
    return Score;
}(g.Label));
exports.Score = Score;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}