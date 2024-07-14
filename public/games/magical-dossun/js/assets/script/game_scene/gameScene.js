window.gLocalAssetContainer["gameScene"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.GameScene = void 0;
var easterEgg_1 = require("./egg/easter_egg/easterEgg");
var easterBunny_1 = require("./egg/easter_bunny/easterBunny");
var shadow_1 = require("./egg/shadow");
var fontSize_1 = require("../common/fontSize");
var redEgg_1 = require("./egg/easter_egg/redEgg");
var score_1 = require("./hud/score");
var textSpawn_1 = require("./effect/textSpawn");
var countdownTimer_1 = require("./hud/countdownTimer");
var greenEgg_1 = require("./egg/easter_egg/greenEgg");
var blueEgg_1 = require("./egg/easter_egg/blueEgg");
var goldEgg_1 = require("./egg/easter_egg/goldEgg");
var dust_1 = require("./effect/dust");
var commonScene_1 = require("../common/commonScene");
var gameStart_1 = require("./gameStart");
var sight_1 = require("./sight");
var gameFinish_1 = require("./gameFinish");
var floor_1 = require("./floor");
var audioController_1 = require("../common/audioController");
var audioId_1 = require("../common/audioId");
var blackout_1 = require("./blackout");
var rainbowEgg_1 = require("./egg/easter_egg/rainbowEgg");
var carrot_1 = require("./carrot");
var button_1 = require("../common/button");
var titleScene_1 = require("../title_scene/titleScene");
var GameScene = /** @class */ (function (_super) {
    __extends(GameScene, _super);
    function GameScene(param, timeLimit) {
        var _a;
        var _this = _super.call(this, {
            game: g.game,
            name: "game scene",
            assetIds: [
                "easter_bunny_egg", "easter_bunny_ears", "img_carrot",
                "easter_egg_red", "easter_egg_green", "easter_egg_blue",
                "easter_egg_gold", "easter_egg_rainbow",
                "img_shadow", "img_sight", "mouse_cursor",
                "bgm", "bgm_power_up", "se_jump", "se_ground", "se_crack", "se_collide", "se_creature",
            ],
        }, timeLimit) || this;
        _this.param = param;
        _this.rainbowEggSpawnRate = GameScene.REINBOW_EGG_SPAWN_RATE;
        _this.isGameOver = false;
        _this.detectBunnyCollision = function (egg) {
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
        _this.detectBunnyPosition = function (egg) {
            if (!(egg instanceof easterEgg_1.EasterEgg))
                return;
            if (g.Util.distanceBetweenOffsets(_this.bunny, egg) > _this.bunny.height * 1.75)
                return;
            _this.appendEggLayer(egg);
        };
        _this.updateHandler = function () {
            var _a, _b, _c, _d, _e, _f;
            if (!_this.bunny.isJumping) {
                (_a = _this.eggForegroundLayer.children) === null || _a === void 0 ? void 0 : _a.forEach(_this.detectBunnyCollision);
                (_b = _this.eggBackgroundLayer.children) === null || _b === void 0 ? void 0 : _b.forEach(_this.detectBunnyCollision);
            }
            var foreground = (_d = (_c = _this.eggForegroundLayer.children) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0;
            for (var i = foreground - 1; i >= 0; i--) {
                _this.detectBunnyPosition(_this.eggForegroundLayer.children[i]);
            }
            var background = (_f = (_e = _this.eggBackgroundLayer.children) === null || _e === void 0 ? void 0 : _e.length) !== null && _f !== void 0 ? _f : 0;
            for (var i = background - 1; i >= 0; i--) {
                _this.detectBunnyPosition(_this.eggBackgroundLayer.children[i]);
            }
        };
        _this.loadHandler = function (_scene) {
            new floor_1.Floor(_this, _this);
            _this.shadowLayer = new g.E({ scene: _this, parent: _this });
            _this.effectLayer = new g.E({ scene: _this, parent: _this });
            _this.sight = new sight_1.Sight(_this, _this.effectLayer);
            _this.carrotLayer = new g.E({ scene: _this, parent: _this });
            _this.eggBackgroundLayer = new g.E({ scene: _this, parent: _this });
            _this.append(_this.bunny = _this.createBunnyEgg());
            _this.eggForegroundLayer = new g.E({ scene: _this, parent: _this });
            _this.hudFont = _this.createDynamicFont();
            _this.spawnFont = _this.createDynamicFont("white", "#544", fontSize_1.FontSize.MEDIUM);
            _this.labelLayer = new g.E({ scene: _this, parent: _this });
            _this.hudLayer = new g.E({ scene: _this, parent: _this });
            _this.hudLayer.append(_this.score = new score_1.Score(_this, _this.hudFont));
            var timer = new countdownTimer_1.CountdownTimer(_this, _this.hudFont, _this.timeLimit);
            timer.onStart.addOnce(_this.createEggs);
            timer.onTick.add(_this.createEggs);
            timer.onFinish.addOnce(_this.gameOver);
            _this.hudLayer.append(timer);
            _this.textLayer = new g.E({ scene: _this, parent: _this });
            var blackout = new blackout_1.Blackout(_this, _this);
            blackout.close();
            var start = new gameStart_1.GameStart(_this, _this.createDynamicFont("white", "black", fontSize_1.FontSize.XL, "sans-serif"));
            start.onFinish.add(function () {
                blackout.open();
                timer.start();
                _this.onPointDownCapture.add(_this.pointDownHandler);
                _this.onUpdate.add(_this.updateHandler);
            });
            _this.append(start);
            _this.audio = _this.createAudioAssetController();
            _this.audio.playMusic(audioId_1.MusicId.NORMAL);
            // const cursor = this.createMouseCursor();
            // if (cursor) {
            //     this.mouseCursor = cursor;
            //     this.append(cursor);
            // }
        };
        _this.pointDownHandler = function (ev) {
            if (!_this.isGameOver && _this.bunny.canJump) {
                _this.audio.playSE(audioId_1.SoundEffectId.JUMP);
                _this.bunny.jump(ev.point);
                _this.sight.target(ev.point);
            }
        };
        _this.createBunnyEgg = function () {
            var bunny = new easterBunny_1.EasterBunny(_this, new shadow_1.Shadow(_this, _this.shadowLayer));
            bunny.onGround.add(function (bunny) {
                _this.audio.playSE(audioId_1.SoundEffectId.GROUND);
                _this.sight.stop();
                _this.shakeCamera();
                _this.checkCllideEggLayer(bunny);
                _this.checkCllideCarrot(bunny);
                new dust_1.Dust(_this, _this.effectLayer, bunny.getGroundPos(), bunny.getSize(), GameScene.COLOR_PINK);
            });
            bunny.onNormal.add(function (_bunny) {
                _this.audio.stopMusic(audioId_1.MusicId.POWER_UP);
                _this.audio.playMusic(audioId_1.MusicId.NORMAL);
            });
            return bunny;
        };
        _this.checkCllideCarrot = function (bunny) {
            var _a;
            (_a = _this.carrotLayer.children) === null || _a === void 0 ? void 0 : _a.forEach(function (carrot) {
                if (g.Collision.within(bunny.getGroundX(), bunny.getGroundY(), carrot.x, carrot.y, bunny.power)) {
                    if (!bunny.isPowerUp) {
                        _this.audio.stopMusic(audioId_1.MusicId.NORMAL);
                        _this.audio.playMusic(audioId_1.MusicId.POWER_UP);
                    }
                    bunny.powerUp();
                    new dust_1.Dust(_this, _this.effectLayer, { x: carrot.x, y: carrot.y }, { width: carrot.width, height: carrot.height }, "orange");
                    if (carrot instanceof carrot_1.Carrot) {
                        _this.addScore(carrot.score, 0, carrot);
                    }
                    carrot.destroy();
                }
            });
        };
        _this.checkCllideEggLayer = function (bunny) {
            var _a, _b;
            var colide = function (egg) {
                score += egg.score;
                combo++;
                _this.rainbowEggSpawnRate += egg.isNaked() ? 0.001 : 0.0001;
            };
            var score = 0;
            var combo = 0;
            (_a = _this.eggForegroundLayer.children) === null || _a === void 0 ? void 0 : _a.forEach(function (egg) {
                if (egg instanceof easterEgg_1.EasterEgg && _this.checkCollideEgg(bunny, egg)) {
                    colide(egg);
                }
            });
            (_b = _this.eggBackgroundLayer.children) === null || _b === void 0 ? void 0 : _b.forEach(function (egg) {
                if (egg instanceof easterEgg_1.EasterEgg && _this.checkCollideEgg(bunny, egg)) {
                    colide(egg);
                }
            });
            if (combo > 0) {
                _this.addScore(score, combo, bunny);
            }
        };
        _this.addScore = function (score, combo, target) {
            var result = _this.score.add(score, combo);
            var x = target.x;
            if (target.x < target.width) {
                x = target.width;
            }
            else if (target.x > g.game.width - target.width) {
                x = g.game.width - target.width;
            }
            var y = target.y - target.height / 2;
            if (target.y < target.height * 2) {
                y = target.height * 2;
            }
            var scoreSpawn = new textSpawn_1.TextSpawn(_this, _this.spawnFont, result.toString(), { x: x, y: y });
            _this.textLayer.append(scoreSpawn);
        };
        _this.checkCollideEgg = function (bunny, egg) {
            if (!egg.isApperar || egg.isJumping)
                return;
            if (g.Collision.within(bunny.getGroundX(), bunny.getGroundY(), egg.getGroundX(), egg.getGroundY(), bunny.power)) {
                var distance = Math.floor(g.Util.distanceBetweenAreas(bunny, egg) / (bunny.power / 4));
                egg.crack(bunny, distance);
                return true;
            }
            return false;
        };
        _this.createEggs = function (remainingSec) {
            var _a, _b, _c, _d;
            var elapsedSec = _this.timeLimit - remainingSec;
            var thresholdSec = 15;
            var level = Math.floor(elapsedSec / thresholdSec) + 1;
            var maxEggNum = level * 4;
            var background = (_b = (_a = _this.eggBackgroundLayer.children) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0;
            var foreground = (_d = (_c = _this.eggForegroundLayer.children) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0;
            var length = background + foreground;
            if (length <= maxEggNum) {
                var waveEggNum = 5;
                var random = _this.random.generate();
                if (elapsedSec === 0) {
                    _this.createGreenEgg(waveEggNum);
                }
                else if (elapsedSec < thresholdSec) {
                    if (random < 0.75) {
                        _this.createRedEgg(waveEggNum);
                    }
                    else {
                        _this.createGreenEgg(waveEggNum);
                    }
                }
                else if (elapsedSec < thresholdSec * 2) {
                    if (_this.random.generate() < 0.01) {
                        _this.createGoldEgg();
                    }
                    if (random < 0.4) {
                        _this.createRedEgg(waveEggNum);
                    }
                    else if (random < 0.9) {
                        _this.createGreenEgg(waveEggNum);
                    }
                    else {
                        _this.createBlueEgg(waveEggNum);
                    }
                }
                else if (elapsedSec < thresholdSec * 3) {
                    if (_this.random.generate() < 0.02) {
                        _this.createGoldEgg();
                    }
                    if (random < 0.2) {
                        _this.createRedEgg(waveEggNum + 1);
                    }
                    else if (random < 0.8) {
                        _this.createGreenEgg(waveEggNum + 1);
                    }
                    else {
                        _this.createBlueEgg(waveEggNum);
                    }
                }
                else {
                    if (_this.random.generate() < 0.05) {
                        _this.createGoldEgg();
                    }
                    if (random < 0.1) {
                        _this.createRedEgg(waveEggNum + 2);
                    }
                    else if (random < 0.75) {
                        _this.createGreenEgg(waveEggNum + 2);
                    }
                    else {
                        _this.createBlueEgg(waveEggNum + 1);
                    }
                }
            }
            if (elapsedSec === 45 || elapsedSec === 53) {
                _this.createGoldEgg();
            }
            if (elapsedSec >= 40 && _this.random.generate() <= _this.rainbowEggSpawnRate) {
                _this.createRainbowEgg();
            }
        };
        _this.createBlueEgg = function (eggNum) {
            for (var i = 0; i < eggNum; i++) {
                var x = 0;
                var y = 0;
                var targetX = 0;
                var targetY = 0;
                if (_this.random.generate() < 0.5) {
                    if (_this.random.generate() < 0.5) {
                        x = -easterEgg_1.EasterEgg.SIZE;
                        targetX = g.game.width;
                    }
                    else {
                        x = g.game.width + easterEgg_1.EasterEgg.SIZE;
                        targetX = 0;
                    }
                    y = _this.random.generate() * (g.game.height * 0.8) + (g.game.height * 0.1);
                    targetY = g.game.height - y;
                }
                else {
                    if (_this.random.generate() < 0.5) {
                        y = -easterEgg_1.EasterEgg.SIZE;
                        targetY = g.game.height;
                    }
                    else {
                        y = g.game.height + easterEgg_1.EasterEgg.SIZE;
                        targetY = 0;
                    }
                    x = _this.random.generate() * (g.game.width * 0.8) + (g.game.width * 0.1);
                    targetX = g.game.width - x;
                }
                var egg = new blueEgg_1.BlueEgg(_this, new shadow_1.Shadow(_this, _this.shadowLayer));
                egg.init(x, y, targetX, targetY);
                _this.bouncedEgg(egg, blueEgg_1.BlueEgg.COLOR);
                _this.appendEggLayer(egg);
            }
        };
        _this.createRedEgg = function (eggNum) {
            var targetX = _this.random.generate() * (g.game.width * 0.6) + (g.game.width * 0.2);
            var targetY = _this.random.generate() * (g.game.height * 0.6) + (g.game.height * 0.2);
            var maxX = Math.max(Math.abs(g.game.width - targetX), targetX);
            var maxY = Math.max(Math.abs(g.game.height - targetY), targetY);
            var maxDistance = Math.max(maxX, maxY);
            for (var i = 0; i < eggNum; i++) {
                var egg = new redEgg_1.RedEgg(_this, new shadow_1.Shadow(_this, _this.shadowLayer));
                var radius = maxDistance + Math.max(egg.width, egg.height);
                var angle = 2 * Math.PI * (i / eggNum);
                var eggX = targetX + Math.cos(angle) * radius;
                var eggY = targetY + Math.sin(angle) * radius;
                egg.init(eggX, eggY, targetX, targetY);
                _this.bouncedEgg(egg, redEgg_1.RedEgg.COLOR);
                _this.appendEggLayer(egg);
            }
        };
        _this.createGreenEgg = function (eggNum) {
            var x = 0;
            var y = 0;
            var targetX = 0;
            var targetY = 0;
            if (_this.random.generate() < 0.5) {
                if (_this.random.generate() < 0.5) {
                    x = -greenEgg_1.GreenEgg.RADIUS * 1.25;
                    targetX = g.game.width;
                }
                else {
                    x = g.game.width + greenEgg_1.GreenEgg.RADIUS * 1.25;
                    targetX = 0;
                }
                y = _this.random.generate() * (g.game.height * 0.8) + (g.game.height * 0.1);
                targetY = g.game.height - y;
            }
            else {
                if (_this.random.generate() < 0.5) {
                    y = -greenEgg_1.GreenEgg.RADIUS * 1.25;
                    targetY = g.game.height;
                }
                else {
                    y = g.game.height + greenEgg_1.GreenEgg.RADIUS * 1.25;
                    targetY = 0;
                }
                x = _this.random.generate() * (g.game.width * 0.8) + (g.game.width * 0.1);
                targetX = g.game.width - x;
            }
            for (var i = 0; i < eggNum; i++) {
                var egg = new greenEgg_1.GreenEgg(_this, new shadow_1.Shadow(_this, _this.shadowLayer), i / eggNum, x, y);
                var rx = Math.cos(2 * Math.PI * (i / eggNum)) * greenEgg_1.GreenEgg.RADIUS;
                var ry = Math.sin(2 * Math.PI * (i / eggNum)) * greenEgg_1.GreenEgg.RADIUS;
                egg.init(x + rx, y + ry, targetX + rx, targetY + ry);
                _this.bouncedEgg(egg, greenEgg_1.GreenEgg.COLOR);
                _this.appendEggLayer(egg);
            }
        };
        _this.createGoldEgg = function () {
            var x = 0;
            var targetX = 0;
            if (_this.random.generate() < 0.5) {
                x = -easterEgg_1.EasterEgg.SIZE;
                targetX = g.game.width;
            }
            else {
                x = g.game.width + easterEgg_1.EasterEgg.SIZE;
                targetX = 0;
            }
            var y = _this.random.generate() * (g.game.height * 0.8) + (g.game.height * 0.1);
            var targetY = g.game.height - y;
            var egg = new goldEgg_1.GoldEgg(_this, new shadow_1.Shadow(_this, _this.shadowLayer));
            egg.init(x, y, targetX, targetY);
            _this.bouncedEgg(egg, goldEgg_1.GoldEgg.COLOR);
            _this.appendEggLayer(egg);
        };
        _this.createRainbowEgg = function () {
            var y = 0;
            var targetY = 0;
            if (_this.random.generate() < 0.5) {
                y = -easterEgg_1.EasterEgg.SIZE;
                targetY = g.game.height;
            }
            else {
                y = g.game.height + easterEgg_1.EasterEgg.SIZE;
                targetY = 0;
            }
            var x = _this.random.generate() * (g.game.width * 0.8) + (g.game.width * 0.1);
            var targetX = g.game.width - x;
            var egg = new rainbowEgg_1.RainbowEgg(_this, new shadow_1.Shadow(_this, _this.shadowLayer));
            egg.onCracked.addOnce(function (egg) {
                var shadow = new shadow_1.Shadow(_this, _this.shadowLayer);
                shadow.move(egg);
                _this.carrotLayer.append(new carrot_1.Carrot(_this, egg, shadow));
                new dust_1.Dust(_this, _this.effectLayer, egg.getGroundPos(), egg, "orange");
                egg.destroy();
            });
            egg.init(x, y, targetX, targetY);
            _this.bouncedEgg(egg, rainbowEgg_1.RainbowEgg.COLOR);
            _this.appendEggLayer(egg);
            _this.rainbowEggSpawnRate = GameScene.REINBOW_EGG_SPAWN_RATE;
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
        _this.bouncedEgg = function (egg, color) {
            egg.onBounced.add(function (egg) {
                _this.audio.playSE(egg.isNaked() ? audioId_1.SoundEffectId.CREATURE : audioId_1.SoundEffectId.CRACK);
                new dust_1.Dust(_this, _this.effectLayer, egg.getGroundPos(), egg, color);
            });
        };
        _this.gameOver = function () {
            _this.isGameOver = true;
            //this.onPointDownCapture.destroy();
            new blackout_1.Blackout(_this, _this.labelLayer).close();
            var finish = new gameFinish_1.GameFinish(_this, _this.createDynamicFont("white", "black", fontSize_1.FontSize.XL, "sans-serif"));
            _this.labelLayer.append(finish);
            _this.setTimeout(_this.showRetryButton, 500);
        };
        _this.showRetryButton = function () {
            var font = new g.DynamicFont({
                game: g.game,
                fontFamily: "sans-serif",
                fontWeight: "bold",
                strokeWidth: fontSize_1.FontSize.MEDIUM / 6,
                strokeColor: "#222",
                fontColor: "white",
                size: fontSize_1.FontSize.MEDIUM,
            });
            var retryButton = new button_1.Button(_this, font, "RETRY");
            retryButton.x = g.game.width - retryButton.width / 2 - fontSize_1.FontSize.MEDIUM;
            retryButton.y = g.game.height - retryButton.height / 2 - fontSize_1.FontSize.MEDIUM;
            retryButton.onClicked.add(function (_) {
                g.game.vars.gameState.score = 0;
                _this.audio.stopMusic(audioId_1.MusicId.NORMAL);
                _this.audio.stopMusic(audioId_1.MusicId.POWER_UP);
                var titleScene = new titleScene_1.TitleScene(_this.param, 7);
                titleScene.onFinish.add(function () {
                    g.game.replaceScene(new GameScene(_this.param, 60));
                });
                g.game.replaceScene(titleScene);
            });
            _this.append(retryButton);
        };
        _this.shakeCamera = function () {
            var shakeTimes = 4;
            var delay = Math.floor(1000 / g.game.fps);
            var _loop_1 = function (i) {
                _this.setTimeout(function () {
                    var isLast = i >= shakeTimes - 1;
                    var ry = isLast ? 0 : (g.game.random.generate() * 2 - 1) * 16 + 32;
                    _this.camera.y = ry;
                    _this.camera.modified();
                    _this.hudLayer.y = ry;
                    _this.hudLayer.modified();
                }, i * delay);
            };
            for (var i = 0; i < shakeTimes; i++) {
                _loop_1(i);
            }
        };
        _this.createAudioAssetController = function () {
            var controller = new audioController_1.AudioController(_this.asset, g.game.audio.music.volume, g.game.audio.sound.volume);
            controller.addBGM(["bgm", "bgm_power_up"]);
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
        _this.createDynamicFont = function (fontColor, strokeColor, size, fontFamily) {
            if (fontColor === void 0) { fontColor = "white"; }
            if (strokeColor === void 0) { strokeColor = "black"; }
            if (size === void 0) { size = fontSize_1.FontSize.LARGE; }
            if (fontFamily === void 0) { fontFamily = "monospace"; }
            return new g.DynamicFont({
                game: g.game,
                fontFamily: fontFamily,
                fontColor: fontColor,
                fontWeight: "bold",
                size: size,
                strokeColor: strokeColor,
                strokeWidth: size / 6,
            });
        };
        _this.createMouseCursor = function () {
            if (typeof window !== "undefined") {
                var mouseCursor_1 = new g.Sprite({
                    scene: _this,
                    src: _this.asset.getImageById("mouse_cursor"),
                    anchorX: .5,
                    anchorY: .5,
                    opacity: .5,
                });
                window.addEventListener('mousemove', function (ev) {
                    if (_this.mouseCursor) {
                        var x = Math.min(ev.clientX, g.game.width);
                        var y = Math.min(ev.clientY, g.game.height);
                        mouseCursor_1.moveTo(x, y);
                        mouseCursor_1.modified();
                    }
                });
                return mouseCursor_1;
            }
            return undefined;
        };
        _this.random = (_a = param.random) !== null && _a !== void 0 ? _a : g.game.random;
        _this.camera = new g.Camera2D({});
        g.game.focusingCamera = _this.camera;
        g.game.modified();
        _this.onLoad.add(_this.loadHandler);
        return _this;
    }
    GameScene.REINBOW_EGG_SPAWN_RATE = 0.005;
    GameScene.COLOR_PINK = "#ffcbcb";
    return GameScene;
}(commonScene_1.CommonScene));
exports.GameScene = GameScene;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}