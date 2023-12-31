window.gLocalAssetContainer["invader"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.Invader = void 0;
;
var Invader = /** @class */ (function (_super) {
    __extends(Invader, _super);
    function Invader() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onDestroy = new g.Trigger();
        _this.getRadius = function () { return _this.width * 0.5; };
        return _this;
    }
    return Invader;
}(g.Sprite));
exports.Invader = Invader;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}