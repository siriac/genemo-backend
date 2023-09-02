"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserResponseDTO = exports.getUserDTO = exports.getUserByIdResponseDTO = exports.getUpdateUserResponseDTO = exports.getDeleteUserResponseDTO = exports.getCreateUserResponseDTO = void 0;
var _util = require("../lib/util");
var getUserDTO = function getUserDTO(user) {
  return {
    id: user._id,
    username: user.username,
    email: user.email,
    keycloakId: user.keycloakId,
    roles: user.roles,
    idTownAuthorise: user.idTownAuthorise
  };
};
exports.getUserDTO = getUserDTO;
var getUserResponseDTO = function getUserResponseDTO(users, page, limit, count) {
  return {
    users: users.map(getUserDTO),
    pagination: (0, _util.getPaginationInfo)(page, limit, count)
  };
};
exports.getUserResponseDTO = getUserResponseDTO;
var getUserByIdResponseDTO = function getUserByIdResponseDTO(user) {
  return {
    data: getUserDTO(user)
  };
};
exports.getUserByIdResponseDTO = getUserByIdResponseDTO;
var getCreateUserResponseDTO = function getCreateUserResponseDTO(user) {
  return {
    message: "User was registered successfully!",
    id: user._id
  };
};
exports.getCreateUserResponseDTO = getCreateUserResponseDTO;
var getDeleteUserResponseDTO = function getDeleteUserResponseDTO(user) {
  return {
    message: 'Success delete user',
    id: user._id
  };
};
exports.getDeleteUserResponseDTO = getDeleteUserResponseDTO;
var getUpdateUserResponseDTO = function getUpdateUserResponseDTO(user) {
  return {
    message: 'Success update user',
    id: user._id,
    username: user.username,
    email: user.email,
    keycloakId: user.keycloakId,
    roles: user.roles,
    idTownAuthorise: user.idTownAuthorise
  };
};
exports.getUpdateUserResponseDTO = getUpdateUserResponseDTO;