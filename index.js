const validators = require('./validators');

let assertInput = function(asserts, data) {
	const assertKeys = Object.keys(asserts);
	let returns = {};
	let fails = [];

	assertKeys.forEach(assertKey => {
		const validator = asserts[assertKey];
		const errorMessage = validateSingleInput(validator, data[assertKey]);

		if (typeof errorMessage !== 'undefined') {
			fails.push(`${assertKey} ${errorMessage}`);
		}
		else {
			returns[assertKey] = data[assertKey];
		}
	});

	if (Object.keys(fails).length) {
		return Promise.reject(fails);
	}

	return Promise.resolve(returns);
};

const validateSingleInput = (validators, data) => {
	// If 'validators' is accually a single validator, validate the data
	// and return an error if it failed...
	if (!Array.isArray(validators)) {
		if (!validators.validate(data)) {
			return validators.failText(data);
		}
	}
	// ...otherwise, recursivly go into the array of validators and check them.
	else {
		for (let validator of validators) {
			const failMessage = validateSingleInput(validator, data);
			if (failMessage) {
				return failMessage;
			}
		}
	}
};

module.exports = Object.assign(assertInput, validators);
