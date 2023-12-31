window.gLocalAssetContainer["WhiteVirus2"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.WhiteVirus2 = void 0;
var Virus_1 = require("./Virus");
var WhiteVirus2 = /** @class */ (function (_super) {
    __extends(WhiteVirus2, _super);
    function WhiteVirus2(scene, reflectorY) {
        var _this = _super.call(this, scene, scene.asset.getImageById("white_2"), reflectorY) || this;
        _this.isWhite = function () { return true; };
        var isLeft = g.game.random.generate() < 0.5;
        _this.vx = g.game.random.generate() * (g.game.width / _this.width / (isLeft ? 3 : -3));
        _this.x = g.game.width / 2;
        _this.y = -_this.height * 0.5;
        return _this;
    }
    return WhiteVirus2;
}(Virus_1.Virus));
exports.WhiteVirus2 = WhiteVirus2;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}