const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionResponseSchema = new Schema({
    questionId: {
        type: String,
        required: true
    },
    questionText: {
        type: String,
        required: true
    },
    questionType: {
        type: String,
        enum: ['multipleChoice', 'shortText', 'longText', 'statement', 'email'],
        required: true
    },
    answer: Schema.Types.Mixed, // Can be string or array depending on question type
    options: [String] // For multiple choice questions
});

// Define the overall response schema
const ResponseSchema = new Schema({
    formId: {
        type: String,
        required: true
    },
    formTitle: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    responses: [QuestionResponseSchema]
});

module.exports = mongoose.model('Response', ResponseSchema);