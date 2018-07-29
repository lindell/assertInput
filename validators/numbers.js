const isNumber = () => data => typeof data !== 'number' && `must be an number.`;

// Check minumum string length without checking if data is string
const min = min => data => data < min && `must be at least ${min}.`;

const minNumber = minValue => [isNumber(), min(minValue)];

// Check maximum string length without checking if data is string
const max = max => data => data > max && `must be at most ${max}.`;

const maxNumber = maxValue => [isNumber(), max(maxValue)];

const minMaxNumber = (min, max) => [isNumber, min(min), max(max)];

module.exports = {
	isNumber,
	minNumber,
	maxNumber,
	minMaxNumber,
};
