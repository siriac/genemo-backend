import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
      username:{
        type:String,
          trim: true,
          required: true,
          unique: true
      },
      password: String,
      email:{
        type:String,
        trim: true,
        required: true,
      },
      roles:[{
        type: Schema.Types.ObjectId,
        ref: "roles"
      }],
      idTownAuthorise:[{
        type: Schema.Types.ObjectId,
        ref: "regions"
      }]
  },
  { timestamps: true }
);

export const User = model('users', userSchema);
