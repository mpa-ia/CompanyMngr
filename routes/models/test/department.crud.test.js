const Department = require('../department.model.js');
const expect = require('chai').expect;
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
const mongoose = require('mongoose');

describe('Department', () => {
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
        before(async () => {
            try {
            const testDepOne = new Department ({ name: 'Department #1' });
            await testDepOne.save();

            const testDepTwo = new Department ({ name: 'Department #2' });
            await testDepTwo.save();
            } catch (e) {
                console.log(e);
            }
        });
        it('should return all the data with "find" method', async () => {
            try {
            const departments = await Department.find();
            const expectedLength = 2;

            expect(departments.length).to.be.equal(expectedLength);
            } catch (e) {
                console.log(e);
            }
        });
        it('should return a proper document by "name" with "findOne" method', async () => {
            try {
            const department = await Department.findOne({ name: 'Department #1' });
            const expectedName = 'Department #1';
            expect(department.name).to.be.equal(expectedName);
            } catch (e) {
                console.log(e);
            }
        });
        after(async () => {
            try {
            await Department.deleteMany();
            } catch (e) {
                console.log(e);
            }
        });
    });
    describe('Creating data', () => {
        it('should insert new document with "insertOne" method', async () => {
        try {
            const department = new Department ({ name: 'Department #1' });
            await department.save();
            expect(department.isNew).to.be.false;
        } catch (e) {
            console.log(e);
        }
        });
        
        after(async () => {
        try {
            await Department.deleteMany();
        } catch (e) {
            console.log(e);
        }
        });
    });
    describe('Updating data', () => {
        beforeEach(async () => {
            try {
            const testDepOne = new Department({ name: 'Department #1' });
            await testDepOne.save();
          
            const testDepTwo = new Department({ name: 'Department #2' });
            await testDepTwo.save();
        } catch (e) {
            console.log(e);
        }
        });

        it('should properly update one document with "updateOne" method', async () => {
            try {
            await Department.updateOne({ name: 'Department #1'}, { $set: { name: 'Department #3' }});
            const updatedDepartment = await Department.findOne({ name: 'Department #3' });
            expect(updatedDepartment).to.not.be.null;
        } catch (e) {
            console.log(e);
        }
        });
      
        it('should properly update one document with "save" method', async () => {
            try {
            const department = await Department.findOne({ name: 'Department #1' });
            department.name = 'Department #3';
            await department.save();

            const updatedDepartment = await Department.findOne({ name: 'Department #3' });
            expect(updatedDepartment).to.not.be.null;
        } catch (e) {
            console.log(e);
        }
        });
      
        it('should properly update multiple documents with "updateMany" method', async () => {
            try {
            await Department.updateMany({}, { $set: { name: 'One Department' }});
            const updatedDepartments = await Department.find({ name: 'One Department' });
            expect(updatedDepartments.length).to.be.equal(2);
        } catch (e) {
            console.log(e);
        }
        });
        afterEach(async () => {
            try {
            await Department.deleteMany();
        } catch (e) {
            console.log(e);
        }
        });
    });
    describe('Removing data', () => {
        beforeEach(async () => {
            try {
            const testDepOne = new Department({ name: 'Department #1' });
            await testDepOne.save();
          
            const testDepTwo = new Department({ name: 'Department #2' });
            await testDepTwo.save();
        } catch (e) {
            console.log(e);
        }
        });

        it('should properly remove one document with "deleteOne" method', async () => {
            try {
            await Department.deleteOne({ name: 'Department #1'});
            const removedDepartment = await Department.findOne({ name: 'Department #1' });
            expect(removedDepartment).to.be.null;
        } catch (e) {
            console.log(e);
        }
        });
      
        it('should properly remove one document with "remove" method', async () => {
            try {
            const department = await Department.findOne({ name: 'Department #1' });
            await department.remove();
            const removedDepartment = await Department.findOne({ name: 'Department #1' });
            expect(removedDepartment).to.be.null;
        } catch (e) {
            console.log(e);
        }
        });
      
        it('should properly remove multiple documents with "deleteMany" method', async () => {
            try {
            await Department.deleteMany();
            const removedDepartments = await Department.find();
            expect(removedDepartments).to.be.empty;
        } catch (e) {
            console.log(e);
        }
        });
        afterEach(async () => {
            try {
            await Department.deleteMany();
        } catch (e) {
            console.log(e);
        }
        });
    });

});