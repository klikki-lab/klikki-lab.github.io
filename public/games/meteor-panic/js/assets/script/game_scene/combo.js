window.gLocalAssetContainer["Combo"] = function(g) { (function(exports, require, module, __filename, __dirname) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Combo = void 0;
var Combo = /** @class */ (function () {
    function Combo() {
        var _this = this;
        this._count = 0;
        this.increment = function () { return _this._count++; };
    }
    Object.defineProperty(Combo.prototype, "count", {
        get: function () {
            return Math.min(this._count, Combo.MAX_COMBO);
        },
        enumerable: false,
        configurable: true
    });
    Combo.MAX_COMBO = 6;
    return Combo;
}());
exports.Combo = Combo;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}