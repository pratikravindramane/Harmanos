const { default: mongoose } = require("mongoose");

const validateMongoDbId = async (id) => {
  const valid = await new mongoose.Types.ObjectId.isValid(id);
  if (!valid) throw new Error("Not a Valid ID");
};
module.exports = validateMongoDbId;
