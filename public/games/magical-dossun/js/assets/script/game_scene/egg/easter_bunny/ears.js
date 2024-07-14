window.gLocalAssetContainer["ears"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.Ears = void 0;
var Ears = /** @class */ (function (_super) {
    __extends(Ears, _super);
    function Ears(scene, _interval) {
        var _this = _super.call(this, {
            scene: scene,
            src: scene.asset.getImageById("easter_bunny_ears"),
            srcWidth: 96,
            srcHeight: 64,
            width: 96,
            height: 64,
            anchorX: 0.5,
            anchorY: 0.5,
            frames: [1, 0],
            interval: _interval,
        }) || this;
        _this._interval = _interval;
        _this.startNormalAnimation = function () {
            _this.frames = [1, 0];
            _this.frameNumber = 0;
            _this.loop = true;
            _this.interval = _this._interval;
            _this.modified();
            _this.start();
        };
        _this.startPowerUpAnimation = function () {
            _this.frames = [4, 3];
            _this.frameNumber = 0;
            _this.loop = true;
            _this.interval = _this._interval;
            _this.modified();
            _this.start();
        };
        _this.jumping = function (isPowerUp) {
            _this.frames = isPowerUp ? [4] : [1];
            _this.frameNumber = 0;
            _this.loop = false;
            _this.modified();
        };
        _this.falling = function (isPowerUp) {
            _this.frames = isPowerUp ? [3, 5] : [0, 2];
            _this.frameNumber = 0;
            _this.loop = false;
            _this.interval = Math.floor(1000 / g.game.fps) * 2;
            _this.modified();
            _this.start();
        };
        _this.ground = function (isPowerUp) {
            _this.frames = isPowerUp ? [4] : [1];
            _this.frameNumber = 0;
            _this.loop = false;
            _this.modified();
        };
        return _this;
    }
    return Ears;
}(g.FrameSprite));
exports.Ears = Ears;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}