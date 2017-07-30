KL = require('./KerryLogistic');
TPN = require('./TPNormalLogistic');

m = {
    'title': 'A EarthBox',
    'avatar': 'A',
    'price': 2.9,
    'pretaxPrice': 2.71,
    weighted: true,
    weight: 0.0630,
    kdw_mm: 338,
    kdh_mm: 7.0,
    kdl_mm: 208
}
cart = [{
    quantity: 500,
    sku: m
}]

cfun = KL.getCostFunction();
cfun2 = TPN.getCostFunction();

kerr_solution = cfun(cart);
tpn_solution = cfun2(cart);

console.log("KERRY", kerr_solution);
console.log("TPNORM", tpn_solution);