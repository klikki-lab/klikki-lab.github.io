window.gLocalAssetContainer["BaseScene"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.BaseScene = void 0;
var BaseScene = /** @class */ (function (_super) {
    __extends(BaseScene, _super);
    function BaseScene(params, lifeTimeSec) {
        if (lifeTimeSec === void 0) { lifeTimeSec = -1; }
        var _this = _super.call(this, params) || this;
        _this.onFinish = new g.Trigger();
        _this.lifeTimeSec = lifeTimeSec;
        return _this;
    }
    return BaseScene;
}(g.Scene));
exports.BaseScene = BaseScene;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}