import mongoose from "mongoose";
const { Schema, model } = mongoose;

const adminschema = new Schema(
  {
    FirstName: {
      type: String,
      required: true,
    },
    LastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: { type: String, required: true },
  },
  {
    collection: "Admins",
  }
);

const adminModel = model("adminModel", adminschema);
export default adminModel;
