window.gLocalAssetContainer["entity"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.Entity = void 0;
var Entity = /** @class */ (function (_super) {
    __extends(Entity, _super);
    function Entity(scene) {
        return _super.call(this, {
            scene: scene,
            width: Entity.OBJECT_SIZE,
            height: Entity.OBJECT_SIZE,
            cssColor: "white",
            opacity: 0,
            anchorX: 0.5,
            anchorY: 0.5,
            x: g.game.width / 2,
            y: g.game.height / 2,
        }) || this;
    }
    Entity.OBJECT_SIZE = 8 * 4;
    return Entity;
}(g.FilledRect));
exports.Entity = Entity;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}