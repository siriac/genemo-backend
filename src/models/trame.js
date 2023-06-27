import { Schema, model } from 'mongoose';

const trameSchema = new Schema(
  {
    idModule: {
        type: Schema.Types.ObjectId,
        ref: "modules",
      },
    temp:{
        type:Number
    },
    fuel:{
        type:Number
    },
    bat:{
        type:Number,
    },
    ph1:{
        type:Number
    },
    ph2:{
        type:Number
    },
    ph3:{
        type:Number
    },
    freq:{
        type:Number
    },
    oilPress:{
        type:Number
    },
    date:{
        type:Date
    },
    status: {
        type: String,
        enum: [
          "NOT_RUNNING",
          "NOT_RUNNING/FAULT",
          "STOPPED",
          "RUNNING",
          "RUNNING/FAULT",
        ],
      }
  },
  { timestamps: true }
);

export const Trame = model('trames', trameSchema);
