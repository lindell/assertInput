const stringValidators = require('./strings');
const numberValidators = require('./numbers');

module.exports = Object.assign({},
	stringValidators,
	numberValidators
);
