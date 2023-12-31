window.gLocalAssetContainer["Score"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
var BitmapFontLabel_1 = require("./BitmapFontLabel");
var Score = /** @class */ (function (_super) {
    __extends(Score, _super);
    function Score(scene) {
        var _this = _super.call(this, scene, "0P") || this;
        _this.onCounterStop = new g.Trigger();
        _this.combo = 0;
        _this.failCount = 0;
        /**
         * @returns ミス回数
         */
        _this.getFailCount = function () { return _this.failCount; };
        /**
         * @returns ノーミスなら true、そうでなければ false
         */
        _this.isPerfect = function () { return _this.failCount === 0; };
        /**
         * @returns スコアが理論値スコア (131580) の 8割以上であれば true、そうでなければ false
         */
        _this.isExcellentScore = function () { return g.game.vars.gameState.score >= Score.THEORETICAL_VALUE_SCORE * 0.8; };
        _this.x = BitmapFontLabel_1.BitmapFontLabel.DEFAULT_FONT_SIZE / 4;
        _this.y = BitmapFontLabel_1.BitmapFontLabel.DEFAULT_FONT_SIZE / 4;
        return _this;
        //this.init();
    }
    /**
     * ゲームリスタート時の初期化。
     */
    Score.prototype.init = function () {
        this.combo = 0;
        this.failCount = 0;
        this.setText(g.game.vars.gameState.score = 0);
    };
    /**
     * スコアの加算。
     * @returns 加算分のスコア値。
     */
    Score.prototype.add = function () {
        var addScore = Score.BASE_SCORE + Score.COMBO_BONUS * this.combo;
        g.game.vars.gameState.score = Math.min(g.game.vars.gameState.score + addScore, Score.COUNTER_STOP);
        this.setText(g.game.vars.gameState.score);
        // this.timeline.create(this).every((e: number, p: number) => {
        //     this.setText(g.game.vars.gameState.score - Math.floor(addScore * (1 - p)));
        // }, 250);
        this.combo++;
        if (g.game.vars.gameState.score >= Score.COUNTER_STOP) {
            this.onCounterStop.fire();
        }
        return addScore;
    };
    /**
     * ミス。コンボ回数は 0 になり、ミス回数がインクリメントされる。
     */
    Score.prototype.fail = function () {
        //this.add(); // デバッグ用
        this.combo = 0;
        this.failCount++;
    };
    Score.prototype.setText = function (score) {
        this.text = "".concat(score, "P");
        this.invalidate();
    };
    /** 理論値スコア (最後のウイルスへの反応が一瞬遅れると 129960 点になる) */
    Score.THEORETICAL_VALUE_SCORE = 131580;
    Score.COUNTER_STOP = 999999999999;
    Score.BASE_SCORE = 100;
    Score.COMBO_BONUS = 10;
    return Score;
}(BitmapFontLabel_1.BitmapFontLabel));
exports.Score = Score;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}