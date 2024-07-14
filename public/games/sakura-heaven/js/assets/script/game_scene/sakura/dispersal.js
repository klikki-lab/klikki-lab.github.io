window.gLocalAssetContainer["dispersal"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.Dispersal = void 0;
var petal_1 = require("./petal");
var Dispersal = /** @class */ (function (_super) {
    __extends(Dispersal, _super);
    function Dispersal(scene, pos) {
        var _this = _super.call(this, { scene: scene, x: pos.x, y: pos.y }) || this;
        _this.onDispersed = new g.Trigger();
        _this._petals = [];
        _this.updateHandler = function () {
            var isFinish = false;
            _this._petals.forEach(function (petal, index) {
                petal.x += petal.velocity.x;
                petal.y += petal.velocity.y;
                if (g.game.age % 4 === 0 && g.game.random.generate() < 0.5) {
                    petal.velocity.x = 2 * (g.game.random.generate() * 2 - 1);
                }
                var rad = (g.game.age + index * g.game.fps) % (g.game.fps * 10) / 16;
                petal.scaleX = Math.cos(rad);
                petal.scaleY = Math.sin(rad);
                petal.opacity *= 0.95;
                petal.modified();
                if (petal.opacity <= 0.01) {
                    isFinish = true;
                    return;
                }
            });
            if (isFinish) {
                _this.onDispersed.fire(_this);
                _this.destroy();
                return true;
            }
            return false;
        };
        for (var i = 0; i < Dispersal.PETALS_NUM; i++) {
            var angle = 2 * Math.PI * (i / Dispersal.PETALS_NUM) - Dispersal.OFFSET_ANGLE;
            var petal = new petal_1.Petal(scene, "img_petal");
            var radius = petal.height * 0.5;
            var x = Math.cos(angle) * radius;
            var y = Math.sin(angle) * radius;
            petal.x = x;
            petal.y = y;
            petal.velocity.x = 2 * (g.game.random.generate() * 2 - 1);
            petal.velocity.y = 2 * (g.game.random.generate() + .5);
            petal.angle = i * Dispersal.ANGLE_RATE;
            petal.modified();
            _this.append(petal);
            _this._petals.push(petal);
        }
        _this.onUpdate.add(_this.updateHandler);
        return _this;
    }
    Dispersal.PETALS_NUM = 5;
    Dispersal.ANGLE_RATE = 360 / Dispersal.PETALS_NUM;
    Dispersal.OFFSET_ANGLE = Math.PI / 2;
    return Dispersal;
}(g.E));
exports.Dispersal = Dispersal;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}