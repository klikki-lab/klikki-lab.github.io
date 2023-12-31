window.gLocalAssetContainer["Player"] = function(g) { (function(exports, require, module, __filename, __dirname) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
var collider_1 = require("../common/collider");
var missileLauncher_1 = require("./missileLauncher");
var Player = /** @class */ (function () {
    function Player(_missileBases) {
        var _this = this;
        this._missileBases = _missileBases;
        this.onNextWaveRebuild = new g.Trigger();
        this.onReload = new g.Trigger();
        this.onFinishReload = new g.Trigger();
        this.onExplodeBase = new g.Trigger();
        this._power = 1;
        this._speed = 20;
        this.isReloading = false;
        this.fire = function (point, isUnlimited) {
            var touched = _this.findTouchedBases(point);
            if (!touched && touched.length !== 1)
                return undefined;
            var base = _this.findClosestAvailableBase(point.x, touched[0]);
            if (!base)
                return undefined;
            base.fire(point, isUnlimited);
            return base;
        };
        this.findTouchedBases = function (point) {
            return _this.getAvailableBases().filter(function (base) {
                var x = base.x - point.x;
                var y = base.y - point.y;
                var r = base.getRadius();
                if (x * x + y * y <= r * r)
                    return base;
            });
        };
        this.upgrade = function () {
            _this._power = Math.min(_this._power + (Player.UPGRADE_RATE * 0.1), Player.MAX_POWER);
            _this._speed = Math.min(_this._speed + Player.UPGRADE_RATE, Player.MAX_VELOCITY);
        };
        this.rebuild = function () {
            var isRebuild = false;
            _this._missileBases.forEach(function (base) {
                if (!base.isActive()) {
                    base.rebuild();
                    isRebuild = true;
                }
            });
            return isRebuild;
        };
        this.isCollide = function (invader) {
            var bases = _this.getActiveBases().filter(function (base) { return collider_1.Collider.within(base, invader, 0.5, 0.25); });
            var isCollide = (bases === null || bases === void 0 ? void 0 : bases.length) === 1;
            if (isCollide) {
                bases[0].deactivate();
                _this.onExplodeBase.fire(bases[0]);
            }
            return isCollide;
        };
        this.getActiveBasesCount = function () { return _this.getActiveBases().length; };
        /**
         * @returns 行動可能な全ての基地を取得する。
         */
        this.getActiveBases = function () { return _this._missileBases.filter(function (base) { return base.isActive(); }); };
        /**
         * @returns ミサイル発射可能な全ての基地を取得する。
         */
        this.getAvailableBases = function () { return _this._missileBases.filter(function (base) { return base.isActive() && !base.isEmptyMissile(); }); };
        /**
         *
         * @param duration
         * @param reloadCount
         */
        this.reload = function (duration, reloadCount) {
            if (reloadCount === void 0) { reloadCount = missileLauncher_1.MissileLauncher.MAX_COUNT; }
            _this.isReloading = true;
            var delay = 0;
            _this.getActiveBases().forEach(function (base) {
                var count = Math.min(missileLauncher_1.MissileLauncher.MAX_COUNT - base.getRemainingCount(), reloadCount);
                for (var i = 0; i < count; i++) {
                    _this.onReload.fire({ base: base, duration: duration * delay++ });
                }
            });
            _this.onFinishReload.fire(duration * delay);
            _this.isReloading = false;
        };
        this.reloadAll = function () {
            if (_this.isReloading)
                return;
            _this.getActiveBases().forEach(function (base) { return base.reload(missileLauncher_1.MissileLauncher.MAX_COUNT); });
        };
        this.getAvailableRemainingMissilesCount = function () {
            var initialValue = 0;
            return _this.getAvailableBases()
                .map(function (base) { return base.getRemainingCount(); })
                .reduce(function (prev, current) { return prev + current; }, initialValue);
        };
        this.findClosestAvailableBase = function (targetX, excludeTarget) {
            var bases = _this.getAvailableBases().filter(function (base) { return base !== excludeTarget; });
            var baseIndex = -1;
            var minX = g.game.width;
            bases.forEach(function (base, index) {
                if (Math.abs(base.x - targetX) < minX) {
                    minX = Math.abs(base.x - targetX);
                    baseIndex = index;
                }
            });
            return baseIndex === -1 ? undefined : bases[baseIndex];
        };
        /**
         * すべての基地からランダムにひとつを選び出す。
         * @param excludeTarget 除外する基地
         * @returns 選び出した基地
         */
        this.pickBaseRandomly = function (random, excludeTarget) {
            if (excludeTarget) {
                var excluded = _this._missileBases.filter(function (base) { return base !== excludeTarget; });
                return excluded[Math.floor(random.generate() * excluded.length)];
            }
            return _this._missileBases[Math.floor(random.generate() * _this._missileBases.length)];
        };
        this.isDestroyedAll = function () { return _this.getActiveBases().length === 0; };
        this.getMissileBaseHeight = function () { return _this._missileBases[0].height; };
    }
    Object.defineProperty(Player.prototype, "power", {
        get: function () {
            return this._power;
        },
        enumerable: false,
        configurable: true
    });
    ;
    Object.defineProperty(Player.prototype, "speed", {
        get: function () {
            return this._speed;
        },
        enumerable: false,
        configurable: true
    });
    ;
    Player.BASE_NUMBER = 3;
    Player.UPGRADE_RATE = 2;
    Player.MAX_POWER = 2;
    Player.MAX_VELOCITY = 30;
    return Player;
}());
exports.Player = Player;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}