window.gLocalAssetContainer["UFO"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.UFO = void 0;
var invader_1 = require("./invader");
var UFO = /** @class */ (function (_super) {
    __extends(UFO, _super);
    function UFO(scene, random, waveTimes) {
        var _this = this;
        var asset = scene.asset.getImageById("ufo");
        _this = _super.call(this, {
            scene: scene,
            src: asset,
            x: -asset.width / 2,
            y: g.game.height / 3 * random.generate() + asset.height * 1.5,
            anchorX: 0.5,
            anchorY: 0.5,
            angle: 0,
        }) || this;
        _this.onFire = new g.Trigger();
        _this.onGone = new g.Trigger();
        _this._isRun = false;
        _this._destroy = function (combo) {
            _this.onDestroy.fire({ invader: _this, combo: combo });
        };
        _this.deactivate = function () { return _this._isRun = true; };
        var direction = random.generate() < 0.5 ? UFO.DIRECTION_LEFT : UFO.DIRECTION_RIGHT;
        _this.x = direction === UFO.DIRECTION_LEFT ? g.game.width + _this.getRadius() : -_this.getRadius();
        var frame = 0;
        var prevX = _this.x;
        var prevY = _this.y;
        var fireRate = waveTimes / 150;
        var vx = g.game.width * (1 / g.game.fps / 6) * direction;
        var cy = (g.game.height / 4) * random.generate() + _this.height * 2;
        var updateHanler = function () {
            _this.x += vx * (_this._isRun ? 3 : 1);
            _this.y = cy + Math.sin(frame++ % (g.game.fps * 10) / 8) * _this.height * 1.5;
            var radian = direction === UFO.DIRECTION_LEFT ?
                Math.atan2(prevY - _this.y, prevX - _this.x) : Math.atan2(_this.y - prevY, _this.x - prevX);
            _this.angle = 360 - radian * (180 / Math.PI) / 5;
            _this.modified();
            prevX = _this.x;
            prevY = _this.y;
            if (!_this._isRun && random.generate() <= fireRate) {
                _this.onFire.fire(_this);
            }
            if (_this.x - _this.getRadius() >= g.game.width || _this.x < -_this.getRadius()) {
                _this.onGone.fire();
                _this.onUpdate.remove(updateHanler);
                _this.destroy();
            }
        };
        _this.onUpdate.add(updateHanler);
        return _this;
    }
    UFO.DIRECTION_LEFT = -1;
    UFO.DIRECTION_RIGHT = 1;
    return UFO;
}(invader_1.Invader));
exports.UFO = UFO;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}