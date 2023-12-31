window.gLocalAssetContainer["titleScene"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.TitleScene = void 0;
var star_1 = require("../common/star");
var fontSize_1 = require("../common/fontSize");
var switchButton_1 = require("./switchButton");
var button_1 = require("../common/button");
;
var TitleScene = /** @class */ (function (_super) {
    __extends(TitleScene, _super);
    function TitleScene(timeLimit) {
        var _this = _super.call(this, {
            game: g.game,
            assetIds: [
                "title", "description",
                "font16_1", "glyph_area_16",
            ],
        }) || this;
        _this.onFinish = new g.Trigger();
        var createBitmapFont16_1 = function () {
            var fontAsset = _this.asset.getImageById("font16_1");
            var fontGlyphAsset = _this.asset.getTextById("glyph_area_16");
            var glyphInfo = JSON.parse(fontGlyphAsset.data);
            return new g.BitmapFont({
                src: fontAsset,
                glyphInfo: glyphInfo,
            });
        };
        var createLabel = function (bitmapFont, text, fontSize) {
            if (fontSize === void 0) { fontSize = fontSize_1.FontSize.TINY; }
            return new g.Label({
                scene: _this,
                font: bitmapFont,
                text: text,
                fontSize: fontSize,
                anchorX: 0.5,
                anchorY: 0.5,
            });
        };
        var createSwitchButton = function (bitmapFont, switchLabel) {
            return new switchButton_1.SwitchButton(_this, bitmapFont, switchLabel);
        };
        var stars = new g.E({ scene: _this });
        _this.onLoad.add(function () {
            var bitmapFont = createBitmapFont16_1();
            var bg = new g.FilledRect({
                scene: _this,
                width: g.game.width,
                height: g.game.height,
                cssColor: "black",
            });
            _this.append(bg);
            _this.append(stars);
            for (var i = 0; i < 32; i++)
                stars.append(new star_1.Star(_this));
            var titleAsset = _this.asset.getImageById("title");
            var title = new g.Sprite({
                scene: _this,
                src: titleAsset,
                x: g.game.width / 2,
                y: titleAsset.height * 1.25,
                anchorX: 0.5,
                anchorY: 0.5,
            });
            _this.append(title);
            var descriptionAsset = _this.asset.getImageById("description");
            var description = new g.Sprite({
                scene: _this,
                src: descriptionAsset,
                x: g.game.width / 2,
                y: title.y + title.height + descriptionAsset.height / 2,
                anchorX: 0.5,
                anchorY: 0.5,
            });
            _this.append(description);
            var copyright = createLabel(bitmapFont, "MUSIC BY (C)PANICPUMPKIN");
            copyright.x = g.game.width / 2;
            copyright.y = g.game.height - copyright.height * 2;
            _this.append(copyright);
            var inspired = createLabel(bitmapFont, "THIS GAME IS INSPIRED BY MISSILE COMMAND.");
            inspired.x = g.game.width / 2;
            inspired.y = copyright.y - copyright.height * 1.5;
            _this.append(inspired);
            var version = createLabel(bitmapFont, "VERSION ".concat(g.game.vars.version));
            version.moveTo(version.width / 2, version.height / 2);
            _this.append(version);
            var musicSwitch = createSwitchButton(bitmapFont, { ON: "MUSIC ON", OFF: "MUSIC OFF" });
            musicSwitch.x = g.game.width * 0.33;
            musicSwitch.y = description.y + description.height + musicSwitch.height;
            _this.append(musicSwitch);
            var seSwitch = createSwitchButton(bitmapFont, { ON: "SE ON", OFF: "SE OFF" });
            seSwitch.x = g.game.width * 0.5;
            seSwitch.y = musicSwitch.y;
            _this.append(seSwitch);
            var bgSwitch = createSwitchButton(bitmapFont, { ON: "BACKGROUND ON", OFF: "BACKGROUND OFF" });
            bgSwitch.x = g.game.width * 0.75;
            bgSwitch.y = musicSwitch.y;
            bgSwitch.onClicked.add(function (on) {
                if (on) {
                    bg.show();
                }
                else {
                    bg.hide();
                }
            });
            _this.append(bgSwitch);
            var button = new button_1.Button(_this, bitmapFont, "START", fontSize_1.FontSize.TINY);
            button.x = g.game.width / 2;
            button.y = musicSwitch.y - musicSwitch.height * 2;
            button.onClicked.add(function () {
                _this.onUpdate.remove(updateHandler);
                _this.onFinish.fire({
                    muteBGM: !musicSwitch.on,
                    muteSE: !seSwitch.on,
                    background: bgSwitch.on
                });
            });
            _this.append(button);
            // const timer = new CountdownTimer(this, bitmapFont, timeLimit);
            // timer.y = musicSwitch.y - musicSwitch.height * 2;
            // timer.onFinish.addOnce(() => {
            //     this.onUpdate.remove(updateHandler);
            //     this.onFinish.fire({
            //         muteBGM: !musicSwitch.on,
            //         muteSE: !seSwitch.on,
            //         background: bgSwitch.on
            //     });
            // });
            // this.append(timer);
            // timer.start();
            var updateHandler = function () {
                stars.children.forEach(function (entity) {
                    if (entity instanceof star_1.Star) {
                        entity.moveBy(-30 / g.game.fps, 30 / g.game.fps);
                        if (entity.x < 0 || entity.y > g.game.height) {
                            entity.moveTo(g.game.random.generate() * g.game.width + 1, 0);
                        }
                        entity.modified();
                    }
                });
            };
            _this.onUpdate.add(updateHandler);
        });
        return _this;
    }
    return TitleScene;
}(g.Scene));
exports.TitleScene = TitleScene;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}