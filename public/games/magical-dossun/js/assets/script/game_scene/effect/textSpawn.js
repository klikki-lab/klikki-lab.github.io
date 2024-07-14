window.gLocalAssetContainer["textSpawn"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.TextSpawn = void 0;
var TextSpawn = /** @class */ (function (_super) {
    __extends(TextSpawn, _super);
    function TextSpawn(scene, font, text, pos) {
        var _this = _super.call(this, {
            scene: scene,
            text: text,
            font: font,
            fontSize: font.size,
            anchorX: 0.5,
            anchorY: 0.5,
            x: pos.x,
            y: pos.y,
        }) || this;
        var fps = Math.floor(g.game.fps * .75);
        var vy = _this.height * .5;
        var y = 0;
        var frame = 0;
        _this.onUpdate.add(function (_) {
            if (frame / fps <= 0.5) {
                var sin = 1 - Math.sin(Math.PI * (frame / fps));
                y += vy * sin;
            }
            _this.x = pos.x;
            _this.y = pos.y - y;
            _this.modified();
            if (frame >= fps * 2) {
                _this.destroy();
            }
            frame++;
        });
        return _this;
    }
    return TextSpawn;
}(g.Label));
exports.TextSpawn = TextSpawn;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}