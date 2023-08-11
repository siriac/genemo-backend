import { Schema, model } from 'mongoose';

const regionSchema = new Schema(
  {
      name:{
          type:String,
          trim: true,
          required: true,
          unique: true
      }
  },
  { timestamps: true }
);

export const Region = model('regions', regionSchema);
