function getErrorMessages(fails, pre = '') {
	const result = [];

	const failKeys = Object.keys(fails);
	for (let i = 0; i < failKeys.length; i++) {
		const name = failKeys[i];
		
		if (typeof fails[name] !== 'object') {
			result.push(`${pre}${name} ${fails[name]}`);
		} else {
			const subErrors = getErrorMessages(fails[name], `${pre}${name}.`);
			result.push(...subErrors);
		}
	}

	return result;
}

class ValidationError extends Error {
	constructor(fails, ...args) {
		const errorMessage = getErrorMessages(fails).join('\n');

		super(errorMessage, ...args);

		Error.captureStackTrace(this, ValidationError);
	}
}

module.exports = ValidationError;
