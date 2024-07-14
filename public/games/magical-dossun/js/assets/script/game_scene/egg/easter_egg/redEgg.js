window.gLocalAssetContainer["redEgg"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.RedEgg = void 0;
var easterEgg_1 = require("./easterEgg");
var RedEgg = /** @class */ (function (_super) {
    __extends(RedEgg, _super);
    function RedEgg(scene, shadow) {
        var _this = _super.call(this, scene, "easter_egg_red", 10, shadow) || this;
        _this.init = function (x, y, targetX, targetY) {
            _super.prototype.init.call(_this, x, y, targetX, targetY);
        };
        return _this;
    }
    RedEgg.prototype.move = function () {
        this.x += this.vx;
        this.y += this.vy;
        this.modified();
    };
    RedEgg.COLOR = "#d88";
    return RedEgg;
}(easterEgg_1.EasterEgg));
exports.RedEgg = RedEgg;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}