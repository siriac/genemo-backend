import { Schema, model } from 'mongoose';

const vidangeSchema = new Schema(
  {
    idModule: {
        type: Schema.Types.ObjectId,
        ref: "modules",
      },
    date: {
      type: Date,
    },
    remarque:{
        type:String
    },
    doBy:{
        type:String,
        default:"Inconnu"
    }
  },
  { timestamps: true }
);

export const Vidange = model('vidange', vidangeSchema);
