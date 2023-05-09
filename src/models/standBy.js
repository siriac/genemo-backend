import { Schema, model } from "mongoose";

const standBySchema = new Schema(
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
        batterie: {
          type: Number,
        },
        fuel: {
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

export const StandBy = model("standBy", standBySchema);
