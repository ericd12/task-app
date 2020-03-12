const mongoose = require("mongoose");

const { Schema } = mongoose;

const elementSchema = new Schema(
  {
    elementnumber: { type: String, required: true },
    elementlabel: { type: String, required: true },
    elementDescription: { type: String, required: true },
    elementFormat: { type: String, required: true },
    elementDuration: { type: String, required: true }, // Probably change type to Num
    elementCategory: { type: String, required: true },
    elementSubCategory: { type: String, required: true },
    elementMarket: { type: String, required: true },
    elementCogRating: { type: Number, required: true },
    elementPhysRating: { type: Number, required: true },
    elementLink: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Element = mongoose.model("Element", elementSchema);

module.exports = Element;
