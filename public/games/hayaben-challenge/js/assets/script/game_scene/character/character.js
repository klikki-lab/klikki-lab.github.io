window.gLocalAssetContainer["character"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.Character = void 0;
var Character = /** @class */ (function (_super) {
    __extends(Character, _super);
    function Character(scene, src) {
        return _super.call(this, {
            scene: scene,
            src: src,
            srcWidth: Character.WIDTH,
            srcHeight: Character.HEIGHT,
            width: Character.WIDTH,
            height: Character.HEIGHT,
            anchorX: .5,
            anchorY: .5,
        }) || this;
    }
    Character.WIDTH = 130;
    Character.HEIGHT = 128;
    return Character;
}(g.FrameSprite));
exports.Character = Character;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}