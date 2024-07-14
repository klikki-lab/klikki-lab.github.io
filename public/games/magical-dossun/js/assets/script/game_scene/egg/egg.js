window.gLocalAssetContainer["egg"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.Egg = void 0;
var Egg = /** @class */ (function (_super) {
    __extends(Egg, _super);
    function Egg(param, _shadow) {
        var _this = _super.call(this, param) || this;
        _this._shadow = _shadow;
        _this.vx = 0;
        _this.vy = 0;
        _this.z = 0;
        _this._isJumping = false;
        return _this;
    }
    Object.defineProperty(Egg.prototype, "isJumping", {
        get: function () { return this._isJumping; },
        enumerable: false,
        configurable: true
    });
    Egg.prototype.getGroundX = function () { return this._shadow.x; };
    Egg.prototype.getGroundY = function () { return this._shadow.y; };
    Egg.prototype.getGroundPos = function () { return { x: this.getGroundX(), y: this.getGroundY() }; };
    Egg.prototype.destroy = function (destroySurface) {
        var _a;
        (_a = this._shadow) === null || _a === void 0 ? void 0 : _a.destroy(destroySurface);
        if (!this.destroyed()) {
            _super.prototype.destroy.call(this, destroySurface);
        }
    };
    return Egg;
}(g.FrameSprite));
exports.Egg = Egg;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}