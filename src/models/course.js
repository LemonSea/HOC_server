const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  author: String,
  tags: {
    type: Array,
    validate: {
      validator: function (value) {
        return value && value.length > 0;
      },
      message: 'A course should have at least one tag.'
    }
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function () { return this.isPublished; },
    min: 0,
    max: 10000
  },
  category: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50,
    enum: ['web', 'mobile', 'network'],
    lowercase: true,
    trim: true
  }
});

// 直接导出模型构造函数
module.exports = mongoose.model('course', courseSchema);