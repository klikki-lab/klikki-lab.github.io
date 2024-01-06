window.gLocalAssetContainer["InvaderShockWave"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.InvaderShockWave = void 0;
var shockWave_1 = require("./shockWave");
var InvaderShockWave = /** @class */ (function (_super) {
    __extends(InvaderShockWave, _super);
    function InvaderShockWave(scene, point, existsBackground, combo, speed) {
        return _super.call(this, scene, scene.asset.getImageById("shock_wave_invader"), point, false, 1, existsBackground, combo, speed) || this;
    }
    return InvaderShockWave;
}(shockWave_1.ShockWave));
exports.InvaderShockWave = InvaderShockWave;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}