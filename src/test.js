let KerryLogistic = require('./KerryLogistic');
let TPLogistic = require('./TPLogistic');

let m = {
    price: 2.9,
    pretaxPrice: 2.71,
    weighted: true,
    weight: 0.0630,
    kdw_mm: 338,
    kdh_mm: 7.0,
    kdl_mm: 208
}

let cart = [{
    quantity: 500,
    sku: m
}]

let KL = new KerryLogistic();
let TPN = new TPLogistic();
let TPN_EMS = new TPLogistic(true);

let cfun = KL.getCostFunction();
let cfun2 = TPN.getCostFunction();
let cfun3 = TPN_EMS.getCostFunction();

kerr_solution = cfun(cart);
tpn_solution = cfun2(cart);
tpne_solution = cfun3(cart);

console.log("KERRY", kerr_solution);
console.log("TPNORM", tpn_solution);
console.log("TPEMS", tpne_solution);