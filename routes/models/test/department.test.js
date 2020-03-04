const Department = require('../department.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Department', () => {
    it('should throw an error if no "name" arg', () => {
        const dep = new Department({});

        dep.validate(err => {
            expect(err.errors.name).to.exist;
        });
    });
    it('should throw an error if "name" is not a string', () => {
        const cases = [{}, []];
        for (let name of cases) {
            const dep = new Department ({ name });
    
            dep.validate(err => {
                expect(err.errors.name).to.exist;
            });
        }
    });
    it('should throw an error if "name" length is lower than 5 and greater than 20 ', () => {
        const cases = ['io', 'gergerheerygge erhgetheher'];
        for (let name of cases) {
            const dep = new Department ({ name });

            dep.validate(err => {
                expect(err.errors.name).to.exist;
            });
        }
    });
    it('should work properly if "name" is correct', () => {
        const name = 'Lorem ipsum';
        const dep = new Department ({ name });
        dep.validate(err => {
            expect(err).to.not.exist;
        });
    });
});



after(() => {
    mongoose.models = {};
  });
