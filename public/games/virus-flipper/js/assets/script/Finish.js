window.gLocalAssetContainer["Finish"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.Finish = void 0;
var Finish = /** @class */ (function (_super) {
    __extends(Finish, _super);
    function Finish(scene) {
        var _this = _super.call(this, {
            scene: scene,
            src: scene.asset.getImageById("finish")
        }) || this;
        _this.onFinish = new g.Trigger();
        _this.x = (g.game.width - _this.width) / 2;
        _this.y = -_this.height;
        var vy = g.game.height / g.game.fps;
        var updateHandler = function () {
            _this.y += vy;
            vy *= 1.2;
            if (_this.y >= (g.game.height - _this.height) / 3) {
                _this.y = (g.game.height - _this.height) / 3;
                _this.onUpdate.remove(updateHandler);
                _this.onFinish.fire();
            }
            _this.modified();
        };
        _this.onUpdate.add(updateHandler);
        return _this;
    }
    return Finish;
}(g.Sprite));
exports.Finish = Finish;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}