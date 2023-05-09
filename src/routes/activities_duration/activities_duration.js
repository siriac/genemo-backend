import { Router } from "express";
import moment from "moment";
import {
  getCreateActivitieResponseDTO,
  getDeleteActivitieResponseDTO,
  getActivitieByIdResponseDTO,
  getActivitiesResponseDTO,
} from "../../dto/activitie_duration.dto";
import { NotFoundError } from "../../lib/errors";
import {
  validateObjectId,
  imeiIsRegisted,
} from "../../middlewares/validations";
import { Activities } from "../../models/activities";
import { Module } from "../../models/module";
const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const [activities, count] = await Promise.all([
      Activities.find()
        .skip((page - 1) * limit)
        .limit(limit),
      Activities.count(),
    ]);
    res.json(getActivitiesResponseDTO(activities, page, limit, count));
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const activitie = await Activities.findOne({ _id: id });
    if (!activitie) {
      throw new NotFoundError("Id Not Found");
    }
    res.json(getActivitieByIdResponseDTO(activitie));
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { body = {} } = req;
    let activity,
      date1 = new Date();
    const { action, idModule, date } = body;
    //recherche de la donnnée la plus récente d'un module
    const recentActivity = await Activities.find({ idModule })
      .sort({ date_demarrage: -1 })
      .limit(1);
    if (action === "START") {
      //avant de demarrer verifier si le module a étè arrété avant
      if ((recentActivity.length > 0 && recentActivity[0].date_arret)||recentActivity.length===0) {
        // on fait la mise à jour en inserant les données dans la tableau des infos
        activity = await Activities.create({ idModule, date_demarrage: date });
      } else {

        const err = new Error(
          "Impossible de demarrer un module qui n'a pas encore été arrété"
        );
        err.status = 500;
        throw err;
      }
    } else {
      if (action === "STOP") {
        if (recentActivity.length > 0 && !recentActivity[0].date_arret) {
          // on fait la mise à jour en inserant les données dans la tableau des infos
          activity = await Activities.findOneAndUpdate(
            { _id: recentActivity[0]._id },
            { date_arret: date },
            { new: true }
          );
          /**
           * var now  = "04/09/2013 15:00:00";
var then = "02/09/2013 14:20:30";

var ms = moment(now,"DD/MM/YYYY HH:mm:ss").diff(moment(then,"DD/MM/YYYY HH:mm:ss"));
var d = moment.duration(ms);
var s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");

// outputs: "48:39:30"
           */
          /**
           * var now  = "01/08/2016 15:00:00";
var then = "04/02/2016 14:20:30";
var diff = moment.duration(moment(then).diff(moment(now)));
diff contains 2 months,23 days,23 hours and 20 minutes. But we need result only in days,hours and minutes so the simple solution is:
var days = parseInt(diff.asDays()); //84

var hours = parseInt(diff.asHours()); //2039 hours, but it gives total hours in given miliseconds which is not expacted.

hours = hours - days*24;  // 23 hours

var minutes = parseInt(diff.asMinutes()); //122360 minutes,but it gives total minutes in given miliseconds which is not expacted.

minutes = minutes - (days*24*60 + hours*60); //20 minutes.
           */
          //calcul de la difference
          const heure_arret=moment(date);
          const heure_demarrage=moment(recentActivity[0].date_demarrage);
         const dureeFonctTemporaire =heure_arret.diff(heure_demarrage);//en milliseconde
            //duree_fonctionnement
            await Module.findByIdAndUpdate(idModule, {$inc:{duree_fonctionnement:dureeFonctTemporaire}}, { new: true })
        } else {
          const err = new Error("Impossible d'arreter un module non demarré");
          err.status = 500;
          throw err;
        }
      } else {
        const err = new Error("Type d'action non reconnu");
        err.status = 500;
        throw err;
      }
    }
    res.json(getCreateActivitieResponseDTO(activity));
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const deleted = await Activities.findByIdAndRemove(req.params.id);
    if (!deleted) {
      throw new NotFoundError("No activitie deleted");
    }
    res.json(getDeleteActivitieResponseDTO(deleted));
  } catch (error) {
    next(error);
  }
});
export default router;
