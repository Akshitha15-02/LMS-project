const express = require('express');
const Course = require('../models/Course');
const auth = require('../middleware/auth');
const router = express.Router();

// Create course (instructor) - protected
router.post('/', auth, async (req, res) => {
  try{
    const course = await Course.create(req.body);
    res.json(course);
  }catch(e){
    console.error(e);
    res.status(500).json({ message: 'Could not create' });
  }
});

// List courses
router.get('/', async (req, res) => {
  const q = req.query.q || '';
  const tag = req.query.tag;
  const filter = {};
  if(q) filter.title = { $regex: q, $options: 'i' };
  if(tag) filter.tags = tag;
  const courses = await Course.find(filter).limit(100);
  res.json(courses);
});

router.get('/:id', async (req, res) => {
  const course = await Course.findById(req.params.id);
  if(!course) return res.status(404).json({ message: 'Not found' });
  res.json(course);
});

router.post('/:id/enroll', auth, async (req, res) => {
  const CourseModel = require('../models/Course');
  const User = require('../models/User');
  const course = await CourseModel.findById(req.params.id);
  if(!course) return res.status(404).json({ message: 'Course not found' });
  await User.findByIdAndUpdate(req.user.id, { $addToSet: { enrolled: course._id } });
  res.json({ message: 'Enrolled' });
});

module.exports = router;
