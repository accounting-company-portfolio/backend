import mongoose from "mongoose";
const { Schema, model } = mongoose;

const newsSchema = new Schema(
  {
    mediaTitle: {
      type: String,
      required: true,
    },
    mediaType: {
      type: String,
      required: true,
    },
    mediaUrl: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  {
    collection: "News",
    timestamps: true,
  }
);

const News = model("News", newsSchema);
export default News;
