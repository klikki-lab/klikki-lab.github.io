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
var commonScene_1 = require("../common/commonScene");
var easterBunny_1 = require("../game_scene/egg/easter_bunny/easterBunny");
var shadow_1 = require("../game_scene/egg/shadow");
var dust_1 = require("../game_scene/effect/dust");
var gameScene_1 = require("../game_scene/gameScene");
var fontSize_1 = require("../common/fontSize");
var redEgg_1 = require("../game_scene/egg/easter_egg/redEgg");
var easterEgg_1 = require("../game_scene/egg/easter_egg/easterEgg");
var sight_1 = require("../game_scene/sight");
var textSpawn_1 = require("../game_scene/effect/textSpawn");
var floor_1 = require("../game_scene/floor");
var audioController_1 = require("../common/audioController");
var audioId_1 = require("../common/audioId");
var button_1 = require("../common/button");
var TitleScene = /** @class */ (function (_super) {
    __extends(TitleScene, _super);
    function TitleScene(_param, timeLimit) {
        var _this = _super.call(this, {
            game: g.game,
            name: "title scene",
            assetIds: [
                "easter_bunny_egg", "easter_bunny_ears", "easter_egg_red", "img_shadow", "img_sight",
                "se_jump", "se_ground", "se_crack", "se_collide", "se_creature",
            ],
        }, timeLimit) || this;
        _this.onFinish = new g.Trigger();
        _this.progress = 0;
        _this.loadHandler = function () {
            _this.audio = _this.createAudioAssetController();
            _this.font = _this.createDynamicFont("white", "black", fontSize_1.FontSize.MEDIUM);
            new floor_1.Floor(_this, _this);
            _this.shadowLayer = new g.E({ scene: _this, parent: _this });
            _this.effectLayer = new g.E({ scene: _this, parent: _this });
            _this.sight = new sight_1.Sight(_this, _this.effectLayer);
            _this.eggBackgroundLayer = new g.E({ scene: _this, parent: _this });
            _this.append(_this.bunny = _this.createBunnyEgg());
            _this.eggForegroundLayer = new g.E({ scene: _this, parent: _this });
            _this.title = _this.createTitle();
            // const timerFont = this.createDynamicFont("yellow", "black", FontSize.MEDIUM);
            // const timer = new StartTimer(this, timerFont, this.timeLimit);
            // timer.x = g.game.width - timer.width / 2;
            // timer.y = g.game.height - timer.height;
            // timer.onFinish.add(() => this.onFinish.fire());
            // timer.start();
            // this.append(timer);
            var font = new g.DynamicFont({
                game: g.game,
                fontFamily: "sans-serif",
                fontWeight: "bold",
                strokeWidth: fontSize_1.FontSize.MEDIUM / 6,
                strokeColor: "#222",
                fontColor: "white",
                size: fontSize_1.FontSize.MEDIUM,
            });
            var startButton = new button_1.Button(_this, font, "START!");
            startButton.x = g.game.width - startButton.width / 2 - fontSize_1.FontSize.MEDIUM;
            startButton.y = g.game.height - startButton.height / 2 - fontSize_1.FontSize.MEDIUM;
            startButton.onClicked.add(function (_) { return _this.onFinish.fire(); });
            _this.append(startButton);
            _this.tutorial = _this.createLabel(_this.createDynamicFont("white", "black", fontSize_1.FontSize.MEDIUM), "画面をクリックしてね！");
            _this.tutorial.x = _this.bunny.x;
            _this.tutorial.y = _this.title.y + _this.title.height * 1.5;
            var detectBunnyCollision = function (egg) {
                if (!(egg instanceof easterEgg_1.EasterEgg))
                    return;
                if (!egg.isApperar || egg.isJumping)
                    return;
                if (g.Collision.withinAreas(_this.bunny, egg, _this.bunny.height * .9)) {
                    _this.audio.playSE(audioId_1.SoundEffectId.COLLIDE);
                    _this.bunny.collideEgg();
                    egg.collide(_this.bunny);
                }
            };
            var detectBunnyPosition = function (egg) {
                if (!(egg instanceof easterEgg_1.EasterEgg))
                    return;
                if (g.Util.distanceBetweenOffsets(_this.bunny, egg) > _this.bunny.height * 1.75)
                    return;
                _this.appendEggLayer(egg);
            };
            var updateHandler = function () {
                var _a, _b, _c, _d, _e, _f;
                if (!_this.bunny.isJumping) {
                    (_a = _this.eggForegroundLayer.children) === null || _a === void 0 ? void 0 : _a.forEach(detectBunnyCollision);
                    (_b = _this.eggBackgroundLayer.children) === null || _b === void 0 ? void 0 : _b.forEach(detectBunnyCollision);
                }
                var foreground = (_d = (_c = _this.eggForegroundLayer.children) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0;
                for (var i = foreground - 1; i >= 0; i--) {
                    detectBunnyPosition(_this.eggForegroundLayer.children[i]);
                }
                var background = (_f = (_e = _this.eggBackgroundLayer.children) === null || _e === void 0 ? void 0 : _e.length) !== null && _f !== void 0 ? _f : 0;
                for (var i = background - 1; i >= 0; i--) {
                    detectBunnyPosition(_this.eggBackgroundLayer.children[i]);
                }
            };
            _this.onUpdate.add(updateHandler);
            _this.onPointDownCapture.add(function (ev) {
                var _a;
                if (((_a = ev.target) === null || _a === void 0 ? void 0 : _a.parent) instanceof button_1.Button)
                    return;
                if (_this.bunny.canJump) {
                    _this.audio.playSE(audioId_1.SoundEffectId.JUMP);
                    _this.bunny.jump(ev.point);
                    _this.sight.target(ev.point);
                    if (_this.progress === 0) {
                        _this.tutorial.text = "ジャンプ！";
                        _this.tutorial.invalidate();
                    }
                }
            });
        };
        _this.createBunnyEgg = function () {
            var bunny = new easterBunny_1.EasterBunny(_this, new shadow_1.Shadow(_this, _this.shadowLayer));
            bunny.setY(g.game.height / 2);
            bunny.onGround.add(function (bunny) {
                _this.audio.playSE(audioId_1.SoundEffectId.GROUND);
                _this.sight.stop();
                _this.shakeCamera();
                _this.checkCollideEggLayer(bunny);
                new dust_1.Dust(_this, _this.effectLayer, bunny.getGroundPos(), bunny.getSize(), gameScene_1.GameScene.COLOR_PINK);
                if (_this.progress === 0) {
                    _this.progress = 1;
                    _this.progressTutorial();
                }
            });
            return bunny;
        };
        _this.checkCollideEggLayer = function (bunny) {
            var _a, _b;
            (_a = _this.eggForegroundLayer.children) === null || _a === void 0 ? void 0 : _a.forEach(function (egg) {
                if (egg instanceof easterEgg_1.EasterEgg) {
                    _this.checkCollideEgg(bunny, egg);
                }
            });
            (_b = _this.eggBackgroundLayer.children) === null || _b === void 0 ? void 0 : _b.forEach(function (egg) {
                if (egg instanceof easterEgg_1.EasterEgg) {
                    _this.checkCollideEgg(bunny, egg);
                }
            });
        };
        _this.checkCollideEgg = function (bunny, egg) {
            if (!egg.isApperar || egg.isJumping)
                return;
            if (g.Collision.within(bunny.getGroundX(), bunny.getGroundY(), egg.getGroundX(), egg.getGroundY(), bunny.power)) {
                var distance = Math.floor(g.Util.distanceBetweenAreas(bunny, egg) / (bunny.power / 4));
                egg.crack(bunny, distance);
                _this.progress++;
                if (_this.progress === 2) {
                    _this.progressTutorial();
                    _this.spawnMessage("Nice!", egg);
                }
                else if (_this.progress === 3) {
                    _this.spawnMessage("Excellent!", egg);
                }
                else if (_this.progress === 4) {
                    _this.spawnMessage("Wonderful!", egg);
                }
                else if (_this.progress >= 5) {
                    _this.spawnMessage("Superb!", egg);
                }
            }
        };
        _this.spawnMessage = function (message, pos) {
            _this.eggForegroundLayer.append(new textSpawn_1.TextSpawn(_this, _this.font, message, pos));
        };
        _this.progressTutorial = function () {
            if (_this.progress < 1 || _this.progress > 2)
                return;
            if (_this.progress === 1) {
                _this.tutorial.text = "次はタマゴに向かってジャンプ！";
                _this.createRedEgg();
            }
            else if (_this.progress === 2) {
                _this.tutorial.text = "イイ感じ！その調子でガンバってネ！";
            }
            _this.tutorial.invalidate();
        };
        _this.createRedEgg = function () {
            var egg = new redEgg_1.RedEgg(_this, new shadow_1.Shadow(_this, _this.shadowLayer));
            var x = g.game.width / 2;
            var y = g.game.height + egg.height * 1.5;
            egg.init(x, y, _this.bunny.x, _this.bunny.y);
            egg.onBounced.add(function (_egg) {
                _this.audio.playSE(egg.isNaked() ? audioId_1.SoundEffectId.CREATURE : audioId_1.SoundEffectId.CRACK);
                new dust_1.Dust(_this, _this.effectLayer, egg.getGroundPos(), egg, redEgg_1.RedEgg.COLOR);
            });
            _this.appendEggLayer(egg);
        };
        _this.appendEggLayer = function (egg) {
            if (egg.getGroundY() > _this.bunny.getGroundY()) {
                _this.appendForegroundLayer(egg);
            }
            else {
                _this.appendBackgroundLayer(egg);
            }
        };
        _this.appendForegroundLayer = function (egg) {
            if (egg.parent !== _this.eggForegroundLayer) {
                _this.eggForegroundLayer.append(egg);
                if (_this.eggBackgroundLayer.children && _this.eggBackgroundLayer.children.indexOf(egg) !== -1) {
                    _this.eggBackgroundLayer.remove(egg);
                }
            }
        };
        _this.appendBackgroundLayer = function (egg) {
            if (egg.parent !== _this.eggBackgroundLayer) {
                _this.eggBackgroundLayer.append(egg);
                if (_this.eggForegroundLayer.children && _this.eggForegroundLayer.children.indexOf(egg) !== -1) {
                    _this.eggForegroundLayer.remove(egg);
                }
            }
        };
        _this.shakeCamera = function () {
            var shakeTimes = 4;
            var delay = 1000 / g.game.fps;
            var _loop_1 = function (i) {
                _this.setTimeout(function () {
                    var isLast = i >= shakeTimes - 1;
                    var ry = isLast ? 0 : (g.game.random.generate() * 2 - 1) * 16 + 32;
                    _this.camera.y = ry;
                    _this.camera.modified();
                    _this.title.y = fontSize_1.FontSize.LARGE + ry;
                    _this.title.modified();
                }, i * delay);
            };
            for (var i = 0; i < shakeTimes; i++) {
                _loop_1(i);
            }
        };
        _this.createTitle = function () { return new g.Label({
            scene: _this,
            parent: _this,
            text: "マジカルどっすん",
            font: _this.createDynamicFont("#ff6868", "white", fontSize_1.FontSize.LARGE * 2),
            x: g.game.width / 2,
            y: fontSize_1.FontSize.LARGE,
            anchorX: 0.5,
        }); };
        _this.createLabel = function (font, text) { return new g.Label({
            scene: _this,
            parent: _this,
            font: font,
            text: text,
            fontSize: font.size,
            anchorX: 0.5,
        }); };
        _this.createDynamicFont = function (fontColor, strokeColor, fontSize) {
            if (fontColor === void 0) { fontColor = "white"; }
            if (strokeColor === void 0) { strokeColor = "black"; }
            if (fontSize === void 0) { fontSize = fontSize_1.FontSize.LARGE; }
            return new g.DynamicFont({
                game: g.game,
                fontFamily: "monospace",
                fontColor: fontColor,
                fontWeight: "bold",
                size: fontSize,
                strokeColor: strokeColor,
                strokeWidth: fontSize / 6,
            });
        };
        _this.createAudioAssetController = function () {
            var controller = new audioController_1.AudioController(_this.asset, g.game.audio.music.volume, g.game.audio.sound.volume);
            var params = [
                { assetId: "se_jump" },
                { assetId: "se_ground", volumeRate: 0.8 },
                { assetId: "se_crack" },
                { assetId: "se_collide" },
                { assetId: "se_creature" }
            ];
            controller.addSE(params);
            return controller;
        };
        _this.camera = new g.Camera2D({});
        g.game.focusingCamera = _this.camera;
        g.game.modified();
        _this.onLoad.add(_this.loadHandler);
        return _this;
    }
    return TitleScene;
}(commonScene_1.CommonScene));
exports.TitleScene = TitleScene;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}