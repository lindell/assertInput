const valo = require('../');
 
const data = {
    name: 'Foo Bar',
    age: 42,
    someOtherField: 'some other data'
};
 
valo({
    name: valo.minStringLength(40),
    someOtherField: valo.minStringLength(3),
}, data)
.then(console.log)
.catch(console.log);
