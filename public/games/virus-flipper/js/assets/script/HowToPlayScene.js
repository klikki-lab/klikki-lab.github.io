window.gLocalAssetContainer["HowToPlayScene"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.HowToPlayScene = void 0;
var Button_1 = require("./Button");
var BaseScene_1 = require("./BaseScene");
var BitmapFontLabel_1 = require("./BitmapFontLabel");
var HowToPlayScene = /** @class */ (function (_super) {
    __extends(HowToPlayScene, _super);
    function HowToPlayScene(param, lifeTimeSec) {
        if (lifeTimeSec === void 0) { lifeTimeSec = HowToPlayScene.LIFE_TIME_SEC; }
        var _this = _super.call(this, {
            game: g.game,
            name: "HowToPlayScene",
            assetIds: [
                "description", "close", "font_glyphs", "bitmap_font",
            ],
        }, lifeTimeSec) || this;
        _this.onLoad.add(function () {
            var description = new g.Sprite({
                scene: _this,
                src: _this.asset.getImageById("description")
            });
            _this.append(description);
            if (param.isAtsumaru) {
                var closeButton = new Button_1.Button(_this, "close");
                closeButton.x = g.game.width - closeButton.width * 0.6;
                closeButton.y = +closeButton.height * 0.6;
                closeButton.onClick.add(function (_tag) {
                    _this.onFinish.fire();
                });
                _this.append(closeButton);
            }
            else {
                var countdown_1 = new BitmapFontLabel_1.BitmapFontLabel(_this, lifeTimeSec.toString());
                countdown_1.x = g.game.width - countdown_1.fontSize * 1.5;
                countdown_1.y = countdown_1.height / 4;
                _this.append(countdown_1);
                var remainTime_1 = lifeTimeSec;
                var updateHandler_1 = function () {
                    if (remainTime_1 <= 0) {
                        console.log(remainTime_1);
                        _this.onUpdate.remove(updateHandler_1);
                        _this.onFinish.fire();
                    }
                    remainTime_1 -= 1 / g.game.fps;
                    countdown_1.text = "".concat(Math.ceil(remainTime_1));
                    countdown_1.invalidate();
                };
                _this.onUpdate.add(updateHandler_1);
            }
        });
        return _this;
    }
    HowToPlayScene.LIFE_TIME_SEC = 7;
    return HowToPlayScene;
}(BaseScene_1.BaseScene));
exports.HowToPlayScene = HowToPlayScene;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}