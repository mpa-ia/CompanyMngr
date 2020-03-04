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
 it('should throw error if args are not strings', () => {
     const [ func, object, array, string ] = [function () {}, {}, [], 'loremIpsum'];
     const testDep1 = new Employee({ firstName: string, lastName: array, department: string});
     const testDep2 = new Employee({ firstName: object, lastName: string, department: string});
     const testDep3 = new Employee({ firstName: string, lastName: array, department: func});
     const testDep4 = new Employee({ firstName: object, lastName: func, department: array});

     const cases = [testDep1, testDep2, testDep3, testDep4];

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