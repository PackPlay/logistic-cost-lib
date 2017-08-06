'use strict';

module.exports = {
    Courier: {
        Kerry: require('./build/KerryLogistic'), 
        TP: require('./build/TPLogistic')
    },
    ZipCode: require('./build/ZipCode')
}