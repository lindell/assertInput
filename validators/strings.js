const isString = () => data => typeof data !== 'string' && `must be a string.`;

// Check minumum string length without checking if data is string
const minLength = min => data => data.length < min && `can't be less than ${min} characters.`;

const minStringLength = min => [isString(), minLength(min)];

// Check maximum string length without checking if data is string
const maxLength = max => data => data.length > max && `can't be more than ${max} characters.`;
const maxStringLength = max => [isString, maxLength(max)];

const minMaxStringLength = (min, max) => [isString(), minLength(min), maxLength(max)];

module.exports = {
	isString,
	minStringLength,
	maxStringLength,
	minMaxStringLength,
};
