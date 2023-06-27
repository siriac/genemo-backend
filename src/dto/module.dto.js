import { getPaginationInfo } from "../lib/util";
import {getDurationHoursAndMinutes} from "../lib/dateTime";

export const getModuleDTO = (module) => ({
  id: module._id,
  stationName: module.stationName,
  position: module.position,
  created: module.created,
  duree_fonctionnement: module.duree_fonctionnement,
  duree_fonctionnement_format: module.duree_fonctionnement_format,
  dataRequired: {
    temp: module.dataRequired.temp,
    fuel: module.dataRequired.fuel,
    ph1: module.dataRequired.ph1,
    ph2: module.dataRequired.ph2,
    ph3: module.dataRequired.ph3,
    oilPress: module.dataRequired.oilPress,
    freq: module.dataRequired.freq,
  },
  status: module.status,
  lastData: module?.lastData,
  elapse: module.elapse,
  elapse_total_hours_minutes: getDurationHoursAndMinutes(module.elapse_total),//module.elapse_total,
  elapse_total: module.elapse_total,
  elapse_hours_minutes: getDurationHoursAndMinutes(module.elapse),//module.elapse_total,

});

export const getModuleResponseDTO = (modules, page, limit, count) => ({
  data: modules.map(getModuleDTO),
  pagination: getPaginationInfo(page, limit, count),
});

export const getModuleByIdResponseDTO = (module) => ({
  data: getModuleDTO(module),
});

export const getCreateModuleResponseDTO = (module) => ({
  message: "Module crée avec succés",
  id: module._id,
  stationName: module.stationName,
  stationName: module.stationName,
  position: module.position,
  created: module.created,
  duree_fonctionnement: module.duree_fonctionnement,
  duree_fonctionnement_format: module.duree_fonctionnement_format,
  dataRequired: {
    temp: module.dataRequired.temp,
    fuel: module.dataRequired.fuel,
    ph1: module.dataRequired.ph1,
    ph2: module.dataRequired.ph2,
    ph3: module.dataRequired.ph3,
    oilPress: module.dataRequired.oilPress,
    freq: module.dataRequired.freq,
  },
  status: module.status,
  lastData: module?.lastData,
  elapse: module.elapse,
  elapse_total: module.elapse_total,
});

export const getDeleteModuleResponseDTO = (module) => ({
  message: "Module supprimé avec succés",
  id: module._id,
});

export const getUpdateModuleResponseDTO = (module) => ({
  message: "Module mis à jour avec succés",
  id: module._id,
  stationName: module.stationName,
  position: module.position,
  created: module.created,
  duree_fonctionnement: module.duree_fonctionnement,
  duree_fonctionnement_format: module.duree_fonctionnement_format,
  dataRequired: {
    temp: module.dataRequired.temp,
    fuel: module.dataRequired.fuel,
    ph1: module.dataRequired.ph1,
    ph2: module.dataRequired.ph2,
    ph3: module.dataRequired.ph3,
    oilPress: module.dataRequired.oilPress,
    freq: module.dataRequired.freq,
  },
  status: module.status,
  lastData: module?.lastData,
  elapse: module.elapse,
  elapse_total: module.elapse_total,
  date:module.date
});
