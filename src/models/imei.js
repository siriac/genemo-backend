import { Schema, model } from 'mongoose';

const imeiSchema = new Schema(
  {
    imei:{
        type:String
    },
    isBusy:{
        type:Boolean,
        default:false
    },
    enabled:{
        type:Boolean,
        default:false
    }
  },
  { timestamps: true }
);

export const Imei = model('imeis', imeiSchema);