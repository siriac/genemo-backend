import {Role,User} from '../../src/models';

const checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    username: req.body.username
  }).exec((err, user) => {
    if (err) {
        console.log(err)
     next(err)
    }

    if (user) {
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
    }

    // Email
    User.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if (err) {
        next(err)
      }

      if (user) {
        res.status(400).send({ message: "Failed! Email is already in use!" });
        return;
      }
      next();
    });
  });
};

const checkRolesExisted = async (req, res, next) => {
    try {
        const roles = await Role.find();
        if (req.body.roles) {
            for (let i = 0; i < req.body.roles.length; i++) {
              if (!roles.map(r=>r.name).includes(req.body.roles[i])) {
                res.status(400).send({
                  message: `Failed! Role ${req.body.roles[i]} does not exist!`
                });
                return;
              }
            }
          }
        
          next(); 
    } catch (error) {
        next(error)
    }
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted
};
module.exports = verifySignUp;