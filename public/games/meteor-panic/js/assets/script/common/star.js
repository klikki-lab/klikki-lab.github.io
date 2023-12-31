window.gLocalAssetContainer["star"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.Star = void 0;
var Star = /** @class */ (function (_super) {
    __extends(Star, _super);
    function Star(scene) {
        var size = g.game.random.generate() + 2;
        return _super.call(this, {
            scene: scene,
            width: size,
            height: size,
            x: (g.game.width - 32) * g.game.random.generate() + 16,
            y: (g.game.height * 0.8) * g.game.random.generate(),
            cssColor: Star.COLORS[Math.floor(Star.COLORS.length * g.game.random.generate())]
        }) || this;
    }
    Star.COLORS = ["cyan", "magenta", "green", "yellow", "white"];
    return Star;
}(g.FilledRect));
exports.Star = Star;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}