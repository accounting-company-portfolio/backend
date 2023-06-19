import mongoose from "mongoose";
import { model } from "mongoose";

const serviceSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    ImageIcon:{
      type: String
    },
  },
  {
    collection: 'services',
    timestamps: true
    
  },
)

const serviceModel = model("services", serviceSchema);

export default serviceModel;
