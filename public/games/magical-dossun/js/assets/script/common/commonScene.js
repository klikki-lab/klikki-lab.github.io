window.gLocalAssetContainer["commonScene"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.CommonScene = void 0;
var CommonScene = /** @class */ (function (_super) {
    __extends(CommonScene, _super);
    function CommonScene(param, _timeLimit) {
        var _this = _super.call(this, param) || this;
        _this._timeLimit = _timeLimit;
        return _this;
    }
    Object.defineProperty(CommonScene.prototype, "timeLimit", {
        get: function () { return this._timeLimit; },
        enumerable: false,
        configurable: true
    });
    return CommonScene;
}(g.Scene));
exports.CommonScene = CommonScene;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}