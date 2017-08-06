const isString = {
	validate: (data) => typeof data === 'string',
	failText: () => `must be a string.`,
};

// Check minumum string length without checking if data is string
const pureMinStringLength = (min) => ({
	validate: (data) => data.length >= min,
	failText: () => `must be a string with at least ${min} characters.`,
});
const minStringLength = (min) => [isString, pureMinStringLength(min)];

// Check maximum string length without checking if data is string
const pureMaxStringLength = (max) => ({
	validate: (data) => data.length <= max,
	failText: () => `must be a string with max ${max} characters.`,
});
const maxStringLength = (max) => [isString, pureMaxStringLength(max)];

const minMaxStringLength = (min, max) => [
	isString,
	pureMinStringLength(min),
	pureMaxStringLength(max),
];

module.exports = {
	isString,
	minStringLength,
	maxStringLength,
	minMaxStringLength,
}
