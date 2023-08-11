import { getPaginationInfo } from '../lib/util';

export const getRegionDTO = (region) => ({
  id: region._id,
  name: region.name
});

export const getRegionResponseDTO = (regions, page, limit, count) => ({
  data: regions.map(getRegionDTO),
  pagination: getPaginationInfo(page, limit, count),
});

export const getRegionByIdResponseDTO = (region) => ({
  data: getRegionDTO(region),
});

export const getCreateRegionResponseDTO = (region) => ({
  message: 'Success create region',
  id: region._id,
});

export const getDeleteRegionResponseDTO = (region) => ({
  message: 'Success delete region',
  id: region._id,
});

export const getUpdateRegionResponseDTO = (region) => ({
  message: 'Success update region',
  id: region._id,
  name: region.name
});
