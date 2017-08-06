"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var KerryLogistic = function () {
    function KerryLogistic(price) {
        _classCallCheck(this, KerryLogistic);

        this.PRICE_UPCOUNTRY = [45, 80, 100, 115, 155, 205, 330, 420];
        this.PRICE_URBAN = [30, 65, 85, 100, 140, 185, 290, 380];

        if (!price) {
            price = this.PRICE_URBAN;
        }

        this.price_steps = price;
    }

    _createClass(KerryLogistic, [{
        key: "_getPerim",
        value: function _getPerim(width, height, length, q) {
            return Number(q) * height + length + width;
        }
    }, {
        key: "_pricify",
        value: function _pricify(perim, w) {
            var steps = this.price_steps;
            if (perim <= 40 && w <= 1) {
                return steps[0];
            } else if (perim <= 60 && w <= 5) {
                return steps[1];
            } else if (perim <= 75 && w <= 5) {
                return steps[2];
            } else if (perim <= 90 && w <= 10) {
                return steps[3];
            } else if (perim <= 105 && w <= 15) {
                return steps[4];
            } else if (perim <= 120 && w <= 15) {
                return steps[5];
            } else if (perim <= 150 && w <= 20) {
                return steps[6];
            } else if (perim <= 200 && w <= 25) {
                return steps[7];
            } else {
                return -1;
            }
        }
    }, {
        key: "getCostFunction",
        value: function getCostFunction() {
            var _ = this;
            /*
             *  (w) - total weight
             *  (cart) - cart list 
             */
            return function (cart) {
                //w is total weight
                var w = cart.map(function (c) {
                    return Number(c.sku.weight) * Number(c.quantity);
                }).reduce(function (p, c) {
                    return p + c;
                }, 0);
                console.log("Weight", w, "kg");
                //f is the factor for how many box to split
                var f = 1;
                var breakdown = {};
                var total = cart.reduce(function (p, c) {
                    if (!c.sku.weighted) {
                        return p;
                    }
                    var perim_cm = _._getPerim(c.sku.kdw_mm, c.sku.kdh_mm, c.sku.kdl_mm, c.quantity) / 10;
                    var pf = _._pricify(perim_cm);

                    //breakdown into smaller boxes
                    while (pf === -1) {
                        //try until package is divisible (condition is price is valid)
                        perim_cm = _._getPerim(c.sku.kdw_mm, c.sku.kdh_mm, c.sku.kdl_mm, Number(c.quantity) / parseFloat(f)) / 10;
                        pf = _._pricify(perim_cm, w / parseFloat(f));
                        if (f > 10000) {
                            console.log("No Solution", f);
                            return;
                        }
                        f++;
                    }

                    breakdown = {
                        pricePerPack: pf,
                        totalPacks: f - 1,
                        perimeterPerPack: perim_cm.toFixed(2),
                        WeightPerPack: (w / parseFloat(f)).toFixed(2)
                    };

                    return p + pf * (f - 1);
                }, 0);

                return {
                    total: total,
                    breakdown: breakdown
                };
            };
        }
    }]);

    return KerryLogistic;
}();

/*
 *
 * Steps is the KERRY pricing step
 */


module.exports = KerryLogistic;