import { Router } from "express";
import config from 'config';
import moment from 'moment';
import {
  getCreateModuleResponseDTO,
  getDeleteModuleResponseDTO,
  getModuleByIdResponseDTO,
  getModuleResponseDTO,
  getModuleDTO,
  getUpdateModuleResponseDTO,
} from "../../dto/module.dto";
import {
  getCreateDataResponseDTO,
  getDeleteDataResponseDTO,
  getDataByIdResponseDTO,
  getDataResponseDTO,
  getUpdateDataResponseDTO,
} from "../../dto/data.dto";
import {
  getCreateActivitieResponseDTO,
  getDeleteActivitieResponseDTO,
  getActivitieByIdResponseDTO,
  getActivitiesResponseDTO,
} from "../../dto/activitie_duration.dto";
import {
  getCreateTrameResponseDTO,
  getDeleteTrameResponseDTO,
getTrameByIdResponseDTO,
getTrameResponseDTO,
getTrameDTO,
getUpdateTrameResponseDTO,
} from '../../dto/trame.dto';
import {
  getCreateVidangeResponseDTO,
  getDeleteVidangeResponseDTO,
  getVidangeByIdResponseDTO,
  getVidangeResponseDTO,
  getUpdateVidangeResponseDTO,
  getVidangeDTO
} from "../../dto/vidange.dto";
import { NotFoundError } from "../../lib/errors";
import { validateObjectId } from "../../middlewares/validations";
import { Module } from "../../models/module";
import { Data } from "../../models/data";
import {Trame} from "../../models/trame";
import {StandBy} from "../../models/standBy";
import  {Vidange} from "../../models/vidange";
import {Running} from "../../models/running";
import { Activities } from "../../models/activities";
import {toUpperCaseStationName} from "../../lib/util";
import {getLocalTime,getDurationHoursAndMinutes} from "../../lib/dateTime";
const router = Router();
const lastDate= async (id)=>{
  const lastData = await Data.find({ idModule:id })
  .sort({ createdAt: -1 })
  .limit(1);
  return lastData
}
const STATUS = config.get('status');
router.post("/:stationName", toUpperCaseStationName,async (req, res, next)=>{
  try {
    const {body={}}=req;
    console.log(req.body);
    const{stationName}=req.params;
    const {temp,fuel,bat,ph1,ph2, ph3,freq,oilPress,status,date,elapsed,position={}}=body;
    if(elapsed){
      elapsed.milliseconds=0;
      elapsed.seconds=0;
    }
    let d2=moment.duration(elapsed);
    let d1,trame={};
    let module=await Module.findOne({stationName }).exec();
    console.log(stationName)
    console.log(module);
    console.log("module");

    if(module){

      switch(status)
      {
        case STATUS.NOT_RUNNING:
        break;
        case STATUS.RUNNING:
        break;
        case STATUS.STOPPED:
          //calculate duration total and duration partiel
          d1=moment.duration(module.elapse_total);
          body.elapse_total=d1.add(d2)._data;
            d1=moment.duration(module.elapse);
            body.elapse=d1.add(d2)._data;
        break;
        default:
          console.log("Status non reconnu")
      }
      /**
       * mettre à jour le module
       */
      await Module.findByIdAndUpdate(module._id,body,{new:true});

      trame=await Trame.create({...body,idModule:module._id});
    }
    else{
            // cree un nouveau module
            module = await Module.create({
              ...body,
              stationName: stationName,
              position: position,
            });
            //cree une nouvelle trame
    trame=await Trame.create({...body,idModule:module._id});
    }
    global.io.emit("incomingTrame",{
      module,
      trame
    });
    res.status(200).json({
      status:"Ok",
      idModule:module._id.toString(),
    })
  } catch (error) {
    next(error)
  }
})
/*router.post("/:stationName", async (req, res, next)=>{
try {
  const {stationName}=req.params;
  const {body={}}=req;
  let running={};
  let module=await Module.findOne({stationName}).exec();
  if(module){
     running=await Running.create(body);

  }
  else{
    const err=new Error("Module introuvable avec cet Id");
    err.status=404;
    throw err
  }
res.status(200).send({
  status:"Ok",
  idRunning:running?._id?.toString(),
  idModule:module._id.toString()
})
} catch (error) {
  next(error)
}
})*/
router.get("/", async (req, res, next) => {
  try {
    const { page = 1, limit = 10, name=''} = req.query;
    const [mods, count] = await Promise.all([
      Module.find({ stationName:{$regex: name,$options: 'i'} })
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 }),
      Module.count({ stationName:{$regex: name,$options: 'i'}}),
    ]);
    const {data,pagination}=getModuleResponseDTO(mods, page, limit, count);
    const modules=await Promise.all(data.map(async d=>{
      const v=await Vidange.find({idModule:d.id}).sort({date:-1}).limit(1);
      const t=await Trame.find({idModule:d.id}).sort({date:-1}).limit(1);
      return {
        ...d,
        infoVidange:v.length>0?getVidangeDTO(v[0]):{},
        lastInfoTrame:t.length>0?getTrameDTO(t[0]):{}
      }
    }))
    res.json(
      {
        modules,
        pagination
      }
    );
  } catch (error) {
    next(error);
  }
});

router.get("/:id", validateObjectId, async (req, res, next) => {
  try {
    const id = req.params.id;
    const module = await Module.findOne({ _id: id });
    if (!module) {
      throw new NotFoundError("Id Not Found");
    }
    const modDTO=getModuleByIdResponseDTO(module);
    const t=await Trame.find({idModule:module._id}).sort({date:-1}).limit(1);
    res.json({
      ...modDTO,
      lastInfoTrame:t.length>0?getTrameDTO(t[0]):{}
    });
    //res.json(getModuleByIdResponseDTO(module));
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const module = await Module.create({
      //idImei: req.body.idImei,
      stationName: req.body.stationName,
      position: req.body.position,
    });
    res.json(getCreateModuleResponseDTO(module));
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", validateObjectId, async (req, res, next) => {
  try {
    const deleted = await Module.findByIdAndRemove(req.params.id);
    if (!deleted) {
      throw new NotFoundError("No module deleted");
    }
    res.json(getDeleteModuleResponseDTO(deleted));
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", validateObjectId, async (req, res, next) => {
  try {
    const toUpdate = {};
    let activity={};
    const { stationName, position, action,date } = req.body;
    const { id: idModule } = req.params;
    if (action && date) {
      //recherche de la donnnée la plus récente d'un module
      const recentActivity = await Activities.find({ idModule })
      .sort({ date_demarrage: -1 })
      .limit(1);
      switch (action) {
        case "START":
          //avant de demarrer verifier si le module a étè arrété avant
          if (
            (recentActivity.length > 0 && recentActivity[0].date_arret) ||
            recentActivity.length === 0
          ) {
            // on fait la mise à jour en inserant les données dans la tableau des infos
            activity = await Activities.create({
              idModule,
              date_demarrage: date,
            });
            toUpdate.etat = true;
          } else {
            const err = new Error(
              "Impossible de demarrer un module qui n'a pas encore été arrété"
            );
            err.status = 500;
            throw err;
          }
          break;
        case "STOP":
          console.log(recentActivity)
          if (recentActivity.length > 0 && !recentActivity[0].date_arret) {
            //calcul de la difference pour avoir la durée temporaire
            const heure_arret = moment(date);
            const heure_demarrage = moment(recentActivity[0].date_demarrage);
            const dureeFonctTemporaire = heure_arret.diff(heure_demarrage); //en milliseconde
            // on fait la mise à jour en inserant les données dans la tableau des infos
            activity = await Activities.findOneAndUpdate(
              { _id: recentActivity[0]._id },
              { date_arret: date, duration: dureeFonctTemporaire },
              { new: true }
            );
            toUpdate.etat = false; //on signale que le groupe est en arret

            await Module.findByIdAndUpdate(
              idModule,
              { $inc: { duree_fonctionnement: dureeFonctTemporaire } },
              { new: true }
            );
          } else {
            const err = new Error("Impossible d'arreter un module non demarré");
            err.status = 500;
            throw err;
          }
          break;
        default:
          console.log("Choix incorrect de l'action");
      }
    }
    if (stationName) toUpdate.stationName = stationName;
    if (position) toUpdate.position = position;

    const updated = await Module.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      toUpdate,
      { new: true }
    );
    if (!updated) {
      throw new NotFoundError("No module updated");
    }
    res.json(getUpdateModuleResponseDTO(updated));
  } catch (error) {
    next(error);
  }
});
router.get("/:idModule/trames", async (req, res, next) => {
  try {
    const { params = {} } = req;
    const { idModule } = params;
    const { page = 1, limit = 10, from, at} = req.query;
    const query = {};
    if (from && at) {
      query.date = { 
        $gte: new Date(from),
        $lte: new Date(at)
       };
    } else {
      if (from && !at) {
        query.date= { $gte: new Date(from) };
      } else {
        if (!from && at) {
          query.date = new Date(at); //"2023-04-18T12:00:21.074+00:00"
        }
      }
    }
    query.idModule = idModule;
    /*console.log(query);
    var date2 = moment("2014-01-16");
    console.log(date2);*/
    /**
   * db.posts.find({ //query today up to tonight
    created_on: {
        $gte: new Date(2012, 7, 14), 
        $lt: new Date(2012, 7, 15)
    }
})
   */
    //je recherche d'abord sur le module existe
    const module = await Module.findById(idModule);
    if (!module) {
      throw new NotFoundError("id module introuvable");
    }
    const [data, count] = await Promise.all([
      Trame.find(query)
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 }),
      Trame.count(
        query
      ),
    ]);
res.json(getTrameResponseDTO(data, page, limit, count))
  } catch (error) {
    next(error);
  }
});
router.get("/:idModule/activities", async (req, res, next) => {
  const { page = 1, limit = 10, dateStarting, dateStoping } = req.query;
  try {
    const { idModule } = req.params;
    const module = await Module.findOne({ _id: idModule });
    if (!module) {
      throw new NotFoundError("Id Not Found");
    }
    const [activitiesWithOperatingTime, count] = await Promise.all([
      Activities.find({
        idModule,
        date_demarrage: { $gte: new Date(dateStarting) },
        date_arret: { $lte: new Date(dateStoping) },
      })
        .skip((page - 1) * limit)
        .limit(limit),
      Activities.count({
        idModule,
        date_demarrage: { $gte: new Date(dateStoping) },
        date_arret: { $lte: new Date(dateStoping) },
      }),
    ]);
    res.json(
      getActivitiesResponseDTO(activitiesWithOperatingTime, page, limit, count)
    );
  } catch (error) {
    next(error);
  }
});
router.get('/search',async(req, res, next)=>{
  try {
    const { page = 1, limit = 10 , name} = req.query;
    const [modules, count] = await Promise.all([
      //Module.find({ $text: {$search: name},isDeleted: false }){"$regex": "Arm"}
      Module.find({stationName:{$regex: '',$options: 'i'},isDeleted: false })
        .skip((page - 1) * limit)
        .limit(limit),
      Module.count({stationName:{$regex: name,$options: 'i'},isDeleted: false }),
    ]);
    res.json(
      getModuleResponseDTO(modules, page, limit, count)
    );
  } catch (error) {
    next(error);
  }
})
router.get("/:idModule/vidanges", async (req, res, next) => {
  try {
    const { params = {} } = req;
    const { idModule } = params;
    const { page = 1, limit = 10, from, at} = req.query;
    const query = {};
    if (from && at) {
      query.date = { 
        $gte: new Date(from),
        $lte: new Date(at)
       };
    } else {
      if (from && !at) {
        query.date= { $gte: new Date(from) };
      } else {
        if (!from && at) {
          query.date = new Date(at); //"2023-04-18T12:00:21.074+00:00"
        }
      }
    }
    query.idModule = idModule;
    /*console.log(query);
    var date2 = moment("2014-01-16");
    console.log(date2);*/
    /**
   * db.posts.find({ //query today up to tonight
    created_on: {
        $gte: new Date(2012, 7, 14), 
        $lt: new Date(2012, 7, 15)
    }
})
   */
    //je recherche d'abord sur le module existe
    const module = await Module.findById(idModule);
    if (!module) {
      throw new NotFoundError("id module introuvable");
    }
    const [data, count] = await Promise.all([
      Vidange.find(query)
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 }),
        Vidange.count(
        query
      ),
    ]);
res.json(getVidangeResponseDTO(data, page, limit, count))
  } catch (error) {
    next(error);
  }
});
export default router;
