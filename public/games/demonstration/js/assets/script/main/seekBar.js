window.gLocalAssetContainer["seekBar"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.SeekBar = void 0;
var SeekBar = /** @class */ (function (_super) {
    __extends(SeekBar, _super);
    function SeekBar(scene, width, height) {
        var _this = _super.call(this, {
            scene: scene,
            width: Math.max(width, SeekBar.BACKGROUND_HEIGHT * 4),
            height: Math.max(height, SeekBar.BACKGROUND_HEIGHT * 2),
            touchable: true,
        }) || this;
        /**
         * 値の変更イベント。シークバーが操作された時の値を渡す。
         * 最大値と最小値がデフォルト値のままであれば 0.0 - 1.0、設定していればそれらを考慮した実数を受け取る。
         */
        _this.onChanged = new g.Trigger();
        /**
         * シークバーのトラッキング操作終了イベント。
         */
        _this.onTrackingEnd = new g.Trigger();
        _this._min = 0;
        _this._max = 1;
        _this._value = 0;
        _this.firstTouchPlayerId = undefined;
        /**
         * @param ex タッチした X 座標
         * @returns 値に変更があれば true、そうでなければ false
         */
        _this.trackProgress = function (ex) {
            var knob = _this.knob.children[0];
            if (knob instanceof g.FilledRect && !_this.isPressed(knob)) {
                knob.cssColor = SeekBar.COLOR_PRESSED;
                knob.modified();
            }
            var x = Math.max(0, Math.min(_this.width - _this.knob.width, ex - _this.knob.width / 2));
            var value = _this.denormarize(x / (_this.width - _this.knob.width));
            if (_this.value !== value) {
                _this.value = value;
                return true;
            }
            return false;
        };
        /**
         * @param value 値
         * @returns min と max を考慮した値
         */
        _this.denormarize = function (value) { return value * (_this._max - _this._min) + _this._min; };
        _this.isPressed = function (knobEntity) { return knobEntity.cssColor === SeekBar.COLOR_PRESSED; };
        var createBackgroundBar = function () {
            var backgroundBar = new g.FilledRect({
                scene: scene,
                width: _this.width - _this.height,
                height: SeekBar.BACKGROUND_HEIGHT,
                cssColor: SeekBar.COLOR_NORMAL,
                x: _this.height / 2,
                y: (_this.height - SeekBar.BACKGROUND_HEIGHT) / 2,
            });
            new g.FilledRect({
                scene: scene,
                width: backgroundBar.width - SeekBar.STROKE_WIDTH * 2,
                height: backgroundBar.height - SeekBar.STROKE_WIDTH * 2,
                cssColor: SeekBar.COLOR_BORDER,
                x: SeekBar.STROKE_WIDTH,
                y: SeekBar.STROKE_WIDTH,
                parent: backgroundBar,
            });
            return backgroundBar;
        };
        _this.append(createBackgroundBar());
        var createKnob = function () {
            var knob = new g.FilledRect({
                scene: scene,
                width: _this.height,
                height: _this.height,
                cssColor: SeekBar.COLOR_BORDER,
            });
            new g.FilledRect({
                scene: scene,
                width: knob.width - SeekBar.STROKE_WIDTH * 2,
                height: knob.height - SeekBar.STROKE_WIDTH * 2,
                cssColor: SeekBar.COLOR_NORMAL,
                x: SeekBar.STROKE_WIDTH,
                y: SeekBar.STROKE_WIDTH,
                parent: knob,
            });
            return knob;
        };
        _this.append(_this.knob = createKnob());
        _this.onPointDown.add(function (ev) {
            if (_this.firstTouchPlayerId)
                return;
            _this.firstTouchPlayerId = ev.player.id;
            var ex = ev.point.x;
            if (_this.trackProgress(ex)) {
                _this.onChanged.fire(_this.value);
            }
        });
        _this.onPointMove.add(function (ev) {
            if (_this.firstTouchPlayerId !== ev.player.id)
                return;
            var ex = ev.startDelta.x + ev.point.x;
            if (_this.trackProgress(ex)) {
                _this.onChanged.fire(_this.value);
            }
        });
        _this.onPointUp.add(function (ev) {
            if (_this.firstTouchPlayerId !== ev.player.id)
                return;
            _this.firstTouchPlayerId = undefined;
            var knob = _this.knob.children[0];
            if (knob instanceof g.FilledRect) {
                knob.cssColor = SeekBar.COLOR_NORMAL;
                knob.modified();
            }
            _this.onTrackingEnd.fire(_this.value);
        });
        return _this;
    }
    Object.defineProperty(SeekBar.prototype, "min", {
        get: function () { return this._min; },
        /**
         * 最小値をセットする。デフォルトは 0。最大値より大きい値を指定すると `RangeError` を投げる。
         * @param min 最小値
         */
        set: function (min) {
            if (min > this._max) {
                throw new RangeError("min=".concat(min, " \u304C max=").concat(this._max, " \u3088\u308A\u5927\u304D\u3044"));
            }
            this._min = min;
            if (min > this._value) {
                this.value = min;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SeekBar.prototype, "max", {
        get: function () { return this._max; },
        /**
         * 最大値をセットする。デフォルトは 1。最小値より小さい値を指定すると `RangeError` を投げる。
         * @param max 最大値
         */
        set: function (max) {
            if (max < this._min) {
                throw new RangeError("max=".concat(max, " \u304C min=").concat(this._min, " \u3088\u308A\u5C0F\u3055\u3044"));
            }
            this._max = max;
            if (max < this._value) {
                this.value = max;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SeekBar.prototype, "value", {
        get: function () { return this.denormarize(this._value); },
        set: function (value) {
            var relativeValue;
            if (value < this._min) {
                relativeValue = this._min;
            }
            else if (value > this._max) {
                relativeValue = this._max;
            }
            else {
                relativeValue = value;
            }
            this._value = (relativeValue - this._min) / (this._max - this._min);
            var x = (this.width - this.knob.width) * this._value;
            this.knob.x = x;
            this.knob.modified();
        },
        enumerable: false,
        configurable: true
    });
    SeekBar.COLOR_NORMAL = "white";
    SeekBar.COLOR_PRESSED = "orange";
    SeekBar.COLOR_BORDER = "black";
    SeekBar.BACKGROUND_HEIGHT = 8;
    SeekBar.STROKE_WIDTH = 2;
    return SeekBar;
}(g.E));
exports.SeekBar = SeekBar;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}