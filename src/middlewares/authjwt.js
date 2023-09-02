import jwt from 'jsonwebtoken'
import config from '../../config/auth.config';
import {User,Region,Role} from '../models';
import { NotFoundError } from '../lib/errors';
const verifyToken = (req, res, next) => {
    const token= req.header('Authorization').split(' ')[1];
  if (!token) {
    return res.status(401).send({ message: "No token provided!" });
  }
  jwt.verify(token,
            config.secret,
            (err, decoded) => {
              if (err) {
                return res.status(401).send({
                  message: "Access token is missing or invalid",
                });
              }
              req.userId = decoded.id;
              next();
            });
};

const isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require Admin Role!" });
        return;
      }
    );
  });
};

const autorizeTown = (req, res, next) => {
  let regionName=req.query.regionName || req.params.regionName;
  console.log(regionName)
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    Role.find(
      {
        _id: { $in: user.roles }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }
        Region.find(
          {
            _id: { $in: user.idTownAuthorise }
          },
          (err, regions) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
    console.log(regions)
            for (let i = 0; i < regions.length; i++) {
              if (regions[i].name === regionName) {
                next();
                return;
              }
            }
    
            res.status(403).send({ message: "Accés réfusé à cet région.Vous ne possedez pas de privilege pour avoir accés aux informations des générateurs de cette region" });
            return;
          }
        );
      }
    );
  });
};
const autorize = (roles = [])=>{
  if (typeof roles === 'string') {
    roles = [roles];
}
return [
  // authorize based on user role
  async (req, res, next) => {
    try {
      const user=await User.findById(req.userId).populate({path:"roles",select:['_id','name']});
      if(user){
          if (!user.roles.map(r=>{
              return roles.includes(r.name)
          })
          .includes(true)
          ){
              // user's role is not authorized
              res.status(403).send({ message: "User's role is not authorized" });
              //return res.status(401).json({ message: 'Unauthorized' });
          }
      }
      else{
        throw new NotFoundError('id User Not Found');
      }
    } catch (error) {
      next(error)
    }
      // authentication and authorization successful
      next();
  }
];
}
const isModerator = (req, res, next)=>{
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "moderator") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require Moderator Role!" });
        return;
      }
    );
  });
}
const isOwner=(req, res, next)=>{

}
const authJwt = {
  verifyToken,
  isAdmin,
  isModerator,
  autorize,
  autorizeTown
};
module.exports = authJwt;