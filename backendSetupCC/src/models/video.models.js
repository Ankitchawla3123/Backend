import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
  {
    videoFile: {
      type: String, //cloudinary url
      required: true,
    },
    thumbnail: {
      type: String, //cloudinary url
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

videoSchema.plugin(mongooseAggregatePaginate);
// Plugins are a tool for reusing logic in multiple schemas
// Plugins are a technique for reusing logic in multiple mongoose schemas. A plugin is similar to a method that you can use in your schema and reuse repeatedly over different instances of the schema. The main purpose of plugins is to modify your schemas. Plugins don't have anything to do with models or documents, so they can't execute queries or write to the database directly

//Use .methods when you want to define document-specific logic.
// Use plugins when you want to define reusable logic that you might apply across multiple schemas.

export const Video = mongoose.model("Video", videoSchema);

// videoSchema.plugin(mongooseAggregatePaginate) is a plugin because:
// It's meant to extend the schema/model with static pagination support.
// It's designed to be reusable across many schemas.
// It registers a new method (aggregatePaginate) that is not available by default in Mongoose
