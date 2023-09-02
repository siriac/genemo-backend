"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUpdateMenuResponseDTO = exports.getMenuResponseDTO = exports.getMenuDTO = exports.getMenuByIdResponseDTO = exports.getDeleteMenuResponseDTO = exports.getCreateMenuResponseDTO = void 0;
var _util = require("../lib/util");
var getMenuDTO = function getMenuDTO(menu) {
  return {
    id: menu._id,
    name: menu.name,
    description: menu.description
  };
};
exports.getMenuDTO = getMenuDTO;
var getMenuResponseDTO = function getMenuResponseDTO(menus, page, limit, count) {
  return {
    data: menus.map(getMenuDTO),
    pagination: (0, _util.getPaginationInfo)(page, limit, count)
  };
};
exports.getMenuResponseDTO = getMenuResponseDTO;
var getMenuByIdResponseDTO = function getMenuByIdResponseDTO(menu) {
  return {
    data: getMenuDTO(menu)
  };
};
exports.getMenuByIdResponseDTO = getMenuByIdResponseDTO;
var getCreateMenuResponseDTO = function getCreateMenuResponseDTO(menu) {
  return {
    message: 'Success create menu',
    id: menu._id
  };
};
exports.getCreateMenuResponseDTO = getCreateMenuResponseDTO;
var getDeleteMenuResponseDTO = function getDeleteMenuResponseDTO(menu) {
  return {
    message: 'Success delete menu',
    id: menu._id
  };
};
exports.getDeleteMenuResponseDTO = getDeleteMenuResponseDTO;
var getUpdateMenuResponseDTO = function getUpdateMenuResponseDTO(menu) {
  return {
    message: 'Success update menu',
    id: menu._id,
    name: menu.name,
    description: menu.description
  };
};
exports.getUpdateMenuResponseDTO = getUpdateMenuResponseDTO;