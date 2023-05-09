import { Schema, model } from "mongoose";

const runningSchema = new Schema(
  {
    idModule: {
      type: Schema.Types.ObjectId,
      ref: "modules",
    },
        temperature: {
          type: Number,
        },
        fuel: {
          type: Number,
        },
        frequence: {
          type: Number,
        },
        pression_huile: {
          type: Number,
        },
        phase1:{
            type:Number
        },
        phase2:{
            type:Number
        },
        duree:{
            type:String
          },
  },
  { timestamps: true }
);

export const Running = model("running", runningSchema);
