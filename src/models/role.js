import { Schema, model } from 'mongoose';

const roleSchema = new Schema(
  {
      name:{
          type:String,
          trim: true
      }
  },
  { timestamps: true }
);

export const Role = model('roles', roleSchema);
