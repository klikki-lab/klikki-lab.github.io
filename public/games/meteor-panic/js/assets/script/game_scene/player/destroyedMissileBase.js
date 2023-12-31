window.gLocalAssetContainer["destroyedMissileBase"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.DestroyedMissileBase = void 0;
var DestroyedMissileBase = /** @class */ (function (_super) {
    __extends(DestroyedMissileBase, _super);
    function DestroyedMissileBase(scene, x, y, _background) {
        var _this = _super.call(this, {
            scene: scene,
            src: scene.asset.getImageById("destroyed_missile_base"),
            anchorX: 0.5,
            anchorY: 0.5,
            x: x,
            y: y,
            hidden: true,
        }) || this;
        _this._background = _background;
        _this.onSmoke = new g.Trigger();
        _this.time = 0;
        _this.updateHandler = function () {
            _this.time += 1 / g.game.fps;
            if (_this.time >= 0.5) {
                _this.onSmoke.fire(_this);
                _this.time = 0;
            }
        };
        _this.show = function () {
            _this.time = 0;
            _super.prototype.show.call(_this);
            _this._background.show();
            if (!_this.onUpdate.contains(_this.updateHandler))
                _this.onUpdate.add(_this.updateHandler);
        };
        _this.hide = function () {
            _super.prototype.hide.call(_this);
            _this._background.hide();
            if (_this.onUpdate.contains(_this.updateHandler))
                _this.onUpdate.remove(_this.updateHandler);
        };
        return _this;
    }
    return DestroyedMissileBase;
}(g.Sprite));
exports.DestroyedMissileBase = DestroyedMissileBase;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}