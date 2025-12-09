const express = require('express');
const PDFDocument = require('pdfkit');
const auth = require('../middleware/auth');
const Course = require('../models/Course');
const User = require('../models/User');
const router = express.Router();

router.get('/generate/:courseId', auth, async (req, res) => {
  const course = await Course.findById(req.params.courseId);
  const user = await User.findById(req.user.id);
  if(!course) return res.status(404).json({ message: 'Course not found' });
  const doc = new PDFDocument({ size: 'A4' });
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="certificate-${course._id}.pdf"`);
  doc.fontSize(26).text('Certificate of Completion', { align: 'center' });
  doc.moveDown(1.5);
  doc.fontSize(20).text(`${user.name}`, { align: 'center' });
  doc.moveDown(0.5);
  doc.fontSize(14).text(`has completed the course "${course.title}"`, { align: 'center' });
  doc.moveDown(2);
  doc.fontSize(12).text(`Date: ${new Date().toLocaleDateString()}`, { align: 'center' });
  doc.end();
  doc.pipe(res);
});

module.exports = router;
