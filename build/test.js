'use strict';

var KerryLogistic = require('./KerryLogistic');
var TPLogistic = require('./TPLogistic');

var m = {
    price: 2.9,
    pretaxPrice: 2.71,
    weighted: true,
    weight: 0.0630,
    kdw_mm: 338,
    kdh_mm: 7.0,
    kdl_mm: 208
};

var cart = [{
    quantity: 500,
    sku: m
}];

var KL = new KerryLogistic();
var TPN = new TPLogistic();
var TPN_EMS = new TPLogistic(true);

var cfun = KL.getCostFunction();
var cfun2 = TPN.getCostFunction();
var cfun3 = TPN_EMS.getCostFunction();

kerr_solution = cfun(cart);
tpn_solution = cfun2(cart);
tpne_solution = cfun3(cart);

console.log("KERRY", kerr_solution);
console.log("TPNORM", tpn_solution);
console.log("TPEMS", tpne_solution);