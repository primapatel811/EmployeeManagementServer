const express = require('express');
const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');

let Contact = require('../../models/Contact');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.send(contacts);
  } catch (err) {
    res.status(500).send('Server error get');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const contacts = await Contact.findById(req.params.id);
    if (!contacts) {
      return res.status(404).send('task not found');
    }
    res.send(contacts);
  } catch (err) {
    res.status(500).send('Server error get');
  }
});

router.post(
  '/',auth,

  [
    check('fname', 'first name is required').not().isEmpty(),
    check('lname', 'last name is required').not().isEmpty(),
    check('email', 'email is required').not().isEmpty(),
    check('subject', 'subject is required').not().isEmpty()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      const newContact = new Contact({
        user: req.user.id,
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        subject: req.body.subject,
      });

      const result = await newContact.save();

      res.send(result);
    } catch (err) {
      res.status(500).send('Server error post');
    }
  }
);

router.delete('/', async (req, res) => {
  try {
    const contacts = await Contact.findById(req.body.id);
    const auth_user = req.user.id;
    if (!contacts) {
      return res.status(404).json({ msg: 'Contact not found' });
    }
    if(contacts.user.toString() === auth_user.toString()){
    const result = await Contact.findByIdAndDelete(req.body.id);
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
    const contacts = await Contact.findById(req.body.id);
    const auth_user = req.user.id;
    if (!contacts) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    contacts.fname = req.body.fname;
    contacts.lname = req.body.lname;
    contacts.email = req.body.email;
    contacts.subject = req.body.subject;
    await contacts.save();
    res.send(contacts);

    if(contacts.user.toString() === auth_user.toString()){
        contacts.fname = req.body.fname;
        contacts.lname = req.body.lname;
        contacts.email = req.body.email;
        contacts.subject = req.body.subject;
      await contacts.save();
      res.send(contacts);
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
