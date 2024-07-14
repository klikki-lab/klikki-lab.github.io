window.gLocalAssetContainer["dust"] = function(g) { (function(exports, require, module, __filename, __dirname) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dust = void 0;
var Dust = /** @class */ (function () {
    function Dust(scene, parent, pos, size, cssColor) {
        var _loop_1 = function (i) {
            var rect = new g.FilledRect({
                scene: scene,
                parent: parent,
                width: size.width,
                height: size.height,
                cssColor: cssColor,
                x: pos.x,
                y: pos.y,
                anchorX: .5,
                anchorY: .5,
                opacity: 0.75,
            });
            var div = (2 * Math.PI) / Dust.MAX_SPRAY_SIZE;
            var angle = div * i;
            rect.angle = i * (360 / Dust.MAX_SPRAY_SIZE);
            rect.modified();
            var rate = (30 / g.game.fps);
            var radius = Math.max(size.width, size.height) * rate * 0.2;
            var cos = Math.cos(angle);
            var sin = Math.sin(angle);
            var vx = cos * radius;
            var vy = sin * radius;
            var value = 1;
            rect.onUpdate.add(function () {
                rect.x += vx;
                rect.y += vy;
                rect.scale(value);
                rect.modified();
                vx *= 0.7 * rate;
                vy *= 0.7 * rate;
                value *= 0.6 * rate;
                if (value < 0.01) {
                    rect.destroy();
                }
            });
        };
        for (var i = 0; i < Dust.MAX_SPRAY_SIZE; i++) {
            _loop_1(i);
        }
    }
    Dust.MAX_SPRAY_SIZE = 8;
    return Dust;
}());
exports.Dust = Dust;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}