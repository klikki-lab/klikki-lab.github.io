window.gLocalAssetContainer["common"] = function(g) { (function(exports, require, module, __filename, __dirname) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Common = void 0;
var fontSize_1 = require("./fontSize");
var Common;
(function (Common) {
    Common.createFloor = function (scene) {
        var floor = new g.FilledRect({
            scene: scene,
            width: g.game.width,
            height: g.game.height,
            cssColor: "#2a1010",
        });
        var size = 80;
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 16; j++) {
                if ((i + j) % 2 === 0)
                    continue;
                new g.FilledRect({
                    scene: scene,
                    parent: floor,
                    width: size,
                    height: size,
                    cssColor: "#3a2020",
                    x: j * size,
                    y: i * size,
                });
            }
        }
        return floor;
    };
    Common.createNoteGuidePosTable = function (bpm, radiusRate) {
        if (radiusRate === void 0) { radiusRate = 1; }
        var table = [];
        var offsetAngle = Math.PI / 2;
        for (var i = 0; i < bpm; i++) {
            var angle = 2 * Math.PI * (i / bpm) - offsetAngle;
            var radius = g.game.width * 0.15;
            var x = g.game.width / 2 + Math.cos(angle) * radius * radiusRate;
            var y = g.game.height / 2 + Math.sin(angle) * radius * radiusRate;
            table.push({ x: x, y: y });
        }
        return table;
    };
    Common.createDynamicFont = function (size, fontFamily, fontColor, strokeColor) {
        if (size === void 0) { size = fontSize_1.FontSize.LARGE; }
        if (fontFamily === void 0) { fontFamily = "sans-serif"; }
        if (fontColor === void 0) { fontColor = "#ffaaaa"; }
        if (strokeColor === void 0) { strokeColor = "black"; }
        return new g.DynamicFont({
            game: g.game,
            fontFamily: fontFamily,
            fontColor: fontColor,
            fontWeight: "bold",
            size: size,
            strokeColor: strokeColor,
            strokeWidth: size / 6,
        });
    };
})(Common || (exports.Common = Common = {}));

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}