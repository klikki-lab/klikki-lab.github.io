window.gLocalAssetContainer["scorer"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.Scorer = void 0;
var fontSize_1 = require("../../common/fontSize");
var Scorer = /** @class */ (function (_super) {
    __extends(Scorer, _super);
    function Scorer(scene, font) {
        var _this = _super.call(this, {
            scene: scene,
            font: font,
            text: "SCORE 0",
            anchorX: 0.5,
            anchorY: 0.5,
            fontSize: fontSize_1.FontSize.SMALL,
            x: g.game.width * 0.5,
            y: fontSize_1.FontSize.SMALL * 1.5,
        }) || this;
        _this.add = function (score) {
            g.game.vars.gameState.score += score;
            _this.text = "".concat(Scorer.SCORE).concat(g.game.vars.gameState.score.toString());
            _this.x = g.game.width * 0.5;
            _this.invalidate();
        };
        return _this;
    }
    Scorer.SCORE = "SCORE ";
    Scorer.DEFAULT_SCORE = 100;
    return Scorer;
}(g.Label));
exports.Scorer = Scorer;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}