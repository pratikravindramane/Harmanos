const mongoose = require("mongoose"); // Erase if already required
const Schema = mongoose.Schema;

const lectureSchema = new Schema({
  date: { type: String, required: true },
  instructorId: {
    type: Schema.Types.ObjectId,
    ref: "Instructor",
    required: true,
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
});
module.exports = mongoose.model("Lecture", lectureSchema);
