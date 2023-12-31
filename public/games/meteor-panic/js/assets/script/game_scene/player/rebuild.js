window.gLocalAssetContainer["rebuild"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.Rebuild = void 0;
var Rebuild = /** @class */ (function (_super) {
    __extends(Rebuild, _super);
    function Rebuild(scene, base) {
        var _this = _super.call(this, {
            scene: scene,
            src: scene.asset.getImageById("missile_base_rebuild"),
            x: base.x,
            y: base.y,
            anchorX: 0.5,
            anchorY: 0.5,
            opacity: 0,
        }) || this;
        _this.onRebuilded = new g.Trigger();
        var step = Math.PI / g.game.fps;
        var frames = 0;
        var updateHandler = function () {
            var sin = Math.sin(++frames * step);
            var rate = Math.min(1, sin);
            _this.opacity = rate;
            _this.modified();
            if (!base.visible() && sin >= 0.99) {
                _this.onRebuilded.fire();
            }
            if (base.visible() && sin <= 0.01) {
                _this.onUpdate.remove(updateHandler);
                _this.destroy();
            }
        };
        _this.onUpdate.add(updateHandler);
        return _this;
    }
    return Rebuild;
}(g.Sprite));
exports.Rebuild = Rebuild;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}