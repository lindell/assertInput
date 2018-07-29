const assertInput = require('../');
 
const data = {
    name: 'Foo Bar',
    age: 42,
    someOtherField: 'some other data'
};
 
assertInput({
    name: assertInput.minStringLength(40),
    someOtherField: assertInput.minStringLength(3),
}, data)
.then(console.log)
.catch(console.log);
