"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUpdateRoleResponseDTO = exports.getRoleResponseDTO = exports.getRoleDTO = exports.getRoleByIdResponseDTO = exports.getDeleteRoleResponseDTO = exports.getCreateRoleResponseDTO = void 0;
var _util = require("../lib/util");
var getRoleDTO = function getRoleDTO(role) {
  return {
    id: role._id,
    name: role.name
  };
};
exports.getRoleDTO = getRoleDTO;
var getRoleResponseDTO = function getRoleResponseDTO(roles, page, limit, count) {
  return {
    data: roles.map(getRoleDTO),
    pagination: (0, _util.getPaginationInfo)(page, limit, count)
  };
};
exports.getRoleResponseDTO = getRoleResponseDTO;
var getRoleByIdResponseDTO = function getRoleByIdResponseDTO(role) {
  return {
    data: getRoleDTO(role)
  };
};
exports.getRoleByIdResponseDTO = getRoleByIdResponseDTO;
var getCreateRoleResponseDTO = function getCreateRoleResponseDTO(role) {
  return {
    message: 'Success create role',
    id: role._id
  };
};
exports.getCreateRoleResponseDTO = getCreateRoleResponseDTO;
var getDeleteRoleResponseDTO = function getDeleteRoleResponseDTO(role) {
  return {
    message: 'Success delete region',
    id: role._id
  };
};
exports.getDeleteRoleResponseDTO = getDeleteRoleResponseDTO;
var getUpdateRoleResponseDTO = function getUpdateRoleResponseDTO(role) {
  return {
    message: 'Success update region',
    id: role._id,
    name: role.name
  };
};
exports.getUpdateRoleResponseDTO = getUpdateRoleResponseDTO;