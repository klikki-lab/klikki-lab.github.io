window.gLocalAssetContainer["goldEgg"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.GoldEgg = void 0;
var easterEgg_1 = require("./easterEgg");
var GoldEgg = /** @class */ (function (_super) {
    __extends(GoldEgg, _super);
    function GoldEgg(scene, shadow) {
        return _super.call(this, scene, "easter_egg_gold", 200, shadow, 3) || this;
    }
    GoldEgg.prototype.init = function (x, y, targetX, targetY) {
        _super.prototype.init.call(this, x, y, targetX, targetY);
    };
    GoldEgg.prototype.move = function () {
        this.x += this.vx;
        this.y += this.vy;
        this.modified();
    };
    GoldEgg.COLOR = "#ffd700";
    return GoldEgg;
}(easterEgg_1.EasterEgg));
exports.GoldEgg = GoldEgg;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}