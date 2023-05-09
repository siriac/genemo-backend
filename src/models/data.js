import { Schema, model } from "mongoose";

const dataSchema = new Schema(
  {
    idModule: {
      type: Schema.Types.ObjectId,
      ref: "modules",
    },
    date_debut: {
      type: Date,
    },
    date_fin: {
      type: Date,
    },
    infos: [
      {
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
        date: {
          type: Date,
        },
      },
    ],
  },
  { timestamps: true }
);

export const Data = model("data", dataSchema);
