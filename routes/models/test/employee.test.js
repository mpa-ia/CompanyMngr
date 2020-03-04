const Employee = require('../employee.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {
 it('should throw error if at least one data field is missing', () => {

    const [ firstName, lastName, department ] = ['Amanda', 'Doe', 'Marketing'];
    const testDep1 = new Employee({});
    const testDep2 = new Employee({ firstName: firstName, lastName: lastName });
    const testDep3 = new Employee({ department: department });

    const cases = [testDep1, testDep2, testDep3];
    for (let testDep of cases) {
        testDep.validate(err => {
            expect(err.errors).to.exist;
        });
    }
 });
});

after(() => {
    mongoose.models = {};
});