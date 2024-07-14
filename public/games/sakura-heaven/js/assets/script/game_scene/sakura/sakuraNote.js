window.gLocalAssetContainer["sakuraNote"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.SakuraNote = void 0;
var ratingScore_1 = require("../effect/ratingScore");
var SakuraNote = /** @class */ (function (_super) {
    __extends(SakuraNote, _super);
    function SakuraNote(scene, pos, _bpm) {
        var _this = _super.call(this, {
            scene: scene,
            src: scene.asset.getImageById("img_sakura_border"),
            anchorX: .5,
            anchorY: .5,
            x: pos.x,
            y: pos.y,
            scaleX: 1.2,
            scaleY: 1.2,
        }) || this;
        _this._bpm = _bpm;
        _this.onFailed = new g.Trigger();
        _this.onClicked = new g.Trigger();
        _this._isJudged = false;
        _this.updateHandler = function () {
            if (!_this._isJudged && _this._ticks-- < ratingScore_1.Rating.FAILED.timingWindow.min) {
                _this.onFailed.fire(_this);
                _this.onUpdate.remove(_this.updateHandler);
                _this.onUpdate.add(_this.destroyHandler);
            }
            if (_this.scaleX > 1) {
                _this.scale(_this.scaleX * 0.98);
                if (_this.scaleX <= 1) {
                    _this.scale(1);
                }
                _this.modified();
            }
        };
        _this.destroyHandler = function () {
            _this.opacity *= .95;
            _this.modified();
            if (_this.opacity < 0.01) {
                _this.destroy();
            }
        };
        _this.judge = function () {
            if (_this._isJudged || !_this.isActive())
                return false;
            _this._isJudged = true;
            _this.onClicked.fire(_this);
            _this.onUpdate.remove(_this.updateHandler);
            _this.onUpdate.add(_this.destroyHandler);
            return true;
        };
        _this.isActive = function () { return _this._ticks >= ratingScore_1.Rating.BAD.timingWindow.min && _this._ticks <= _this._bpm / 4; };
        _this._ticks = _bpm;
        _this.onUpdate.add(_this.updateHandler);
        return _this;
    }
    Object.defineProperty(SakuraNote.prototype, "ticks", {
        get: function () { return this._ticks; },
        enumerable: false,
        configurable: true
    });
    return SakuraNote;
}(g.Sprite));
exports.SakuraNote = SakuraNote;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}