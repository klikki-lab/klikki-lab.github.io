window.gLocalAssetContainer["MissileBase"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.MissileBase = void 0;
var MissileBase = /** @class */ (function (_super) {
    __extends(MissileBase, _super);
    function MissileBase(scene, x, y, _launchable) {
        var _this = this;
        var asset = scene.asset.getImageById("missile_base");
        _this = _super.call(this, {
            scene: scene,
            anchorX: 0.5,
            anchorY: 0.5,
            x: x,
            y: y,
            width: asset.width,
            height: asset.height,
        }) || this;
        _this._launchable = _launchable;
        _this.onRebuild = new g.Trigger();
        _this.onDestroyed = new g.Trigger();
        _this._isActive = true;
        _this.modifiedGunAngle = function (radian) {
            var degree = radian * 180 / Math.PI;
            _this.gunTurret.angle = 180 - degree;
            _this.gunTurret.x = _this.width * 0.5 + _this.width * 0.6 * Math.sin(radian);
            _this.gunTurret.y = _this.height * 0.5 + _this.height * 0.6 * Math.cos(radian);
            _this.gunTurret.modified();
        };
        /**
         * ミサイルを発射する。
         * @param point 標的座標
         * @param isUnlimited 弾数無制限フラグ
         * @returns ミサイルが発射されたら true、そうでなければ false
         */
        _this.fire = function (point, isUnlimited) {
            var radian = Math.atan2(point.x - _this.x, point.y - _this.y);
            _this.modifiedGunAngle(radian);
            if (!_this._launchable.fire(isUnlimited))
                return false;
            _this.scaleX = 1.3;
            _this.scaleY = 0.7;
            var updateHandler = function () {
                _this.scaleX -= 0.1;
                _this.scaleY += 0.1;
                if (_this.scaleX <= 1 || _this.scaleY >= 1) {
                    _this.scale(1.0);
                    _this.onUpdate.remove(updateHandler);
                }
                _this.modified();
            };
            _this.onUpdate.add(updateHandler);
            var rate = 0.8;
            var sin = Math.sin(radian);
            var cos = Math.cos(radian);
            var rx = 0.6 * rate;
            var ry = 0.6 * rate;
            var gunUpdateHandler = function () {
                if (rx < 0.35) {
                    _this.modifiedGunAngle(radian);
                    _this.gunTurret.onUpdate.remove(gunUpdateHandler);
                    return;
                }
                _this.gunTurret.x = _this.width * 0.5 + _this.width * rx * sin;
                _this.gunTurret.y = _this.height * 0.5 + _this.height * ry * cos;
                _this.gunTurret.modified();
                rx *= rate;
                ry *= rate;
            };
            _this.gunTurret.onUpdate.add(gunUpdateHandler);
            return true;
        };
        _this.rebuild = function () {
            _this._isActive = true;
            _this._launchable.enable();
            _this.onRebuild.fire(_this);
        };
        _this.getRemainingCount = function () { return _this._launchable.getRemainingCount(); };
        _this.reload = function (addCount) { return _this._launchable.reload(addCount); };
        _this.isFull = function () { return _this._launchable.isFull(); };
        _this.isEmptyMissile = function () { return _this._launchable.isEmpty(); };
        _this.isActive = function () { return _this._isActive; };
        _this.deactivate = function () { _this._isActive = false; };
        _this.disableLauncher = function () { return _this._launchable.disable(); };
        _this.getRadius = function () { return _this.width * 0.5; };
        var base = new g.Sprite({
            scene: scene,
            src: asset,
            anchorX: 0.5,
            anchorY: 0.5,
            x: _this.width * 0.5,
            y: _this.height * 0.5,
        });
        _this.gunTurret = new g.Sprite({
            scene: scene,
            src: scene.asset.getImageById("gun_turret"),
            anchorX: 0.5,
            anchorY: 0.5,
        });
        _this.append(_this.gunTurret);
        _this.append(base);
        var initAngle = 180;
        _this.modifiedGunAngle(initAngle * (Math.PI / 180));
        return _this;
    }
    return MissileBase;
}(g.E));
exports.MissileBase = MissileBase;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}