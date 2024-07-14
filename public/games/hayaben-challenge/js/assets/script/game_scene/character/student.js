window.gLocalAssetContainer["student"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.Student = void 0;
var character_1 = require("./character");
var Student = /** @class */ (function (_super) {
    __extends(Student, _super);
    function Student(scene, asset) {
        var _this = _super.call(this, scene, asset) || this;
        _this.isListen = false;
        _this.frames = [0, 1];
        _this.frameNumber = 0;
        _this.interval = 1000 / 30 * 3;
        _this.loop = true;
        var write = function () {
            _this.isListen = false;
            _this.frameNumber = 0;
            _this.modified();
            _this.start();
        };
        var listen = function () {
            _this.isListen = true;
            _this.stop();
        };
        _this.onUpdate.add(function () {
            if (g.game.random.generate() < 1 / g.game.fps) {
                if (_this.isListen) {
                    write();
                }
                else {
                    listen();
                }
            }
        });
        return _this;
    }
    return Student;
}(character_1.Character));
exports.Student = Student;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}