"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TPLogistic = function () {
    function TPLogistic() {
        var ems = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        _classCallCheck(this, TPLogistic);

        this.ems = ems;
    }

    _createClass(TPLogistic, [{
        key: "_calculate",
        value: function _calculate(weight) {
            if (this.ems) {
                var _w = weight;
                var w2 = _w * _w;
                var w3 = w2 * _w;
                var w4 = w3 * _w;
                var w5 = w4 * _w;
                var w6 = w5 * _w;
                var w7 = w6 * _w;
                return Math.ceil(-0.0003 * w5 + 0.0364 * w4 + -1.1985 * w3 + 13.9863 * w2 + -14.9023 * _w + 75.4768);
            }

            var w = weight;

            if (weight < 1) w = 1;
            return 20.0 + (w - 1) * 15.0;
        }
    }, {
        key: "getCostFunction",
        value: function getCostFunction() {
            //w = weight
            var _ = this;
            return function (cart) {

                //w is total weight
                var w = cart.map(function (c) {
                    return Number(c.sku.weight) * Number(c.quantity);
                }).reduce(function (p, c) {
                    return p + c;
                }, 0);

                var rem = w % 20;
                var C = Math.floor(w / 20);

                //result in `C` number of box of 20 kg + 1 number of box of `rem` kg
                var breakdown = {
                    totalPacks: C + 1,
                    lastPackWeightKg: rem
                };

                var price = _._calculate(w);

                // console.log(C*_._calculate(20))
                if (w >= 20) {
                    price = C * _._calculate(20) + _._calculate(rem);
                }

                return {
                    total: price,
                    breakdown: breakdown
                };
            };
        }
    }]);

    return TPLogistic;
}();

module.exports = TPLogistic;