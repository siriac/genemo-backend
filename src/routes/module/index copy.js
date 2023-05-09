import { Router } from "express";
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
import { NotFoundError } from "../../lib/errors";
import { validateObjectId } from "../../middlewares/validations";
import { Module } from "../../models/module";
import { Data } from "../../models/data";
import {StandBy} from "../../models/standBy";
import {Running} from "../../models/running";
import { Activities } from "../../models/activities";
const router = Router();
const lastDate= async (id)=>{
  const lastData = await Data.find({ idModule:id })
  .sort({ createdAt: -1 })
  .limit(1);
  return lastData
}
router.put("/:stationName", async (req, res, next)=>{
  try {
    let data,date1=new Date();
    const {body={}}=req;
    console.log(req.body);
    const{stationName,position}=req.params;
    const {batterie,fuel,phase1,phase2,date, duration,idRunning,action}=body;
    let module=await Module.findOne({stationName}).exec();
    if(module){
      /**
       * mettre à jour standBy
       */
      console.log(action==="repos")
      if(action==="repos"){
        console.log("je suis dans repos")
      //recherche de la donnnée la plus récente d'un module
    const recentDate=await StandBy.find({stationName}).sort({date_fin:-1}).limit(1);
    if(recentDate.length>0 && moment(date1).diff(moment(recentDate[0].date_fin),'hours')<1){
        console.log(recentDate[0].date_fin);
        console.log(moment(recentDate[0].date_fin));
        console.log(moment(date1));
        // on fait la mise à jour en inserant les données dans la tableau des infos
        data=await StandBy.findOneAndUpdate(
            { _id:recentDate[0]._id},
            {$push:{infos:body}},
            { new: true }
          );        
    }
    else{
      let st=moment(date);
      st.set('second',0).set('minutes',0);
      data = await StandBy.create({
        idModule:module._id.toString(),
        date_debut:st,
        date_fin:st.add(1,'hours'),
        infos:[body]
      });
  }
      }
      else {
        /**
         * mettre à jour running et module 
         */
        if(action==="arret"){
          const running=await Running.findById(idRunning);
          if(running){
            //dr for duration running
            let d1=moment.duration(running.duree);
            let d2=moment.duration(duration);
            console.log(d1);
            console.log("------------")
            console.log(d2);
            d1.add(d2);
            console.log(d1);
            console.log("------------")
            let formatted = moment.utc(d1.asMilliseconds()).format("HH:mm:ss")
            console.log('The formatted time is:', formatted); // "00:35:50"
            await Running.findByIdAndUpdate(running._id,{duree:formatted},{new:true});
            d1=moment.duration(module.duree_temporaire);
            const dft=d1.add(d2)._data;
            d1=moment.duration(module.duree_fonctionnement_format);
            const df=d1.add(d2);
            await Module.findByIdAndUpdate(module._id,{
              duree_temporaire_format:dft,
              duree_fonctionnement:df
            })
          }
        }
      }
    }
    else{
            // cree un nouveau module
            module=module = await Module.create({
              stationName: stationName,
              position: position,
            });
            let d=new Date()
            let minutToSubstrat=moment(d).minutes();
            let st=moment(d).subtract(minutToSubstrat,'minutes');
            st.set('second', 0)
            data={
                idModule:module._id.toString(),
                date_debut:st,
                date_fin:st.add(1,'hours'), 
                infos:[body]
            }
            data = await StandBy.create(data);
    }
    res.status(200).json({
      status:"Ok",
      idModule:module._id.toString()
    })
  } catch (error) {
    next(error)
  }
})
router.post("/:stationName", async (req, res, next)=>{
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
})
router.get("/", async (req, res, next) => {
  try {
    const { page = 1, limit = 10, name=''} = req.query;
    const [modules, count] = await Promise.all([
      Module.find({ stationName:{$regex: name,$options: 'i'}, isDeleted: false })
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 }),
      Module.count({ stationName:{$regex: name,$options: 'i'},isDeleted: false }),
    ]);
    let activitieWithOperatingTime = await Promise.all(
      modules.map(async (m) => {
        const result= {
          ...m._doc,
        duree_fonctionnement_format: moment.duration(m.duree_fonctionnement)._data,
        }
        const ld=await lastDate(m._id.toString());

        if(ld.length>0){
          result.lastData={ data: ld[0].infos[ld[0].infos.length - 1],
            date_debut: ld[0].date_debut,
            date_fin: ld[0].date_fin }
        }
        else{
          result.lastData={}
        }
        return result
      })
      /*modules.map((m) => ({
        ...m._doc,
        duree_fonctionnement: moment.duration(m.duree_fonctionnement)._data,
        //lastData:lastDate(m._id.toString()).length
      }))*/
    );
    //console.log(activitieWithOperatingTime);
    /*let m=modules.map(m=>({
  Y:parseInt(moment.duration(m.duree_fonctionnement).asYears()),
  M:parseInt(moment.duration(m.duree_fonctionnement).asMonths()),
  d:parseInt(moment.duration(m.duree_fonctionnement).asDays()),
  h:parseInt(moment.duration(m.duree_fonctionnement).asHours()),
  mi:parseInt(moment.duration(m.duree_fonctionnement).asMinutes()),
  s:parseInt(moment.duration(m.duree_fonctionnement).asSeconds())
}));
console.log(m[0].Y._data);*/
    res.json(
      getModuleResponseDTO(activitieWithOperatingTime, page, limit, count)
    );
  } catch (error) {
    next(error);
  }
});

router.get("/:id", validateObjectId, async (req, res, next) => {
  try {
    const id = req.params.id;
    let lastInfo={}
    let result={};
    const module = await Module.findOne({ _id: id });
    if (!module) {
      throw new NotFoundError("Id Not Found");
    }
    //get last infos
    const lastData = await Data.find({ idModule:id })
      .sort({ createdAt: -1 })
      .limit(1);
      if(lastData.length>0){
         lastInfo = lastData[0];
         lastInfo={ data: lastInfo.infos[lastInfo.infos.length - 1],
          date_debut: lastInfo.date_debut,
          date_fin: lastInfo.date_fin }
      }
      module.duree_fonctionnement=moment.duration(module.duree_fonctionnement)._data;
      //console.log(moment.duration(module.duree_fonctionnement)._data);
   // const info = getDataResponseDTO(data, page, limit, count);
   const info=getModuleByIdResponseDTO(module);
   result={
    ...info,

    lastInfo
   }
    res.json(result);
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
router.get("/:idModule/data", async (req, res, next) => {
  try {
    const { params = {} } = req;
    const { idModule } = params;
    const { page = 1, limit = 10, from, at, last } = req.query;
    const query = {};
    if (from && at) {
      query.date_debut = { $gte: new Date(from) };
      query.date_fin = { $lte: new Date(at) };
    } else {
      if (from && !at) {
        query.date_debut = { $gte: new Date(from) };
      } else {
        if (!from && at) {
          query.date_debut = new Date(at); //"2023-04-18T12:00:21.074+00:00"
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
      Data.find(query)
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 }),
      Data.count({
        idModule,
        date_debut: { $gte: from },
        date_fin: { $lte: at },
      }),
    ]);
res.json(getDataResponseDTO(data, page, limit, count))
    
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
    console.log(name)
    const [modules, count] = await Promise.all([
      //Module.find({ $text: {$search: name},isDeleted: false }){"$regex": "Arm"}
      Module.find({stationName:{$regex: '',$options: 'i'},isDeleted: false })
        .skip((page - 1) * limit)
        .limit(limit),
      Module.count({stationName:{$regex: name,$options: 'i'},isDeleted: false }),
    ]);
    let activitieWithOperatingTime = await Promise.all(
      modules.map(async (m) => {
        const result= {
          ...m._doc,
        duree_fonctionnement_format: moment.duration(m.duree_fonctionnement)._data,
        }
        const ld=await lastDate(m._id.toString());

        if(ld.length>0){
          result.lastData={ data: ld[0].infos[ld[0].infos.length - 1],
            date_debut: ld[0].date_debut,
            date_fin: ld[0].date_fin }
        }
        else{
          result.lastData={}
        }
        return result
      })
    );
    res.json(
      getModuleResponseDTO(activitieWithOperatingTime, page, limit, count)
    );
  } catch (error) {
    next(error);
  }
})
export default router;
