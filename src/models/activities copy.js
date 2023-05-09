import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    idModule: {
      type: Schema.Types.ObjectId,
      ref: "modules",
    },
    date: {
      type: Date,
    },
    activities: [
      {
        heure_demarage: {
          type: Date,
        },
        heure_arret: {
          type: Date,
        }
      },
    ],
  },
  { timestamps: true }
);

export const Activities = model("activities", schema);
