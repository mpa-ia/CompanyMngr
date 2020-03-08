const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server.js');
const Department = require('../../../routes/models/department.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('PUT /api/departments', () => {
    before(async () => {
        try {
        const testDepOne = new Department({ _id: '5d9f1140f10a81216cfd4408', name: 'Department #1' });
        await testDepOne.save();
    } catch (e) {
        console.log(e);
        }
      });
    it('/:id should update chosen document and return success', async () => {
        try {
            const res = await request(server).put('/api/departments/5d9f1140f10a81216cfd4408').send({ name: 'Department #2'});
            const newDepartment = await Department.findOne({ name: 'Department #2' });
            expect(res.status).to.be.equal(200);
            expect(res.body).to.not.be.null;
            expect(newDepartment).to.not.be.null;
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