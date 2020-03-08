const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server.js');
const Department = require('../../../routes/models/department.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('POST /api/departments', () => {

    it('/ should insert new document to db and return success', async () => {
        try {
            const res = await request(server).post('/api/departments').send({ name: '#Department #1' });
            const newDepartment = await Department.findOne({ name: '#Department #1' });
            expect(res.status).to.be.equal(200);
            expect(res.body).to.be.an('object');
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
