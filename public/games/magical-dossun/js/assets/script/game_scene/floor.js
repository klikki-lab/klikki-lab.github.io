window.gLocalAssetContainer["floor"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.Floor = void 0;
var Floor = /** @class */ (function (_super) {
    __extends(Floor, _super);
    function Floor(scene, parent) {
        var _this = _super.call(this, {
            scene: scene,
            parent: parent,
            width: g.game.width + 64,
            height: g.game.height + 64,
            cssColor: "#bbd",
            x: -32,
            y: -32
        }) || this;
        var num = 8;
        var size = Math.max(g.game.width, g.game.height) / Math.sqrt(2) / num;
        var l = size * Math.sqrt(2);
        for (var y = 0; y < Math.round(g.game.height / size); y++) {
            for (var x = 0; x < Math.round(g.game.width / size); x++) {
                new g.FilledRect({
                    scene: scene,
                    parent: _this,
                    width: size,
                    height: size,
                    x: x * l,
                    y: y * l,
                    cssColor: "#aac",
                    anchorX: .5,
                    anchorY: .5,
                    angle: 45,
                });
            }
        }
        return _this;
    }
    return Floor;
}(g.FilledRect));
exports.Floor = Floor;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}