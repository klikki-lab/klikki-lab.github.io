window.gLocalAssetContainer["Start"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.Start = void 0;
var Start = /** @class */ (function (_super) {
    __extends(Start, _super);
    function Start(scene) {
        var _this = _super.call(this, {
            scene: scene,
            src: scene.asset.getImageById("start")
        }) || this;
        _this.onFinish = new g.Trigger();
        _this.frame = 0;
        _this.x = (g.game.width - _this.width) / 2;
        _this.y = -_this.height;
        var vy = g.game.height / g.game.fps;
        var updateHandler = function () {
            _this.y += vy;
            vy *= 1.2;
            _this.frame++;
            if (_this.frame <= g.game.fps * 0.95) {
                if (_this.y >= (g.game.height - _this.height) / 3) {
                    _this.y = (g.game.height - _this.height) / 3;
                    vy = g.game.height / g.game.fps;
                }
            }
            _this.modified();
            if (g.game.height < _this.y) {
                _this.onUpdate.remove(updateHandler);
                _this.onFinish.fire();
            }
        };
        _this.onUpdate.add(updateHandler);
        return _this;
    }
    return Start;
}(g.Sprite));
exports.Start = Start;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}