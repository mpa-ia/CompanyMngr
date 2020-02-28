const express = require('express');
const router = express.Router();

const EemployeeControlles = require('./controllers/employees.controller');

router.get('/employees', EemployeeControlles.getAll);
router.get('/employees/random', EemployeeControlles.getRandom);
router.get('/employees/:id', EemployeeControlles.getById);

router.post('/employees', EemployeeControlles.postNew);

router.put('/employees/:id', EemployeeControlles.modifyById);

router.delete('/employees/:id', EemployeeControlles.deleteById);

module.exports = router;
