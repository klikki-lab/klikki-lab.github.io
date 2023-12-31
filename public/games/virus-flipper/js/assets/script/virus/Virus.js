window.gLocalAssetContainer["Virus"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.Virus = void 0;
var Virus = /** @class */ (function (_super) {
    __extends(Virus, _super);
    function Virus(scene, src, reflectorY, gravityRate) {
        if (gravityRate === void 0) { gravityRate = 1; }
        var _this = _super.call(this, {
            scene: scene,
            src: src,
            width: 128,
            height: 128,
            anchorX: 0.5,
            anchorY: 0.5,
            interval: 0,
            frames: Virus.ANIM_NORMAL,
            loop: false
        }) || this;
        _this.onCollideFlipper = new g.Trigger();
        _this.onPassing = new g.Trigger();
        _this.vx = 0;
        _this.vy = 0;
        _this.gravity = 0;
        _this.frame = 0;
        _this.laughFrame = 0;
        _this.isCrush = false;
        _this.isKill = false;
        _this.isPass = false;
        _this.isCollide = false;
        _this.updateHandler = function () {
            if (!_this.isCollide && !_this.isPass &&
                (_this.y + _this.height / 2 >= _this.reflectorY && _this.y - _this.height / 2 < _this.reflectorY)) {
                _this.onCollideFlipper.fire(_this);
            }
            if (!_this.isPass && !_this.isKill && _this.y - _this.height / 2 >= _this.reflectorY) {
                _this.pass();
                _this.onPassing.fire();
            }
            if (_this.isPass && _this.laughFrame > 0) {
                _this.laughFrame--;
                _this.y += _this.height / (g.game.fps * 5);
                _this.modified();
                return;
            }
            if (_this.isKill) {
                if (_this.isCrush) {
                    if (_this.frame++ < g.game.fps * 0.02) {
                        _this.scaleY *= 0.5;
                        return;
                    }
                    else {
                        _this.frame = 0;
                        _this.isCrush = false;
                    }
                }
                else {
                    if (_this.scaleY < 1.0)
                        _this.scaleY = Math.min(1.0, _this.scaleY *= (1 + 24 / g.game.fps));
                    _this.angle += _this.vx * 2;
                    _this.opacity *= 0.98;
                }
            }
            _this.vy += _this.frame / (g.game.fps) * _this.height * 0.5 / g.game.fps * _this.gravity;
            _this.frame++;
            _this.x += _this.vx;
            _this.y += _this.vy;
            _this.modified();
            if (_this.y - _this.height / 2 >= g.game.height) {
                _this.destroy();
            }
        };
        _this.reflectorY = reflectorY;
        _this.gravity = Virus.G * gravityRate;
        _this.start();
        _this.modified();
        _this.onUpdate.add(_this.updateHandler);
        return _this;
    }
    Virus.prototype.removeUpdate = function () {
        this.stop();
        this.loop = false;
        this.onUpdate.remove(this.updateHandler);
    };
    Virus.prototype.removeUpdateHandler = function () {
        this.stop();
        this.loop = false;
        this.onUpdate.remove(this.updateHandler);
    };
    Virus.prototype.rebound = function () {
        this.isCollide = true;
        this.isCrush = true;
        this.isKill = true;
        this.frames = Virus.ANIM_KILL;
        this.opacity = 0.5;
        this.vy = -this.vy * 0.5;
        this.frame = 0;
        this.modified();
    };
    Virus.prototype.pass = function () {
        this.isPass = true;
        this.laughFrame = g.game.fps / 2;
        this.interval = 1000 / 30;
        this.frames = Virus.ANIM_LAUGH;
        this.frameNumber = 0;
        this.loop = true;
        this.vx = 0;
        this.start();
        this.modified();
    };
    Virus.ANIM_NORMAL = [0];
    Virus.ANIM_LAUGH = [1, 2];
    Virus.ANIM_KILL = [3];
    Virus.G = 0.98;
    return Virus;
}(g.FrameSprite));
exports.Virus = Virus;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}