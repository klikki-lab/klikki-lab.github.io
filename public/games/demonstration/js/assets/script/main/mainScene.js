window.gLocalAssetContainer["mainScene"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.MainScene = void 0;
var fontSize_1 = require("./fontSize");
var entity_1 = require("./entity");
var seekBar_1 = require("./seekBar");
var MainScene = /** @class */ (function (_super) {
    __extends(MainScene, _super);
    function MainScene(param) {
        var _this = _super.call(this, { game: g.game }) || this;
        var snapshot = param.snapshot || {};
        _this.setInterval(function () {
            g.game.raiseEvent(new g.MessageEvent({ type: "SNAPSHOT" }));
        }, 1000 * 60);
        _this.onMessage.add(function (ev) {
            var _a;
            if (0x02 !== ev.eventFlags)
                return;
            if (((_a = ev.data) === null || _a === void 0 ? void 0 : _a.type) === "SNAPSHOT") {
                g.game.requestSaveSnapshot(function () {
                    var snapshot = {
                        speed: _this.speedSeekbar.value,
                        scale: _this.scaleSeekbar.value,
                        objectCount: _this.objectCountSeekbar.value,
                        opacity: _this.opacitySeekbar.value,
                        bgOpacity: _this.bgOopacitySeekbar.value,
                    };
                    return { snapshot: snapshot };
                });
            }
        });
        _this.onLoad.add(function (_scene) {
            var _a, _b, _c, _d, _e, _f;
            var bg = new g.FilledRect({
                scene: _scene,
                width: g.game.width,
                height: g.game.height,
                cssColor: "black",
                opacity: (_a = snapshot.bgOpacity) !== null && _a !== void 0 ? _a : 1,
            });
            _this.append(bg);
            var font = new g.DynamicFont({
                game: g.game,
                fontFamily: "sans-serif",
                fontWeight: "bold",
                strokeWidth: fontSize_1.FontSize.MEDIUM / 4,
                strokeColor: "black",
                fontColor: "white",
                size: fontSize_1.FontSize.MEDIUM,
            });
            var versionLabel = new g.Label({
                scene: _this,
                text: "Version ".concat(g.game.vars.version),
                font: font,
                fontSize: fontSize_1.FontSize.SMALL,
            });
            versionLabel.x = g.game.width - versionLabel.width - fontSize_1.FontSize.SMALL * .5;
            versionLabel.y = g.game.height - versionLabel.height - fontSize_1.FontSize.SMALL * .5;
            _this.append(versionLabel);
            _this.fpsLabel = new g.Label({
                scene: _this,
                text: "FPS ".concat(g.game.fps.toFixed(2)),
                font: font,
                fontSize: fontSize_1.FontSize.SMALL,
                local: true,
            });
            _this.fpsLabel.x = versionLabel.x - _this.fpsLabel.width - fontSize_1.FontSize.SMALL * 4;
            _this.fpsLabel.y = versionLabel.y;
            _this.append(_this.fpsLabel);
            var seekBarWidth = 160;
            var seekBarHeight = 32;
            var speedLabel = new g.Label({
                scene: _this,
                text: "速さ",
                font: font,
                x: g.game.width - seekBarWidth * 1.25,
                y: seekBarHeight * 4,
            });
            _this.append(speedLabel);
            _this.speedSeekbar = new seekBar_1.SeekBar(_this, seekBarWidth, seekBarHeight);
            _this.speedSeekbar.min = 1;
            _this.speedSeekbar.max = 100;
            _this.speedSeekbar.value = (_b = snapshot.speed) !== null && _b !== void 0 ? _b : 1;
            _this.speedSeekbar.x = speedLabel.x;
            _this.speedSeekbar.y = speedLabel.y + speedLabel.height + seekBarHeight * 0.5;
            _this.speedSeekbar.onChanged.add(function (value) { speed = value; });
            speed = _this.speedSeekbar.value;
            _this.append(_this.speedSeekbar);
            var scaleLabel = new g.Label({
                scene: _this,
                text: "大きさ",
                font: font,
                x: speedLabel.x,
                y: _this.speedSeekbar.y + _this.speedSeekbar.height * 2,
            });
            _this.append(scaleLabel);
            _this.scaleSeekbar = new seekBar_1.SeekBar(_this, seekBarWidth, seekBarHeight);
            _this.scaleSeekbar.max = 2;
            _this.scaleSeekbar.min = 0.05;
            _this.scaleSeekbar.value = (_c = snapshot.scale) !== null && _c !== void 0 ? _c : .05;
            _this.scaleSeekbar.x = scaleLabel.x;
            _this.scaleSeekbar.y = scaleLabel.y + scaleLabel.height + seekBarHeight * 0.5;
            _this.scaleSeekbar.onChanged.add(function (value) {
                scale = value;
                radius = calcRadius(value);
            });
            scale = _this.scaleSeekbar.value;
            radius = calcRadius(_this.scaleSeekbar.value);
            _this.append(_this.scaleSeekbar);
            var objectCountLabel = new g.Label({
                scene: _this,
                text: "オブジェクト数",
                font: font,
                x: scaleLabel.x,
                y: _this.scaleSeekbar.y + _this.scaleSeekbar.height * 2,
            });
            _this.append(objectCountLabel);
            _this.objectCountSeekbar = new seekBar_1.SeekBar(_this, seekBarWidth, seekBarHeight);
            _this.objectCountSeekbar.max = MainScene.MAX_OBJECT_COUNT;
            _this.objectCountSeekbar.min = 1;
            _this.objectCountSeekbar.value = (_d = snapshot.objectCount) !== null && _d !== void 0 ? _d : 1;
            _this.objectCountSeekbar.x = objectCountLabel.x;
            _this.objectCountSeekbar.y = objectCountLabel.y + objectCountLabel.height + seekBarHeight * 0.5;
            _this.objectCountSeekbar.onTrackingEnd.add(function (value) {
                var count = Math.floor(value * MainScene.MIN_OBJECT_SIZE);
                if (count === objectCount)
                    return;
                objectCount = count;
                _this.objects.children.forEach(function (e, i) {
                    if (count > i) {
                        e.show();
                    }
                    else {
                        e.hide();
                    }
                });
            });
            objectCount = Math.floor(_this.objectCountSeekbar.value * MainScene.MIN_OBJECT_SIZE);
            _this.append(_this.objectCountSeekbar);
            var opacityLabel = new g.Label({
                scene: _this,
                text: "オブジェクト透過率",
                font: font,
                x: scaleLabel.x,
                y: _this.objectCountSeekbar.y + _this.objectCountSeekbar.height * 2,
            });
            _this.append(opacityLabel);
            _this.opacitySeekbar = new seekBar_1.SeekBar(_this, seekBarWidth, seekBarHeight);
            _this.opacitySeekbar.min = 0.05;
            _this.opacitySeekbar.value = (_e = snapshot.opacity) !== null && _e !== void 0 ? _e : 1;
            _this.opacitySeekbar.x = opacityLabel.x;
            _this.opacitySeekbar.y = opacityLabel.y + opacityLabel.height + seekBarHeight * 0.5;
            _this.opacitySeekbar.onChanged.add(function (value) { opacity = value; });
            opacity = _this.opacitySeekbar.value;
            _this.append(_this.opacitySeekbar);
            var bgOpacityLabel = new g.Label({
                scene: _this,
                text: "背景透過率",
                font: font,
                x: scaleLabel.x,
                y: _this.opacitySeekbar.y + _this.opacitySeekbar.height * 2,
            });
            _this.append(bgOpacityLabel);
            _this.bgOopacitySeekbar = new seekBar_1.SeekBar(_this, seekBarWidth, seekBarHeight);
            _this.bgOopacitySeekbar.value = (_f = snapshot.bgOpacity) !== null && _f !== void 0 ? _f : bg.opacity;
            _this.bgOopacitySeekbar.x = bgOpacityLabel.x;
            _this.bgOopacitySeekbar.y = bgOpacityLabel.y + bgOpacityLabel.height + seekBarHeight * 0.5;
            _this.bgOopacitySeekbar.onChanged.add(function (value) { bg.opacity = value; });
            _this.append(_this.bgOopacitySeekbar);
            _this.objects = new g.E({ scene: _this });
            _this.append(_this.objects);
            createObjects(_this.scaleSeekbar.value, _this.opacitySeekbar.value);
        });
        var createObjects = function (objectSize, objectOpacity) {
            var size = MainScene.MAX_OBJECT_COUNT * MainScene.MIN_OBJECT_SIZE;
            for (var i = 0; i < size; i++) {
                var e = new entity_1.Entity(_this);
                e.scale(objectSize);
                e.opacity = objectOpacity;
                if (i >= objectCount) {
                    e.hide();
                }
                _this.objects.append(e);
            }
        };
        var t = 0;
        var objectCount = 0;
        var scale = 0;
        var radius = 0;
        var speed = 0;
        var opacity = 0;
        var PI2 = Math.PI * 2;
        var centerX = g.game.width / 2;
        var centerY = g.game.height / 2;
        var updateHandler = function () {
            t = Math.sin(g.game.age / (g.game.fps * (1000 / speed)));
            for (var i = 0; i < objectCount; i++) {
                var e = _this.objects.children[i];
                var r = Math.cos(PI2 * t * i);
                var x = Math.sin(i / objectCount * PI2) * r * radius;
                var y = Math.cos(i / objectCount * PI2) * r * radius;
                e.x = centerX + x;
                e.y = centerY + y;
                e.scale(scale);
                e.opacity = opacity;
                var rate = Math.max(Math.abs(x), Math.abs(y)) / centerY;
                if (e instanceof entity_1.Entity) {
                    e.cssColor = "".concat(generateGradientColor(rate, t));
                }
                e.angle += (60 / g.game.fps) * 30;
                e.angle %= 360;
                e.modified();
            }
        };
        _this.onUpdate.add(function (_) { return updateHandler(); });
        var frames = 0;
        var last = Date.now();
        _this.onUpdate.add(function (_) {
            frames++;
            var elapsed = Date.now() - last;
            if (frames >= g.game.fps && elapsed >= 1000) {
                var fps = (g.game.fps / elapsed) * 1000;
                _this.fpsLabel.text = "FPS ".concat(fps.toFixed(2));
                _this.fpsLabel.invalidate();
                frames = 0;
                last = Date.now();
            }
        });
        var calcRadius = function (value) {
            var k = 100000;
            var log = Math.log(k * value + 1) / Math.log(k + 1);
            return ((g.game.height - MainScene.OBJECT_SIZE) / 2) * log;
        };
        var generateGradientColor = function (value, t) {
            var time = t * PI2 * 8;
            var rRate = Math.sin(time);
            var gRate = Math.cos(time);
            var bRate = 1 - Math.sin(time);
            var base = 80;
            var offset = 175;
            var startColor = [base * rRate + offset, base * gRate + offset, base * bRate + offset];
            var endColor = [base * bRate + offset, base * gRate + offset, base * rRate + offset];
            var r = Math.round((1 - value) * startColor[0] + value * endColor[0]);
            var g = Math.round((1 - value) * startColor[1] + value * endColor[1]);
            var b = Math.round((1 - value) * startColor[2] + value * endColor[2]);
            return "rgb(".concat(r, ",").concat(g, ",").concat(b, ")");
        };
        return _this;
    }
    MainScene.MIN_OBJECT_SIZE = 32;
    MainScene.MAX_OBJECT_COUNT = 128;
    MainScene.OBJECT_SIZE = 8 * 4;
    return MainScene;
}(g.Scene));
exports.MainScene = MainScene;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}