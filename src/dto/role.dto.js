import { getPaginationInfo } from '../lib/util';

export const getRoleDTO = (role) => ({
  id: role._id,
  name: role.name
});

export const getRoleResponseDTO = (roles, page, limit, count) => ({
  data: roles.map(getRoleDTO),
  pagination: getPaginationInfo(page, limit, count),
});

export const getRoleByIdResponseDTO = (role) => ({
  data: getRoleDTO(role),
});

export const getCreateRoleResponseDTO = (role) => ({
  message: 'Success create role',
  id: role._id,
});

export const getDeleteRoleResponseDTO = (role) => ({
  message: 'Success delete region',
  id: role._id,
});

export const getUpdateRoleResponseDTO = (role) => ({
  message: 'Success update region',
  id: role._id,
  name: role.name
});
