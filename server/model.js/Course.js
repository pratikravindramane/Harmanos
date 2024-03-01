const mongoose = require("mongoose"); // Erase if already required
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  name: { type: String, required: true, unique: true, index: true },
  level: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  //   instructorId: { type: Schema.Types.ObjectId, ref: "Instructor", required: true },
});

//Export the model
module.exports = mongoose.model("Course", courseSchema);
