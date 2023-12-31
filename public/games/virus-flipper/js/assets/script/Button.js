window.gLocalAssetContainer["Button"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.Button = void 0;
var Button = /** @class */ (function (_super) {
    __extends(Button, _super);
    function Button(scene, assetKey, tag) {
        if (tag === void 0) { tag = undefined; }
        var _this = _super.call(this, {
            scene: scene,
            src: scene.asset.getImageById(assetKey),
            anchorX: 0.5,
            anchorY: 0.5,
            tag: tag || assetKey,
            touchable: true,
        }) || this;
        _this.onClick = new g.Trigger();
        _this.isClicked = false;
        _this.onPointDown.add(function (_e) {
            _this.isClicked = true;
            setScale(Button.SCALE_UP_RATE);
        });
        _this.onPointMove.add(function (e) {
            var ex = e.point.x + e.startDelta.x;
            var ey = e.point.y + e.startDelta.y;
            _this.isClicked = _this.isClicked && 0 <= ex && _this.width >= ex && 0 <= ey && _this.height >= ey;
            setScale(_this.isClicked ? Button.SCALE_UP_RATE : 1.0);
        });
        _this.onPointUp.add(function (_e) {
            setScale(1.0);
            if (_this.isClicked) {
                scene.asset.getAudioById("se_bound").play();
                _this.onClick.fire(_this.tag);
                _this.isClicked = false;
            }
        });
        _this.onUpdate.add(function (_) {
            if (!_this.isClicked)
                setScale(1 - Math.sin(g.game.age % (g.game.fps * 10) / 16) * 0.02);
        });
        var setScale = function (scale) {
            _this.scale(scale);
            _this.modified();
        };
        return _this;
    }
    Button.SCALE_UP_RATE = 1.1;
    return Button;
}(g.Sprite));
exports.Button = Button;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}