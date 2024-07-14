window.gLocalAssetContainer["blueEgg"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.BlueEgg = void 0;
var easterEgg_1 = require("./easterEgg");
var BlueEgg = /** @class */ (function (_super) {
    __extends(BlueEgg, _super);
    function BlueEgg(scene, shadow) {
        return _super.call(this, scene, "easter_egg_blue", 50, shadow, 2) || this;
    }
    BlueEgg.prototype.init = function (x, y, targetX, targetY) {
        _super.prototype.init.call(this, x, y, targetX, targetY);
    };
    BlueEgg.prototype.move = function () {
        this.x += this.vx;
        this.y += this.vy;
        this.modified();
    };
    BlueEgg.COLOR = "#88c";
    return BlueEgg;
}(easterEgg_1.EasterEgg));
exports.BlueEgg = BlueEgg;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}