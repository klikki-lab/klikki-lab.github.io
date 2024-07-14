window.gLocalAssetContainer["greenEgg"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.GreenEgg = void 0;
var easterEgg_1 = require("./easterEgg");
var GreenEgg = /** @class */ (function (_super) {
    __extends(GreenEgg, _super);
    function GreenEgg(scene, shadow, phase, cx, cy) {
        var _this = _super.call(this, scene, "easter_egg_green", 20, shadow) || this;
        _this.phase = phase;
        _this.cx = cx;
        _this.cy = cy;
        _this.rotation = cx < g.game.width / 2 ? 0.1 : -0.1;
        return _this;
    }
    GreenEgg.prototype.init = function (x, y, targetX, targetY) {
        _super.prototype.init.call(this, x, y, targetX, targetY);
    };
    GreenEgg.prototype.move = function () {
        var angle = 2 * Math.PI * this.phase;
        var rx = Math.cos(angle) * GreenEgg.RADIUS;
        var ry = Math.sin(angle) * GreenEgg.RADIUS;
        this.cx += this.vx;
        this.cy += this.vy;
        this.x = this.cx + rx;
        this.y = this.cy + ry;
        this.modified();
        this.phase += (1 / g.game.fps) * this.rotation;
    };
    GreenEgg.COLOR = "#8c8";
    GreenEgg.RADIUS = easterEgg_1.EasterEgg.SIZE * 1.25;
    return GreenEgg;
}(easterEgg_1.EasterEgg));
exports.GreenEgg = GreenEgg;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}