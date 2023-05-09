import { getPaginationInfo } from '../lib/util';

export const getVidangeDTO = (vidange) => ({
  id: vidange._id,
  remarque: vidange.remarque,
  date: vidange.date,
  createdAt: vidange.createdAt,
  idModule:vidange.idModule,
  doBy:vidange.doBy
});

export const getVidangeResponseDTO = (vidanges, page, limit, count) => ({
  data: vidanges.map(getVidangeDTO),
  pagination: getPaginationInfo(page, limit, count),
});

export const getVidangeByIdResponseDTO = (vidange) => ({
  data: getVidangeDTO(vidange),
});

export const getCreateVidangeResponseDTO = (vidange) => ({
  message: 'Success create vidange',
  id: vidange._id,
});

export const getDeleteVidangeResponseDTO = (vidange) => ({
  message: 'Success delete vidange',
  id: trame._id,
});

export const getUpdateVidangeResponseDTO = (vidange) => ({
  message: 'Success update vidange',
  id: vidange._id,
  remarque: vidange.remarque,
  date: vidange.date,
  createdAt: vidange.createdAt,
  idModule:vidange.idModule
});
