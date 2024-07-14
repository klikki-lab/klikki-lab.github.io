window.gLocalAssetContainer["petalEffect"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.PetalEffect = void 0;
var petal_1 = require("../sakura/petal");
var PetalEffect = /** @class */ (function (_super) {
    __extends(PetalEffect, _super);
    function PetalEffect(scene, pos) {
        var _this = _super.call(this, scene, "img_petal") || this;
        _this.cos = 0;
        _this.sin = 0;
        _this.updateHandler = function () {
            _this.x += _this.velocity.x;
            _this.y += _this.velocity.y;
            _this.scale((1 - _this.opacity) * .5);
            _this.opacity *= 0.95;
            _this.angle += _this.velocity.x;
            _this.modified();
            if (_this.opacity <= 0.01) {
                _this.destroy();
            }
        };
        _this.x = pos.x;
        _this.y = pos.y;
        _this.velocity.x = (g.game.random.generate() * 2 - 1);
        _this.velocity.y = (g.game.random.generate() * 2 - 1);
        _this.angle = g.game.random.generate() * 360;
        _this.scale(0);
        _this.opacity = 1;
        _this.modified();
        _this.onUpdate.add(_this.updateHandler);
        return _this;
    }
    return PetalEffect;
}(petal_1.Petal));
exports.PetalEffect = PetalEffect;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}