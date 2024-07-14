window.gLocalAssetContainer["sight"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.Sight = void 0;
var Sight = /** @class */ (function (_super) {
    __extends(Sight, _super);
    function Sight(scene, parent) {
        var _this = _super.call(this, {
            scene: scene,
            parent: parent,
            src: scene.asset.getImageById("img_sight"),
            anchorX: .5,
            anchorY: .5,
            opacity: .25,
            hidden: true,
        }) || this;
        _this.target = function (pos) {
            _this.show();
            _this.x = pos.x;
            _this.y = pos.y;
            _this.modified();
        };
        _this.stop = function () { _this.hide(); };
        return _this;
    }
    return Sight;
}(g.Sprite));
exports.Sight = Sight;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}