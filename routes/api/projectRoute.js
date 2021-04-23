const express = require('express');
const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');

let Project = require('../../models/Project');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.send(projects);
  } catch (err) {
    res.status(500).send('Server error get');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const projects = await Project.findById(req.params.id);
    if (!projects) {
      return res.status(404).send('task not found');
    }
    res.send(projects);
  } catch (err) {
    res.status(500).send('Server error get');
  }
});

router.post(
  '/',auth,

  [
    check('name', 'name is required').not().isEmpty(),
    check('detail', 'detail is required').not().isEmpty(),
    check('duration', 'duration is required').not().isEmpty()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      const newProject = new Project({
        user: req.user.id,
        name: req.body.name,
        detail: req.body.detail,
        duration: req.body.duration,
      });

      const result = await newProject.save();

      res.send(result);
    } catch (err) {
      res.status(500).send('Server error post');
    }
  }
);

router.delete('/', async (req, res) => {
  try {
    const projects = await Project.findById(req.body.id);
    const auth_user = req.user.id;
    if (!projects) {
      return res.status(404).json({ msg: 'Project not found' });
    }
    if(projects.user.toString() === auth_user.toString()){
    const result = await Project.findByIdAndDelete(req.body.id);
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
    const projects = await Project.findById(req.body.id);
    const auth_user = req.user.id;
    if (!projects) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    projects.name = req.body.name;
    projects.detail = req.body.detail;
    projects.duration = req.body.duration;
    await projects.save();
    res.send(projects);

    if(projects.user.toString() === auth_user.toString()){
        projects.name = req.body.name;
        projects.detail = req.body.detail;
        projects.duration = req.body.duration;
      await projects.save();
      res.send(projects);
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
