window.gLocalAssetContainer["chartSequencer"] = function(g) { (function(exports, require, module, __filename, __dirname) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChartSequencer = void 0;
var chart_1 = require("./chart");
var ChartSequencer = /** @class */ (function () {
    function ChartSequencer(_charts, _bpm, timeBase) {
        var _this = this;
        this._charts = _charts;
        this._bpm = _bpm;
        this.onStart = new g.Trigger();
        this.onNote = new g.Trigger();
        this.onTiming = new g.Trigger();
        this.onFinish = new g.Trigger();
        this._ticks = 0;
        this._beatPeriod = 0;
        this.measure = 0;
        this.note = 0;
        this._isFinished = false;
        this.tick = function () {
            if (_this.isFinished) {
                _this._ticks++;
                return;
            }
            if (_this._ticks % _this._beatPeriod === 0) {
                var note = _this._charts[_this.measure][_this.note];
                switch (note) {
                    case chart_1.Chart.State.START:
                        _this.onStart.fire();
                        break;
                    case chart_1.Chart.State.NOTE:
                        _this.onNote.fire();
                        break;
                    case chart_1.Chart.State.REST:
                        break;
                    case chart_1.Chart.State.TIMING:
                        _this.onTiming.fire();
                        break;
                    case chart_1.Chart.State.LOOP:
                        _this.measure = 0;
                        _this.note = 0;
                        _this._ticks++;
                        return;
                    case chart_1.Chart.State.EOC:
                        _this.finish();
                        return;
                }
                _this.note++;
                if (_this._charts[_this.measure].length <= _this.note) {
                    _this.measure++;
                    _this.note = 0;
                    if (_this._charts.length <= _this.measure) {
                        _this.finish();
                    }
                }
            }
            _this._ticks++;
        };
        this.finish = function () {
            _this.measure = 0;
            _this.note = 0;
            _this._isFinished = true;
            _this.onFinish.fire();
        };
        this.isStarted = function () { return _this._ticks > 0; };
        this._beatPeriod = Math.floor(g.game.fps / timeBase);
    }
    Object.defineProperty(ChartSequencer.prototype, "bpm", {
        get: function () { return this._bpm; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ChartSequencer.prototype, "ticks", {
        get: function () { return this._ticks; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ChartSequencer.prototype, "isFinished", {
        get: function () { return this._isFinished; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ChartSequencer.prototype, "charts", {
        get: function () { return this._charts; },
        enumerable: false,
        configurable: true
    });
    ChartSequencer.MAX_BEATS = 8;
    return ChartSequencer;
}());
exports.ChartSequencer = ChartSequencer;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}