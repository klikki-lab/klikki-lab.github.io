window.gLocalAssetContainer["finishLabel"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.FinishLabel = void 0;
var fontSize_1 = require("../common/fontSize");
var FinishLabel = /** @class */ (function (_super) {
    __extends(FinishLabel, _super);
    function FinishLabel(scene, font, text) {
        var _this = _super.call(this, {
            scene: scene,
            font: font,
            text: text,
            anchorX: 0.5,
            anchorY: 0.5,
            fontSize: fontSize_1.FontSize.LARGE,
            x: g.game.width * 0.5,
            y: g.game.height * 0.5,
        }) || this;
        _this.onFinish = new g.Trigger();
        var period = g.game.fps / 4;
        _this.onUpdate.add(function () {
            var sin = Math.sin(g.game.age / period) * 0.02;
            _this.scale(1 - sin);
            _this.modified();
        });
        return _this;
    }
    return FinishLabel;
}(g.Label));
exports.FinishLabel = FinishLabel;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}