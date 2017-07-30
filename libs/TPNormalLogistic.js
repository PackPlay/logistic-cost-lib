class TPNormalLogistic {
    _calculate(weight) {
        let w = weight;

        if (weight < 1) w = 1;
        return 20.0 + ((w - 1) * 15.0)
    }

    getCostFunction() {
        //w = weight
        let _ = this;
        return function (cart) {

            //w is total weight
            let w = cart.map(function (c) {
                return Number(c.sku.weight) * Number(c.quantity)
            }).reduce(function (p, c) {
                return p + c
            }, 0);

            let rem = w % 20;
            let C = Math.floor(w / 20);

            //result in `C` number of box of 20 kg + 1 number of box of `rem` kg
            let breakdown = {
                totalPacks: C + 1,
                lastPackWeightKg: rem
            };

            let price = _._calculate(w);

            // console.log(C*_._calculate(20))
            if (w >= 20) {
                price = C * _._calculate(20) + _._calculate(rem);
            }


            return {
                total: price,
                breakdown: breakdown
            }
        }
    }
}

module.exports = new TPNormalLogistic();