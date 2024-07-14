window.gLocalAssetContainer["player"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.Player = void 0;
var surprise_1 = require("../effect/surprise");
var character_1 = require("./character");
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player(scene) {
        var _this = _super.call(this, scene, scene.asset.getImageById("img_player")) || this;
        _this._isEating = false;
        _this._isScolded = false;
        _this.startEating = function () {
            _this._isEating = true;
            _this.frames = [1, 2];
            _this.frameNumber = 0;
            _this.loop = true;
            _this.modified();
            _this.start();
        };
        _this.stopEating = function () {
            _this._isEating = false;
            _this.frames = [0];
            _this.frameNumber = 0;
            _this.modified();
            _this.start();
        };
        _this.scolded = function () {
            _this._isScolded = true;
            _this._isEating = false;
            _this.frames = [1];
            _this.frameNumber = 0;
            _this.loop = false;
            _this.modified();
            _this.start();
            new surprise_1.Surprise(_this.scene, _this);
        };
        _this.forgiven = function () {
            _this._isScolded = false;
            _this.stopEating();
        };
        _this.interval = Math.floor((1000 / 30) * 2);
        _this.onFinish.add(function () {
            _this.frames = [3, 4];
            _this.frameNumber = 0;
            _this.loop = true;
            _this.modified();
            _this.start();
        });
        return _this;
    }
    Object.defineProperty(Player.prototype, "isEating", {
        get: function () { return this._isEating && !this._isScolded; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "isScolded", {
        get: function () { return this._isScolded; },
        enumerable: false,
        configurable: true
    });
    return Player;
}(character_1.Character));
exports.Player = Player;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}