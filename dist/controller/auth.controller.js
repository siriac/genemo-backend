"use strict";

var _auth = _interopRequireDefault(require("../../config/auth.config"));
var _models = require("../../src/models");
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
var _user = require("../dto/user.dto");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
exports.signup = function (req, res) {
  console.log(req.body);
  var user = new _models.User({
    username: req.body.username,
    email: req.body.email,
    password: _bcryptjs["default"].hashSync(req.body.password, 8)
  });
  user.save(function (err, user) {
    if (err) {
      console.log(err);
      res.status(500).send({
        message: err
      });
      return;
    }
    if (req.body.roles) {
      _models.Role.find({
        name: {
          $in: req.body.roles
        }
      }, function (err, roles) {
        if (err) {
          res.status(500).send({
            message: err
          });
          return;
        }
        user.roles = roles.map(function (role) {
          return role._id;
        });
        user.save(function (err) {
          if (err) {
            res.status(500).send({
              message: err
            });
            return;
          }
          res.send({
            message: "User was registered successfully!"
          });
        });
      });
    } else {
      _models.Role.findOne({
        name: "user"
      }, function (err, role) {
        if (err) {
          res.status(500).send({
            message: err
          });
          return;
        }
        user.roles = [role._id];
        user.save(function (err) {
          if (err) {
            res.status(500).send({
              message: err
            });
            return;
          }

          //res.send({ message: "User was registered successfully!" });
          res.send((0, _user.getCreateUserResponseDTO)(user));
        });
      });
    }
  });
};
exports.signin = function (req, res) {
  _models.User.findOne({
    username: req.body.username
  }).populate("roles", "-__v").populate("idTownAuthorise", "-__v").exec(function (err, user) {
    if (err) {
      res.status(500).send({
        message: err
      });
      return;
    }
    if (!user) {
      return res.status(404).send({
        message: "User Not found."
      });
    }
    var passwordIsValid = _bcryptjs["default"].compareSync(req.body.password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!"
      });
    }
    var token = _jsonwebtoken["default"].sign({
      id: user.id
    }, _auth["default"].secret, {
      algorithm: 'HS256',
      allowInsecureKeySizes: true,
      expiresIn: 86400 // 24 hours
    });

    var authorities = [];
    for (var i = 0; i < user.roles.length; i++) {
      authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
    }
    res.status(200).send({
      id: user._id,
      username: user.username,
      email: user.email,
      roles: user.roles,
      accessToken: token,
      idTownAuthorise: user.idTownAuthorise
    });
  });
};