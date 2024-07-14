window.gLocalAssetContainer["audioController"] = function(g) { (function(exports, require, module, __filename, __dirname) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudioController = void 0;
var AudioController = /** @class */ (function () {
    function AudioController(asset, musicVolume, soundVolume) {
        var _this = this;
        this.musicList = [];
        this.seList = [];
        this.musicVolume = 1;
        this.soundVolume = 1;
        this.addBGM = function (assetIds) {
            assetIds.forEach(function (assetId) { return _this.musicList.push(_this.asset.getAudioById(assetId)); });
        };
        this.playMusic = function (index) {
            if (index === void 0) { index = 0; }
            var player = _this.musicList[index].play();
            player.changeVolume(_this.musicVolume);
            return player;
        };
        this.stopMusic = function (index) {
            if (index === void 0) { index = 0; }
            return _this.musicList[index].stop();
        };
        this.addSE = function (params) {
            params.forEach(function (param) {
                var _a;
                var interval = (_a = param.interval) !== null && _a !== void 0 ? _a : AudioController.DEFAULT_SE_INTERVAL;
                var se = {
                    audio: _this.asset.getAudioById(param.assetId),
                    volume: _this.soundVolume * (param.volumeRate ? param.volumeRate : 1),
                    interval: Math.max(0, interval),
                    age: g.game.age,
                };
                _this.seList.push(se);
            });
        };
        this.playSE = function (index) {
            if (index === void 0) { index = 0; }
            var se = _this.seList[index];
            if (se.interval) {
                if (g.game.age - se.age < se.interval) {
                    return undefined;
                }
                se.age = g.game.age;
            }
            var player = se.audio.play();
            player.changeVolume(se.volume);
            return player;
        };
        this.asset = asset;
        this.musicVolume = musicVolume;
        this.soundVolume = soundVolume;
    }
    AudioController.DEFAULT_SE_INTERVAL = 2;
    return AudioController;
}());
exports.AudioController = AudioController;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}