"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _middlewares = require("../../middlewares");
var _auth = _interopRequireDefault(require("../../controller/auth.controller"));
var _errors = require("../../lib/errors");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = (0, _express.Router)();
/**
 * ici je dois filter en fonction des roles
 * role admin je renvoyerai toutes les regions 
 * et les autres utilisateurs les regions qui leur a étè affecté par l'administrateur
 */
//cette route sera protegée et accessible seulement par l'utilisateur
router.post('/signup', [_middlewares.verifySignUp.checkDuplicateUsernameOrEmail, _middlewares.verifySignUp.checkRolesExisted], _auth["default"].signup);
router.post('/signin', _auth["default"].signin);
var _default = router;
exports["default"] = _default;