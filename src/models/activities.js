import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    idModule: {
      type: Schema.Types.ObjectId,
      ref: "modules",
    },
    date_demarrage: {
      type: Date,
    },
    duration:{
      type:Number,
      default:0
    },
    date_arret: {
      type: Date,
    }
  },
  { timestamps: true }
);

export const Activities = model("activities", schema);
