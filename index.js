const validators = require('./validators');
const ValidationError = require('./error');

function assertInput(asserts, data) {
	const { returns, fails } = validate(asserts, data);

	if (Object.keys(fails).length > 0) {
		return Promise.reject(new ValidationError(fails));
	}

	return Promise.resolve(returns);
}

function validate(asserts, data) {
	const assertKeys = Object.keys(asserts);
	let returns = {};
	let fails = {};

	assertKeys.forEach(assertKey => {
		const validator = asserts[assertKey];
		if (typeof validator === 'function' || Array.isArray(validator)) {
			const error = validateSingle(validator, data[assertKey]);

			if (error) {
				fails[assertKey] = error;
			} else {
				returns[assertKey] = data[assertKey];
			}
		} else {
			const subReturn = validate(validator, data[assertKey]);
			returns[assertKey] = subReturn.return;
			fails[assertKey] = subReturn.fails;
		}
	});

	return { returns, fails };
}

function validateSingle(validator, data) {
	if (typeof validator === 'function') {
		const error = validator(data);

		if (typeof error !== 'undefined' && error !== false) {
			return error;
		}
	} else if (Array.isArray(validator)) {
		for (const v of validator) {
			const error = v(data);
			if (typeof error !== 'undefined' && error !== false) {
				return error;
			}
		}
	}
}

module.exports = Object.assign(assertInput, validators);
