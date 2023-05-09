import mongoose from 'mongoose';
import { BadRequestError } from '../lib/errors';
import {Imei} from '../models/imei';
import { Module } from '../models/module';
export const validateObjectId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    throw new BadRequestError('Invalid ObjectId in request params');
  }
  next();
};

export const imeiIsRegisted = async (req, res, next) => {
  try {
    const {body={}}=req;
    const {imei}=body;
    const infoImei=await Imei.findOne({imei}).exec();
    if(!infoImei){
      throw new BadRequestError('Invalid imei');
    }
    console.log("Good is trust");
    console.log(infoImei)
//rechercher l'imei qui correspond à cet imei
const module=await Module.findOne({idImei:infoImei._id});
if(!module){
  throw new BadRequestError(`Module introuvable \n Aucun module ne correspond avec l'identifiant de cet imei ${infoImei?.imei}`);
}
req.body.idImei=infoImei._id.toString();
req.body.idModule=module._id.toString();
    next();
  } catch (error) {
    next(error)
  }
 
};