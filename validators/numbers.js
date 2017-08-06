const isNumber = {
	validate: (data) => typeof data === 'number',
	failText: `must be an number.`,
};

// Check minumum string length without checking if data is string
const pureMinNumber = (min) => ({
	validate: (data) => data >= min,
	failText: `must be at least ${min}.`,
});
const minNumber = (min) => [isNumber, pureMin(min)];

// Check maximum string length without checking if data is string
const pureMaxNumber = (max) => ({
	validate: (data) => data <= max,
	failText: `must be at most ${max}.`,
});
const maxNumber = (max) => [isNumber, pureMax(max)];

const minMaxNumber = (min, max) => [
	isNumber,
	pureMin(min),
	pureMax(max),
];

module.exports = {
	isNumber,
	minNumber,
	maxNumber,
	minMaxNumber,
}
