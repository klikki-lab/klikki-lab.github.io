window.gLocalAssetContainer["keyEvent"] = function(g) { (function(exports, require, module, __filename, __dirname) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyEvent = void 0;
var KeyEvent = /** @class */ (function () {
    function KeyEvent() {
        var _this = this;
        this.onKeyDown = new g.Trigger();
        this.isKeyDown = false;
        this.addListener = function () {
            if (typeof window !== "undefined") {
                window.addEventListener('keydown', _this.keyDown);
                window.addEventListener('keyup', _this.keyUp);
            }
        };
        this.removeListener = function () {
            if (typeof window !== "undefined") {
                window.removeEventListener('keydown', _this.keyDown);
                window.removeEventListener('keyup', _this.keyUp);
            }
        };
        this.keyDown = function (ev) {
            if (ev.key === "z" || ev.key === "Z") {
                if (_this.isKeyDown)
                    return;
                _this.isKeyDown = true;
                _this.onKeyDown.fire();
            }
        };
        this.keyUp = function (ev) {
            if (ev.key === "z" || ev.key === "Z") {
                _this.isKeyDown = false;
            }
        };
    }
    return KeyEvent;
}());
exports.KeyEvent = KeyEvent;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}