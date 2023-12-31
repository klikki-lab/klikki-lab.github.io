window.gLocalAssetContainer["fireSmoke"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.FireSmoke = void 0;
var FireSmoke = /** @class */ (function (_super) {
    __extends(FireSmoke, _super);
    function FireSmoke(scene, x, y) {
        var _this = _super.call(this, {
            scene: scene,
            src: scene.asset.getImageById("smoke"),
            anchorX: 0.5,
            anchorY: 0.5,
            opacity: 0.5,
            x: x,
            y: y,
            scaleX: 0,
            scaleY: 0,
            angle: g.game.random.generate() * 360,
        }) || this;
        var velocity = 1 / g.game.fps;
        _this.onUpdate.add(function () {
            _this.scaleX += velocity;
            _this.scaleY += velocity;
            _this.opacity -= velocity * 0.1;
            if (g.game.random.generate() > 0.5) {
                _this.x += velocity * (g.game.random.generate() * 2 - 1) * _this.width;
            }
            _this.y -= velocity * _this.height * 0.5;
            _this.modified();
            if (_this.opacity <= 0) {
                _this.destroy();
            }
        });
        return _this;
    }
    return FireSmoke;
}(g.Sprite));
exports.FireSmoke = FireSmoke;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}