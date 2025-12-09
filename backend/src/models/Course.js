const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuizSchema = new Schema({
  question: String,
  options: [String],
  answerIndex: Number
});

const CourseSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  instructor: String,
  price: { type: Number, default: 0 },
  videoUrl: String,
  tags: [String],
  quizzes: [QuizSchema]
}, { timestamps: true });

module.exports = mongoose.model('Course', CourseSchema);
