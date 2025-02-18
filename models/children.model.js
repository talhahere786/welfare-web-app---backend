import mongoose from "mongoose";

const childrenSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  studying: { type: Boolean, required: true }, // True if studying
  earning: { type: Boolean, required: true }, // True if earning

  // Required only if the child is studying
  instituteName: {
    type: String,
    default: null,
    required: function () {
      return this.studying;
    },
  },
  fees: {
    type: Number,
    default: 0,
    required: function () {
      return this.studying;
    },
  },
  className: {
    type: String,
    default: null,
    required: function () {
      return this.studying;
    },
  },

  // Required only if the child is earning
  sourceOfIncome: {
    type: String,
    default: null,
    required: function () {
      return this.earning;
    },
  },
  income: {
    type: Number,
    default: 0,
    required: function () {
      return this.earning;
    },
  },

  family: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Family",
    required: true,
  },
});

export const Children = mongoose.model("Children", childrenSchema);