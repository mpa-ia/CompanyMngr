const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server.js');
const Department = require('../../../routes/models/department.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('DELETE /api/departments', () => {
    before(async () => {
        try {
            const testDepOne = new Department({ _id: '5d9f1140f10a81216cfd4408', name: 'Department #1' });
            await testDepOne.save();
        } catch (e) {
            console.log(e);
        }
      });
    it('/:id should remove chosen document and return success', async () => {
        try {
            const res = await request(server).delete('/api/departments/5d9f1140f10a81216cfd4408');
            const removedDepartment = await Department.findOne({ name: '#Department #1' });
            expect(res.status).to.be.equal(200);
            expect(res.body).to.not.be.null;
            expect(removedDepartment).to.be.null;
        } catch (e) {
            console.log(e);
        }
    });
  
  });