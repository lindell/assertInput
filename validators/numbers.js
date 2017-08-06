const isNumber = {
	validate: (data) => typeof data === 'number',
	failText: `must be an number.`,
};

// Check minumum string length without checking if data is string
const pureMin = (min) => ({
	validate: (data) => data >= min,
	failText: `must be at least ${min}.`,
});
const min = (min) => [isNumber, pureMin(min)];

// Check maximum string length without checking if data is string
const pureMax = (max) => ({
	validate: (data) => data <= max,
	failText: `must be at most ${max}.`,
});
const max = (max) => [isNumber, pureMax(max)];

const minMax = (min, max) => [
	isNumber,
	pureMin(min),
	pureMax(max),
];

module.exports = {
	isNumber,
	min,
	max,
	minMax,
}
