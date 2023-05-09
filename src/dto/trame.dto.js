import { getPaginationInfo } from '../lib/util';

export const getTrameDTO = (trame) => ({
  id: trame._id,
  temp: trame.temp,
  fuel: trame.fuel,
  bat: trame.bat,
  ph1: trame.ph1,
  ph2: trame.ph2,
  ph3: trame.ph3,
  freq: trame.freq,
  oilPress: trame.oilPress,
  date:trame.date,
  createdAt:trame.createdAt,
  idModule:trame.idModule



});

export const getTrameResponseDTO = (trames, page, limit, count) => ({
  data: trames.map(getTrameDTO),
  pagination: getPaginationInfo(page, limit, count),
});

export const getTrameByIdResponseDTO = (trame) => ({
  data: getTrameDTO(trame),
});

export const getCreateTrameResponseDTO = (trame) => ({
  message: 'Success create trame',
  id: trame._id,
});

export const getDeleteTrameResponseDTO = (trame) => ({
  message: 'Success delete trame',
  id: trame._id,
});

export const getUpdateTrameResponseDTO = (trame) => ({
  message: 'Success update trame',
  id: trame._id,
  temp: trame.temp,
  fuel: trame.fuel,
  bat: trame.bat,
  ph1: trame.ph1,
  ph2: trame.ph2,
  ph3: trame.ph3,
  freq: trame.freq,
  oilPress: trame.oilPress,
  date:trame.date,
  createdAt:trame.createdAt,
  idModule:trame.idModule
});
