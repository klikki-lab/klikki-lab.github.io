window.gLocalAssetContainer["customLoadingScene"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.CustomLoadingScene = void 0;
var floor_1 = require("../game_scene/floor");
var CustomLoadingScene = /** @class */ (function (_super) {
    __extends(CustomLoadingScene, _super);
    function CustomLoadingScene() {
        var _this = _super.call(this, { game: g.game, }) || this;
        _this.append(new floor_1.Floor(_this));
        return _this;
    }
    return CustomLoadingScene;
}(g.LoadingScene));
exports.CustomLoadingScene = CustomLoadingScene;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}