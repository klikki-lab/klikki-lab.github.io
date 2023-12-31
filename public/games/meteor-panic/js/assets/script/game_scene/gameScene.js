window.gLocalAssetContainer["GameScene"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
var sight_1 = require("./player/sight");
var missile_1 = require("./player/missile");
var meteor_1 = require("./invader/meteor");
var scorer_1 = require("./hud/scorer");
var smoke_1 = require("./effect/smoke");
var combo_1 = require("./combo");
var star_1 = require("../common/star");
var player_1 = require("./player/player");
var explosion_1 = require("./effect/explosion");
var ticker_1 = require("./hud/ticker");
var wave_1 = require("./hud/wave");
var notificationLabel_1 = require("./notificationLabel");
var missileBase_1 = require("./player/missileBase");
var missileLauncher_1 = require("./player/missileLauncher");
var destroyedMissileBase_1 = require("./player/destroyedMissileBase");
var finishLabel_1 = require("./finishLabel");
var ufo_1 = require("./invader/ufo");
var invader_1 = require("./invader/invader");
var InvaderShockWave_1 = require("./effect/InvaderShockWave");
var playerShockWave_1 = require("./effect/playerShockWave");
var ufoBullet_1 = require("./invader/ufoBullet");
var rebuild_1 = require("./player/rebuild");
var missileBaseBackground_1 = require("./player/missileBaseBackground");
var fireSmoke_1 = require("./player/fireSmoke");
var collider_1 = require("./common/collider");
var destroyedUfo_1 = require("./invader/destroyedUfo");
var blinking_1 = require("./blinking");
var button_1 = require("../common/button");
var titleScene_1 = require("../title_scene/titleScene");
var GameScene = /** @class */ (function (_super) {
    __extends(GameScene, _super);
    function GameScene(random, timeLimit, existsBackground, isDebug) {
        if (isDebug === void 0) { isDebug = false; }
        var _this = _super.call(this, {
            game: g.game,
            assetIds: [
                "missile_base", "destroyed_missile_base", "missile_base_rebuild", "destroyed_missile_base_back",
                "missile", "remaining_missile", "combustion", "gun_turret", "sight",
                "meteor", "heat", "smoke", "explosion", "shock_wave_player", "shock_wave_invader", "ground",
                "ufo", "destroyed_ufo", "ufo_bullet", "horizon",
                "font16_1", "glyph_area_16",
                "bgm", "se_fire", "se_reload", "se_destroy", "se_explosion", "se_ufo", "se_powerup", "se_strike",
                "se_rebuild", "se_start", "se_finish",
            ]
        }) || this;
        _this.onLoad.add(function () { return loadHandler(); });
        var createBitmapFont16_1 = function () {
            var fontAsset = _this.asset.getImageById("font16_1");
            var fontGlyphAsset = _this.asset.getTextById("glyph_area_16");
            var glyphInfo = JSON.parse(fontGlyphAsset.data);
            return new g.BitmapFont({
                src: fontAsset,
                glyphInfo: glyphInfo,
            });
        };
        var createMissileBases = function (groungHeight, launcherLayer, backLayer, smokeLayer, missileBaseLayer, rebuildLayer) {
            var missilBases = [];
            var posX = [0.15, 0.5, 0.85];
            var baseAsset = _this.asset.getImageById("missile_base");
            var _loop_1 = function (i) {
                var bx = g.game.width * posX[i];
                var by = g.game.height - groungHeight - baseAsset.height * 0.1;
                var background = new missileBaseBackground_1.MissileBaseBackground(_this, bx, by);
                backLayer.append(background);
                var destroyed = new destroyedMissileBase_1.DestroyedMissileBase(_this, bx, by, background);
                destroyed.onSmoke.add(function (base) { return smokeLayer.append(new fireSmoke_1.FireSmoke(_this, base.x, base.y)); });
                missileBaseLayer.append(destroyed);
                var launcher = new missileLauncher_1.MissileLauncher(_this, baseAsset, bx, by);
                launcherLayer.append(launcher);
                var missileBase = new missileBase_1.MissileBase(_this, bx, by, launcher);
                missileBase.onRebuild.add(function (_base) {
                    var rebuild = new rebuild_1.Rebuild(_this, _base);
                    rebuild.onRebuilded.addOnce(function () {
                        destroyed.hide();
                        _base.show();
                    });
                    rebuildLayer.append(new rebuild_1.Rebuild(_this, _base));
                });
                missileBase.onDestroyed.add(function (_base) {
                    destroyed.show();
                });
                missilBases.push(missileBase);
                missileBaseLayer.append(missileBase);
            };
            for (var i = 0; i < player_1.Player.BASE_NUMBER; i++) {
                _loop_1(i);
            }
            return missilBases;
        };
        var loadHandler = function () {
            var bitmapFont = createBitmapFont16_1();
            if (existsBackground) {
                var bg = new g.FilledRect({
                    scene: _this,
                    width: g.game.width,
                    height: g.game.height,
                    cssColor: "black",
                    opacity: 1,
                });
                _this.append(bg);
            }
            for (var i = 0; i < 64; i++)
                _this.append(new star_1.Star(_this));
            var groundAsset = _this.asset.getImageById("ground");
            var ground = new g.Sprite({
                scene: _this,
                src: groundAsset,
                y: g.game.height - groundAsset.height,
            });
            var horizonAsset = _this.asset.getImageById("horizon");
            var horizon = new g.Sprite({
                scene: _this,
                src: horizonAsset,
                y: g.game.height - ground.height - horizonAsset.height,
            });
            _this.append(horizon);
            var blinking = new blinking_1.Blinking(_this);
            _this.append(blinking);
            var backLayer = new g.E({ scene: _this });
            var smokeLayer = new g.E({ scene: _this });
            var invaderLayer = new g.E({ scene: _this });
            var missileLayer = new g.E({ scene: _this });
            var explosionLayer = new g.E({ scene: _this });
            _this.append(backLayer);
            _this.append(smokeLayer);
            _this.append(invaderLayer);
            _this.append(missileLayer);
            _this.append(explosionLayer);
            var missileBaseLayer = new g.E({ scene: _this });
            var launcherLayer = new g.E({ scene: _this });
            var rebuildLayer = new g.E({ scene: _this });
            _this.append(missileBaseLayer);
            _this.append(rebuildLayer);
            var missilBases = createMissileBases(ground.height, launcherLayer, backLayer, smokeLayer, missileBaseLayer, rebuildLayer);
            var player = new player_1.Player(missilBases);
            player.onReload.add(function (props) {
                _this.setTimeout(function () {
                    props.base.reload(1);
                    _this.asset.getAudioById("se_reload").play();
                }, props.duration);
            });
            player.onFinishReload.add(function (duration) {
                _this.setTimeout(function () {
                    if (ticker === null || ticker === void 0 ? void 0 : ticker.isTimeOver())
                        return;
                    startWave();
                }, duration);
            });
            player.onExplodeBase.add(function (base) {
                var count = 10;
                var _loop_2 = function (i) {
                    _this.setTimeout(function () {
                        var sx = base.x + (g.game.random.generate() * 2 - 1) * base.width / 2;
                        var sy = base.y - g.game.random.generate() * base.height / 2;
                        var shockWave = new InvaderShockWave_1.InvaderShockWave(_this, { x: sx, y: sy }, existsBackground, undefined, 0.5);
                        if (i === count - 1) {
                            shockWave.onSpread.addOnce(function (_shockWave) {
                                base.disableLauncher();
                                base.hide();
                                base.onDestroyed.fire(base);
                            });
                        }
                        shockWaveLayer.append(shockWave);
                        var ex = base.x + (g.game.random.generate() * 2 - 1) * base.width / 2;
                        var ey = base.y - g.game.random.generate() * base.height / 2;
                        var explosion = new explosion_1.Explosion(_this, { x: ex, y: ey }, 1, 2000 / g.game.fps);
                        shockWaveLayer.append(explosion);
                    }, 200 * i);
                };
                for (var i = 0; i < count; i++) {
                    _loop_2(i);
                }
            });
            var shockWaveLayer = new g.E({ scene: _this });
            _this.append(shockWaveLayer);
            _this.append(ground);
            _this.append(launcherLayer);
            var wave = new wave_1.Wave(_this, bitmapFont);
            _this.append(wave);
            var ticker = new ticker_1.Ticker(_this, bitmapFont, timeLimit);
            ticker.onCountdown.add(function () { return blinking.blink(); });
            ticker.onFinish.addOnce(function () { return finishGame(); });
            _this.append(ticker);
            var scoreLabel = new scorer_1.Scorer(_this, bitmapFont);
            _this.append(scoreLabel);
            var canFire = false;
            _this.onPointDownCapture.add(function (e) {
                if (!canFire || e.point.y >= ground.y)
                    return;
                launchMissile(e.point, ticker.isTimeOver() || isDebug);
            });
            var turnInvader = true;
            var totalInvaderCount = 0;
            var goneInvaderCount = 0;
            var destroyObjectCount = 0;
            _this.asset.getAudioById("se_start").play();
            var gameStart = new notificationLabel_1.NotificationLabel(_this, bitmapFont, "START!");
            gameStart.onFinish.addOnce(function () {
                _this.asset.getAudioById("bgm").play();
                ticker.start();
                startWave();
            });
            _this.append(gameStart);
            var init = function () {
                canFire = true;
                turnInvader = false;
                totalInvaderCount = 0;
                goneInvaderCount = 0;
                destroyObjectCount = 0;
            };
            var startWave = function () {
                init();
                wave.next();
                if (wave.times > 1) {
                    var waveStartLabel = new notificationLabel_1.NotificationLabel(_this, bitmapFont, "WAVE ".concat(wave.times));
                    waveStartLabel.onPeak.addOnce(function () {
                        if (ticker.isTimeOver())
                            return;
                        invade();
                    });
                    _this.append(waveStartLabel);
                }
                else {
                    invade();
                }
            };
            var finishWave = function () {
                _this.setTimeout(function () {
                    if (ticker.isTimeOver())
                        return;
                    canFire = false;
                    var duration = _this.asset.getAudioById("se_reload").duration;
                    var completedWave = new notificationLabel_1.NotificationLabel(_this, bitmapFont, "WAVE ".concat(wave.times, " COMPLETED"));
                    completedWave.onFinish.addOnce(function () {
                        if (ticker.isTimeOver())
                            return;
                        if (player.rebuild()) {
                            var seBuild = _this.asset.getAudioById("se_rebuild");
                            seBuild.play();
                            _this.setTimeout(function () {
                                player.reload(duration);
                            }, seBuild.duration);
                            return;
                        }
                        player.reload(duration);
                    });
                    _this.append(completedWave);
                }, 500);
            };
            var finishGame = function () {
                canFire = false;
                if (_this.onUpdate.contains(updateHandler)) {
                    _this.onUpdate.remove(updateHandler);
                }
                var invaders = invaderLayer.children;
                if (invaders) {
                    for (var i = invaders.length - 1; i >= 0; i--) {
                        var invader = invaders[i];
                        if ((invader instanceof meteor_1.Meteor) || (invader instanceof ufoBullet_1.UFOBullet)) {
                            invader.deactivate();
                            invader === null || invader === void 0 ? void 0 : invader.destroy();
                            explosionLayer.append(new explosion_1.Explosion(_this, invader, 2, 1000 / g.game.fps * 2));
                        }
                        else if (invader instanceof ufo_1.UFO) {
                            invader.deactivate();
                        }
                    }
                }
                _this.asset.getAudioById("bgm").stop();
                _this.setTimeout(function () {
                    _this.children.forEach(function (entity) {
                        if (entity instanceof notificationLabel_1.NotificationLabel)
                            entity.hide();
                    });
                    var finishLabel = new finishLabel_1.FinishLabel(_this, bitmapFont, "FINISH!");
                    _this.append(finishLabel);
                    _this.asset.getAudioById("se_finish").play();
                    _this.setTimeout(function () {
                        player.rebuild();
                        player.reloadAll();
                        canFire = true;
                        _this.append(createRetryButton(finishLabel));
                    }, 1000);
                }, 1000);
            };
            var createRetryButton = function (label) {
                var button = new button_1.Button(_this, bitmapFont, "RETRY");
                button.x = g.game.width / 2;
                button.y = label.y + label.height * 4;
                button.onClicked.addOnce(function () {
                    g.game.vars.gameState.score = 0;
                    var titleTimeLimit = 7;
                    var gameTimeLimit = 99;
                    var titleScene = new titleScene_1.TitleScene(titleTimeLimit);
                    titleScene.onFinish.add(function (props) {
                        if (props.muteBGM)
                            g.game.audio.music.volume = 0;
                        if (props.muteSE)
                            g.game.audio.sound.volume = 0;
                        var gameScene = new GameScene(random, gameTimeLimit, props.background, isDebug);
                        g.game.replaceScene(gameScene);
                    });
                    g.game.pushScene(titleScene);
                });
                return button;
            };
            var meteorPeriod = g.game.fps * 5;
            var ufoPeriod = g.game.fps * 4;
            var attckMeteorTimes;
            var attckUFOTimes;
            var meteorCount;
            var frame;
            var invade = function () {
                attckMeteorTimes = Math.floor(wave.times / 3) + 2; //5
                attckUFOTimes = Math.floor(wave.times / 3) + 1; //10
                meteorCount = Math.floor(wave.times / 3) * 2 + 5; //3
                frame = 0;
                turnInvader = true;
                _this.onUpdate.add(updateHandler);
            };
            var updateHandler = function () {
                if (!ticker.isTimeOver()) {
                    if (frame % meteorPeriod === 0) {
                        //console.log(`frame=${frame} ,meteorPeriod=${meteorPeriod}`);
                        attckMeteorTimes--;
                        for (var j = 0; j < meteorCount; j++) {
                            var start = { x: random.generate() * g.game.width, y: 0 };
                            var target = chooseTarget();
                            invaderLayer.append(createMeteor(start, target, wave.times));
                        }
                    }
                    frame++;
                    if (attckUFOTimes > 0 && frame % ufoPeriod === 0) {
                        attckUFOTimes--;
                        var ufo = createUFO();
                        invaderLayer.append(ufo);
                        _this.asset.getAudioById("se_ufo").play();
                    }
                }
                if (ticker.isTimeOver() || attckMeteorTimes <= 0) {
                    turnInvader = false;
                    if (_this.onUpdate.contains(updateHandler)) {
                        _this.onUpdate.remove(updateHandler);
                    }
                }
            };
            var createUFO = function () {
                totalInvaderCount++;
                var ufo = new ufo_1.UFO(_this, random, wave.times);
                ufo.onFire.add(function (ufo) {
                    totalInvaderCount++;
                    var start = { x: ufo.x, y: ufo.y };
                    var target = chooseTarget();
                    var bullet = new ufoBullet_1.UFOBullet(_this, start, target, wave.times);
                    bullet.onFalling.add(function (bullet) { return falling(bullet); });
                    bullet.onDestroy.addOnce(function (props) { return explode(props); });
                    invaderLayer.append(bullet);
                });
                ufo.onGone.addOnce(function () { return goneInvader(); });
                ufo.onDestroy.addOnce(function (props) {
                    explode(props);
                    explosionLayer.append(new destroyedUfo_1.DestroyedUFO(_this, ufo));
                });
                return ufo;
            };
            var chooseTarget = function (invader) {
                if (!invader) {
                    if (random.generate() > 0.25) {
                        return { x: random.generate() * g.game.width, y: ground.y };
                    }
                    return player.pickBaseRandomly(random);
                }
                if (random.generate() > 0.25) {
                    var times = 9;
                    while (times-- > 0) {
                        var x = random.generate() * g.game.width;
                        var y = ground.y;
                        var radian = Math.atan2(y - invader.y, x - invader.x);
                        var angle = radian * (180 / Math.PI) + 90;
                        if (Math.abs(invader.angle - angle) >= 30) {
                            return { x: x, y: y };
                        }
                    }
                }
                return player.pickBaseRandomly(random, invader instanceof meteor_1.Meteor ? invader.targetBase : undefined);
            };
            var createMeteor = function (start, target, waveTimes, crackCount) {
                if (crackCount === void 0) { crackCount = meteor_1.Meteor.MAX_CRACK_COUNT; }
                totalInvaderCount++;
                var meteor = new meteor_1.Meteor(_this, random, start, target, waveTimes, crackCount);
                meteor.onFalling.add(function (meteor) { return falling(meteor); });
                meteor.onSmoke.add(function (meteor) { return smokeLayer.append(new smoke_1.Smoke(_this, meteor)); });
                meteor.onCracked.add(function (meteor) { return cracked(meteor); });
                meteor.onDestroy.addOnce(function (props) { return explode(props); });
                return meteor;
            };
            var falling = function (invader) {
                if (invader.y >= ground.y) {
                    invader.y = ground.y;
                    invader.deactivate();
                    createShockWave(invader);
                    return;
                }
                if (invader.y + invader.getRadius() >= ground.y - player.getMissileBaseHeight()) {
                    if (!player.isCollide(invader))
                        return;
                    invader.deactivate();
                    createShockWave(invader);
                    _this.asset.getAudioById("se_destroy").play();
                }
            };
            var cracked = function (meteor) {
                var target = chooseTarget(meteor);
                invaderLayer.append(createMeteor(meteor, target, meteor.waveTimes, meteor.crackCount));
            };
            var explode = function (props) {
                destroyObjectCount++;
                var shockWave = createShockWave(props.invader, props.combo);
                shockWave.onSpread.add(function (shockWave) { return spreadShockWave(shockWave); });
            };
            var createShockWave = function (invader, combo) {
                explosionLayer.append(new explosion_1.Explosion(_this, invader));
                var shockWave = new InvaderShockWave_1.InvaderShockWave(_this, invader, existsBackground, combo);
                shockWaveLayer.append(shockWave);
                invader.destroy();
                goneInvader();
                return shockWave;
            };
            var goneInvader = function () {
                goneInvaderCount++;
                if (!turnInvader && goneInvaderCount === totalInvaderCount) {
                    finishWave();
                }
            };
            var launchMissile = function (target, isUnlimited) {
                var pos = player.fire(target, isUnlimited);
                if (!pos)
                    return;
                var sight = new sight_1.Sight(_this, target);
                _this.append(sight);
                var missile = new missile_1.Missile(_this, pos, target, player.speed);
                missile.onFlying.add(function (missile) {
                    var entities = invaderLayer.children;
                    if (!entities || entities.length === 0)
                        return;
                    for (var i = 0; i < entities.length; i++) {
                        var entity = entities[i];
                        if ((entity instanceof invader_1.Invader) && collider_1.Collider.within(missile, entities[i])) {
                            missile.strike();
                            explodeMissile(missile, sight, entity);
                            _this.asset.getAudioById("se_strike").play();
                            return;
                        }
                    }
                });
                missile.onSmoke.add(function (missile) { return smokeLayer.append(new smoke_1.Smoke(_this, missile)); });
                missile.onReachTarget.addOnce(function (missile) { explodeMissile(missile, sight); });
                missileLayer.append(missile);
                _this.asset.getAudioById("se_fire").play();
            };
            var explodeMissile = function (missile, sight, invader) {
                var shockWave = new playerShockWave_1.PlayerShockWave(_this, missile, existsBackground, missile.isStrike, player.power, new combo_1.Combo());
                shockWave.onSpread.add(function (shockWave) { return spreadShockWave(shockWave); });
                shockWaveLayer.append(shockWave);
                smokeLayer.append(new smoke_1.Smoke(_this, missile));
                explosionLayer.append(new explosion_1.Explosion(_this, missile));
                if (missile.isStrike && invader) {
                    destroyInvader(invader, shockWave);
                }
                missile.destroy();
                sight.destroy();
            };
            var spreadShockWave = function (shockWave) {
                var _a;
                (_a = invaderLayer.children) === null || _a === void 0 ? void 0 : _a.forEach(function (invader) {
                    if ((invader instanceof invader_1.Invader) && collider_1.Collider.within(shockWave, invader)) {
                        destroyInvader(invader, shockWave);
                        return;
                    }
                });
            };
            var currentAge = 0;
            var destroyInvader = function (invader, shockWave) {
                if (g.game.age - currentAge >= 1) {
                    _this.asset.getAudioById("se_destroy").play();
                    currentAge = g.game.age;
                }
                invader._destroy(shockWave.combo);
                var score = scorer_1.Scorer.DEFAULT_SCORE * (1 << shockWave.combo.count);
                var strikeBonus = 1; //isFirstStrik ? 10 : 1;
                scoreLabel.add(score * strikeBonus);
                showScore(invader.x, invader.y, score * strikeBonus, shockWave.combo.count);
                shockWave.combo.increment();
                if (invader instanceof ufo_1.UFO) {
                    _this.asset.getAudioById("se_powerup").play();
                    player.upgrade();
                }
            };
            var showScore = function (x, y, score, combo) {
                var label = new g.Label({
                    scene: _this,
                    text: score.toString(),
                    fontSize: 16,
                    font: bitmapFont,
                    anchorX: 0.5,
                    anchorY: 0.5,
                    x: x,
                    y: y,
                });
                var rate = combo / combo_1.Combo.MAX_COMBO;
                var updateHandler = function () {
                    if (rate <= 0.01) {
                        label.onUpdate.remove(updateHandler);
                        return;
                    }
                    label.y -= (label.height / 2) * rate;
                    rate *= 0.7;
                    label.modified();
                };
                label.onUpdate.add(updateHandler);
                _this.append(label);
                _this.setTimeout(function () { return label.destroy(); }, 1500);
            };
        };
        return _this;
    }
    return GameScene;
}(g.Scene));
exports.GameScene = GameScene;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}