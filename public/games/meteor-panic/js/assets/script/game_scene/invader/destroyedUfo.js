window.gLocalAssetContainer["destroyedUfo"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.DestroyedUFO = void 0;
var DestroyedUFO = /** @class */ (function (_super) {
    __extends(DestroyedUFO, _super);
    function DestroyedUFO(scene, ufo) {
        var _this = _super.call(this, {
            scene: scene,
            src: scene.asset.getImageById("ufo"),
            x: ufo.x,
            y: ufo.y,
            anchorX: 0.5,
            anchorY: 0.5,
            angle: 0,
        }) || this;
        var vx = _this.x < g.game.width / 2 ? -1 : 1;
        var vy = -_this.height / g.game.fps * 6;
        var gravity = 9.8 / (g.game.fps) * 3;
        _this.onUpdate.add(function () {
            _this.x += vx * (_this.width / g.game.fps) * 2;
            _this.y += vy;
            vy += gravity;
            _this.angle += vx * (360 / g.game.fps);
            _this.opacity -= (1 / g.game.fps) / 3;
            _this.modified();
            if (_this.y + _this.height > g.game.height) {
                _this.destroy();
            }
        });
        return _this;
    }
    return DestroyedUFO;
}(g.Sprite));
exports.DestroyedUFO = DestroyedUFO;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}