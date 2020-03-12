const Employee = require('../employee.model.js');
const expect = require('chai').expect;
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
const mongoose = require('mongoose');

describe('Employee', () => {
    before(async () => {
        try {
            const fakeDB = new MongoMemoryServer();
            const uri = await fakeDB.getConnectionString();

            mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        } catch (err) {
            console.log(err);
        }
    });

    describe('Reading data', () => {
        beforeEach(async () => {
            try {
                const employeeOne = new Employee({ firstName: 'Anna', lastName: 'Doe', department: 'Marketing' });
                await employeeOne.save();

                const employeeTwo = new Employee({ firstName: 'John', lastName: 'Smith', department: 'Quality' });
                await employeeTwo.save();

                const employeeThree = new Employee({ firstName: 'Henry', lastName: 'Moore', department: 'Quality' });
                await employeeThree.save();
            } catch (e) {
                console.log(e);
            }
        });
        it('should return all the data with "find" method', async () => {
            try {
                const employees = await Employee.find();
                const qualityDepEmployees = await Employee.find({ department: 'Quality' });

                expect(employees.length).to.be.equal(3);
                expect(qualityDepEmployees.length).to.be.equal(2);
            } catch (e) {
                console.log(e);
            }
        });
        it('should return proper document by various params with "findOne" method', async () => {
            try {
                const employee1 = await Employee.findOne({ department: 'Marketing' });
                const employee2 = await Employee.findOne({ firstName: 'John' });
                const employee3 = await Employee.findOne({ lastName: 'Moore' });

                expect(employee1.department).to.be.equal('Marketing');
                expect(employee2.firstName).to.be.equal('John');
                expect(employee3.lastName).to.be.equal('Moore');
            } catch (e) {
                console.log(e);
            }
        });
        after(async () => {
            try {
                await Employee.deleteMany();
            } catch (e) {
                console.log(e);
            }
        });
    });
});