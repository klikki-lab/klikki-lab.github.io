window.gLocalAssetContainer["Explosion"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.Explosion = void 0;
var Explosion = /** @class */ (function (_super) {
    __extends(Explosion, _super);
    function Explosion(scene, point, scale, interval) {
        if (scale === void 0) { scale = 1; }
        if (interval === void 0) { interval = 1000 / g.game.fps * 2; }
        var _this = this;
        var asset = scene.asset.getImageById("explosion");
        _this = _super.call(this, {
            scene: scene,
            src: asset,
            width: asset.width / 3,
            height: asset.height,
            srcWidth: asset.width / 3,
            srcHeight: asset.height,
            anchorX: 0.5,
            anchorY: 0.5,
            x: point.x,
            y: point.y,
            scaleX: scale,
            scaleY: scale,
            angle: g.game.random.generate() * 360,
            frames: [0, 1, 2, 1, 0],
            interval: Math.floor(interval),
            loop: false,
        }) || this;
        _this.start();
        _this.onFinish.addOnce(function () {
            _this.destroy();
        });
        return _this;
    }
    return Explosion;
}(g.FrameSprite));
exports.Explosion = Explosion;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}