window.gLocalAssetContainer["collider"] = function(g) { (function(exports, require, module, __filename, __dirname) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collider = void 0;
var Collider;
(function (Collider) {
    function within(e1, e2, distanceRate1, distanceRate2) {
        if (distanceRate1 === void 0) { distanceRate1 = 0.5; }
        if (distanceRate2 === void 0) { distanceRate2 = 0.5; }
        var x = e2.x - e1.x;
        var y = e2.y - e1.y;
        var r = e2.width * e2.scaleX * distanceRate2 + e1.width * e1.scaleX * distanceRate1;
        return x * x + y * y < r * r;
    }
    Collider.within = within;
    ;
})(Collider = exports.Collider || (exports.Collider = {}));

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}