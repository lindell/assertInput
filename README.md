# assertInput
Assert input is a small library to easily verify different types of user inputs.
It will work on an object of data and return a rejected promise with a suiting error messages if any data is not validated. If all data is validated, it will returned a cleaned object with any superfluous fields removed.


Examples
----

#### When data isn't validated
````javascript
const assertInput = require('./index');

const data = {
	name: 'xyz',
	age: 150
};

assertInput({
	name: assertInput.minMaxStringLength(4, 50),
	age: assertInput.minMax(5, 99),
}, data)
.then(insertIntoDatabase)
.catch(throwError);
````

Function `throwError` will be called with
````json
[ "name must be a string longer than 4 characters.",
  "age must be at most 99." ]
````

#### When all data is validated
````javascript
const assertInput = require('./index');

const data = {
	name: 'Foo Bar',
	age: 42,
	someOtherField: 'some other data'
};

assertInput({
	name: assertInput.minMaxStringLength(4, 50),
	age: assertInput.minMax(5, 99),
}, data)
.then(insertIntoDatabase)
.catch(throwError)
````

Function `insertIntoDatabase` will be called with
````json
{
	"name": "Foo Bar",
	"age": 42
}
````

Validators
----
#### Numbers
* isNumber
* minNumber(min)
* maxNumber(max)
* minMaxNumber(min, max)

#### Strings
* isString
* minStringLength(min)
* maxStringLength(max)
* minMaxStringLength(min, max)

*More validators coming soon*

Custom validators
----
You can create your own validators and use them in combinations with the already existing ones.

````javascript
const assertInput = require('./index');

// Create the validator
let hexColorValidator = {
	validate: (data) => /^#?([a-f0-9]{6}|[a-f0-9]{3})$/.test(data),
	failText: `must be a hex color.`
};
// Combine it with isString to first verify that the data is a string
hexColorValidator = [assertInput.isString, hexColorValidator];

assertInput({
	color: hexColorValidator,
}, data)
.then(insertIntoDatabase)
.catch(throwError);
````
