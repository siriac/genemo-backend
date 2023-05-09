import { Schema, model } from 'mongoose';

const trameSchema = new Schema(
  {
    idModule: {
        type: Schema.Types.ObjectId,
        ref: "modules",
      },
    temp:{
        type:String
    },
    fuel:{
        type:String
    },
    bat:{
        type:String,
    },
    ph1:{
        type:String
    },
    ph2:{
        type:String
    },
    ph3:{
        type:String
    },
    freq:{
        type:String
    },
    oilPress:{
        type:String
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
