# logistic-cost-lib
Library for calculating logistic cost

## Cart Structure
All libs take cart as argument
```json
[{
    quantity: 500,
    sku: {
        pretaxPrice: 2.71,
        weighted: true,
        weight: 0.0630,
        kdw_mm: 338,
        kdh_mm: 7.0,
        kdl_mm: 208
    }
}]
```


## Usage

```js
let cart = [{
    quantity: 500,
    sku: {
        sku: 'some item',
        price: 2.9,
        pretaxPrice: 2.71,
        weighted: true,
        weight: 0.0630,
        kdw_mm: 338,
        kdh_mm: 7.0,
        kdl_mm: 208
    }
}]

let KL = new KerryLogistic();
let TPN = new TPLogistic();
let TPN_EMS = new TPLogistic(true);

let cfun1 = KL.getCostFunction();
let cfun2 = TPN.getCostFunction();
let cfun3 = TPN_EMS.getCostFunction();

kerr_solution = cfun1(cart);
tpn_solution = cfun2(cart);
tpne_solution = cfun3(cart);

```