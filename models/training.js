import { Schema, model, models } from "mongoose";

const TrainingSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  day: {
    type: String,
    required: [true, "Day is required"],
  },
  training: {
    type: String,
    required: [true, "Training is required"],
  },
  tag: {
    type: String,
  
  },
  complete: {
    type: Boolean,
    required: [true, "Status is required"],
  },
  summary: {
    type: String,
  },
});

const Training = models.Training || model("Training", TrainingSchema);

export default Training;
