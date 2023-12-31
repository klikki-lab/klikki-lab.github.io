window.gLocalAssetContainer["BlackVirus"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.BlackVirus = void 0;
var Virus_1 = require("./Virus");
var BlackVirus = /** @class */ (function (_super) {
    __extends(BlackVirus, _super);
    function BlackVirus(scene, reflectorY) {
        if (reflectorY === void 0) { reflectorY = g.game.height; }
        var _this = _super.call(this, scene, scene.asset.getImageById("black_1"), reflectorY) || this;
        _this.isWhite = function () { return false; };
        _this.x = (g.game.width - _this.width) / 2 +
            (g.game.random.generate() * 2 - 1) * (_this.width * 3);
        _this.y = -_this.height * 0.5;
        return _this;
    }
    BlackVirus.prototype.rebound = function () {
        this.vx = (g.game.random.generate() * 2 - 1) * (g.game.width / this.width / 2);
        _super.prototype.rebound.call(this);
    };
    return BlackVirus;
}(Virus_1.Virus));
exports.BlackVirus = BlackVirus;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}