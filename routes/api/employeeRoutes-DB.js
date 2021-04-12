const express = require('express');
const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');

let Employee = require('../../models/Employee');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.send(employees);
  } catch (err) {
    res.status(500).send('Server error get');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const employees = await Employee.findById(req.params.id);
    if (!employees) {
      return res.status(404).send('task not found');
    }
    res.send(employees);
  } catch (err) {
    res.status(500).send('Server error get');
  }
});

router.post(
  '/',auth,

  [
    check('name', 'name is required').not().isEmpty(),
    check('email', 'email is required').not().isEmpty(),
    check('salary', 'salary is required').not().isEmpty()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      const newEmployee = new Employee({
        user: req.user.id,
        name: req.body.name,
        email: req.body.email,
        salary: req.body.salary,
      });

      const result = await newEmployee.save();

      res.send(result);
    } catch (err) {
      res.status(500).send('Server error post');
    }
  }
);

router.delete('/', async (req, res) => {
  try {
    const employees = await Employee.findById(req.body.id);
    const auth_user = req.user.id;
    if (!employees) {
      return res.status(404).json({ msg: 'Employee not found' });
    }
    if(employees.user.toString() === auth_user.toString()){
    const result = await Employee.findByIdAndDelete(req.body.id);
    res.send(result);
  }
  else{
    return res.status(401).json({msg:'User not found'})
  }
 } catch (err) {
    res.status(500).send('Server error delete');
  }
});

router.put('/', async (req, res) => {
  try {
    const employees = await Employee.findById(req.body.id);
    const auth_user = req.user.id;
    if (!employees) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    employees.name = req.body.name;
    employees.email = req.body.email;
    employees.salary = req.body.salary;
    await employees.save();
    res.send(employees);

    if(employees.user.toString() === auth_user.toString()){
      employees.name = req.body.name;
      employees.email = req.body.email;
      employees.salary = req.body.salary;
      await employees.save();
      res.send(employees);
    }
    else
    {
      return res.status(401).json({msg:'User not found!'})
    }

  } catch (err) {
    res.status(500).send('Server error put');
  }
});

module.exports = router;
