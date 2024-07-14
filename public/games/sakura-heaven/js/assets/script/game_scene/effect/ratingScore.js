window.gLocalAssetContainer["ratingScore"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.RatingScore = exports.withinTimingWindow = exports.Rating = void 0;
exports.Rating = {
    FAILED: {
        scoreRate: 0,
        timingWindow: {
            min: -15,
            max: 15,
        },
        assetId: {
            image: "",
            sound: "",
        }
    },
    BAD: {
        scoreRate: 0,
        timingWindow: {
            min: -5,
            max: 5,
        },
        assetId: {
            image: "img_bad",
            sound: "se_bad",
        }
    },
    GOOD: {
        scoreRate: 1,
        timingWindow: {
            min: -4,
            max: 4,
        },
        assetId: {
            image: "img_good",
            sound: "se_good",
        }
    },
    EXCELLENT: {
        scoreRate: 2,
        timingWindow: {
            min: -2,
            max: 2,
        },
        assetId: {
            image: "img_excellent",
            sound: "se_excellent",
        }
    },
    SEMI_PERFECT: {
        scoreRate: 3,
        timingWindow: {
            min: -1,
            max: 1,
        },
        assetId: {
            image: "img_perfect",
            sound: "se_perfect",
        }
    },
    PERFECT: {
        scoreRate: 3,
        timingWindow: {
            min: 0,
            max: 0,
        },
        assetId: {
            image: "img_perfect",
            sound: "se_perfect",
        }
    }
};
var withinTimingWindow = function (frame) {
    if (exports.Rating.PERFECT.timingWindow.min === frame) {
        return exports.Rating.PERFECT;
    }
    else if (exports.Rating.SEMI_PERFECT.timingWindow.min <= frame && exports.Rating.SEMI_PERFECT.timingWindow.max >= frame) {
        return exports.Rating.SEMI_PERFECT;
    }
    else if (exports.Rating.EXCELLENT.timingWindow.min <= frame && exports.Rating.EXCELLENT.timingWindow.max >= frame) {
        return exports.Rating.EXCELLENT;
    }
    else if (exports.Rating.GOOD.timingWindow.min <= frame && exports.Rating.GOOD.timingWindow.max >= frame) {
        return exports.Rating.GOOD;
    }
    return exports.Rating.BAD;
};
exports.withinTimingWindow = withinTimingWindow;
var RatingScore = /** @class */ (function (_super) {
    __extends(RatingScore, _super);
    function RatingScore(scene, area, rating) {
        var _this = _super.call(this, {
            scene: scene,
            src: scene.asset.getImageById(rating.assetId.image),
            anchorX: .5,
            anchorY: .5,
            x: area.x,
            y: area.y - area.height * .75,
        }) || this;
        _this._frame = 0;
        _this.updateHandler = function () {
            if (_this.scaleX >= 1) {
                _this.scaleX *= 0.9;
                _this.scaleY *= 0.9;
                if (_this.scaleX <= 1) {
                    _this.scale(1);
                }
                _this.modified();
            }
            if (_this._frame++ >= g.game.fps) {
                _this.destroy();
            }
        };
        _this.scale(1 + (rating.scoreRate / exports.Rating.PERFECT.scoreRate) * 1.5);
        _this.onUpdate.add(_this.updateHandler);
        return _this;
    }
    return RatingScore;
}(g.Sprite));
exports.RatingScore = RatingScore;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}