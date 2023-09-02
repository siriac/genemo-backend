import { Router } from 'express';
import app from '../../index';
import {
    getCreateUserResponseDTO,
    getDeleteUserResponseDTO,
    getUserByIdResponseDTO,
    getUserResponseDTO,
    getUpdateUserResponseDTO,
    getUserDTO,
    getDeleteUsersResponseDTO
} from '../../dto/user.dto';
import { NotFoundError } from '../../lib/errors';
import {authJwt,verifySignUp} from '../../middlewares';
import { validateObjectId } from '../../middlewares/validations';
import { User } from '../../models';
import bcrypt from 'bcryptjs';
import mongoose from "mongoose";

const router = Router();
/**
 * ici je dois filter en fonction des roles
 * role admin je renvoyerai toutes les regions 
 * et les autres utilisateurs les regions qui leur a étè affecté par l'administrateur
 */
router.get('/',[authJwt.verifyToken],authJwt.autorize("admin"),async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const [users, count] = await Promise.all([
        User.find()
        .skip((page - 1) * limit)
        .limit(limit)
        .populate({path:"roles",select:['_id','name']})
        .populate({path:"idTownAuthorise",select:['_id','name']}),
          User.count(),
    ]);

    res.json(getUserResponseDTO(users, page, limit, count));
  } catch (error) {
    next(error);
  }
});
router.get('/:idUser',[authJwt.verifyToken],authJwt.autorize("admin"),async (req, res, next) => {
  try {
    const {idUser}=req.params;
    const user=await User.findById(idUser)
    .populate({path:"roles",select:['_id','name']})
    .populate({path:"idTownAuthorise",select:['_id','name']})
    if(!user){
      const err= new NotFoundError("idUser introuvable");
      throw err;
    }
    res.json(getUserByIdResponseDTO(user));
  } catch (error) {
    next(error);
  }
});
router.post('/auth',async (req, res, next)=>{
    const {sub, preferred_username, email}=req.kauth.grant.access_token.content;
    
    try {
        //verifie si l'utilisateur existe déjà dans MongoDB en fonction de son ID
        const existingUser=await User.findOne({keycloakId:sub});
        if(existingUser){
            res.json(getUserDTO(existingUser))
        }
        else{
            const newUser=new User({
                keycloakId:sub,
                name:preferred_username,
                email,
                roles:[]
            });
            await newUser.save();
            res.json(getUserDTO(newUser))
        }
    } catch (error) {
        next(error);
    }
});
router.patch('/:idUser', [authJwt.verifyToken],authJwt.autorize("admin"), async (req, res, next) => {
    try {
      let toUpdate = {};
      const {userId}=req;
      const {idUser}=req.params;
      const {details,credentials,assignRole,unassignRole,assignTown,unassignTown } = req.body;
      const user= await User.findById(idUser);
      
      if(!user)
      {
        new NotFoundError('Id user introuvable');
      }
      if(details)
      {
        toUpdate={
            ...req.body.details
        } 
      }
      else{
          if(credentials)
          {

            var passwordIsValid = bcrypt.compareSync(
                credentials.password,
                user.password
              );
              if (!passwordIsValid) {
                  const err = new Error(
                    "Mot de passe invalide"
                  );
                  err.status = 500;
                  throw err;
              }
        toUpdate={
            password:bcrypt.hashSync(credentials.newPassword, 8),
        }
          }
          else{
              if(assignRole){
                toUpdate={
                    roles:[...user.roles, ...assignRole.roles]  
                } 
              }
              else{
                  if(unassignRole){
                    toUpdate={
                        roles:user.roles.map(ro=>ro.toString()).filter(r=>!unassignRole.roles.includes(r))
                    }
                  }
                  else{
                      if(assignTown){
                        toUpdate={
                            idTownAuthorise:[...user.idTownAuthorise, ...assignTown.towns]  
                        } 
                      }
                      else{
                          if(unassignTown){
                              console.log(unassignTown.towns.map(to=>mongoose.Types.ObjectId(to)));
                            toUpdate={
                                idTownAuthorise:user.idTownAuthorise.map(it=>it.toString()).filter(t=>!unassignTown.towns.includes(t))
                            }
                          }
                          else{
                            throw new NotFoundError("Critére introuvable");
                          }
                      }
                  }
              }
          }
      }
      const updated = await User.findOneAndUpdate(
        { _id: userId },
        toUpdate,
        { new: true }
      )
      .populate({path:"roles",select:['_id','name']})
      .populate({path:"idTownAuthorise",select:['_id','name']})
      if (!updated) {
        throw new NotFoundError('No user updated');
      }
      res.json(getUpdateUserResponseDTO(updated));
    } catch (error) {
      next(error);
    }
  });
  router.patch('/:idUser/details', [authJwt.verifyToken,verifySignUp.checkDuplicateUsernameOrEmail],async(req, res, next)=>{
    try {
      let toUpdate = {};
      const {userId}=req;
      const {idUser}=req.params;
      const {details} = req.body;
      const user= await User.findById(idUser);
      
      if(!user)
      {
        new NotFoundError('Id user introuvable');
      }
        toUpdate={
            ...req.body.details
        } 
      const updated = await User.findOneAndUpdate(
        { _id: idUser },
        toUpdate,
        { new: true }
      )
      .populate({path:"roles",select:['_id','name']})
      .populate({path:"idTownAuthorise",select:['_id','name']})
      if (!updated) {
        throw new NotFoundError('No user updated');
      }
      res.json(getUpdateUserResponseDTO(updated));
    } catch (error) {
      next(error);
    }
  })
  router.patch('/:idUser/credentials', [authJwt.verifyToken],async(req, res, next)=>{
    try {
      let toUpdate = {};
      const {userId}=req;
      const {idUser}=req.params;
      const {credentials} = req.body;
      const user= await User.findById(idUser);
      
      if(!user)
      {
        new NotFoundError('Id user introuvable');
      }
      var passwordIsValid = bcrypt.compareSync(
        credentials.password,
        user.password
      );
      if (!passwordIsValid) {
          const err = new Error(
            "Mot de passe invalide"
          );
          err.status = 500;
          throw err;
      }
toUpdate={
    password:bcrypt.hashSync(credentials.newPassword, 8),
}
      const updated = await User.findOneAndUpdate(
        { _id: userId },
        toUpdate,
        { new: true }
      )
      .populate({path:"roles",select:['_id','name']})
      .populate({path:"idTownAuthorise",select:['_id','name']})
      if (!updated) {
        throw new NotFoundError('No user updated');
      }
      res.json(getUpdateUserResponseDTO(updated));
    } catch (error) {
      next(error);
    }
  })
  router.patch('/:idUser/assignRole', [authJwt.verifyToken],authJwt.autorize("admin"),async(req, res, next)=>{
    try {
      let toUpdate = {};
      const {userId}=req;
      const {idUser}=req.params;
      const {details,credentials,assignRole,unassignRole,assignTown,unassignTown } = req.body;
      const user= await User.findById(idUser);
      
      if(!user)
      {
        new NotFoundError('Id user introuvable');
      }
      toUpdate={
        roles:[...user.roles, ...assignRole.roles]  
    } 
      const updated = await User.findOneAndUpdate(
        { _id: idUser },
        toUpdate,
        { new: true }
      )
      .populate({path:"roles",select:['_id','name']})
      .populate({path:"idTownAuthorise",select:['_id','name']})
      if (!updated) {
        throw new NotFoundError('No user updated');
      }
      res.json(getUpdateUserResponseDTO(updated));
    } catch (error) {
      next(error);
    }
  })
  router.patch('/:idUser/unassignRole', [authJwt.verifyToken],authJwt.autorize("admin"),async(req, res, next)=>{
    try {
      let toUpdate = {};
      const {userId}=req;
      const {idUser}=req.params;
      const {unassignRole} = req.body;
      console.log("unassignRole")
      const user= await User.findById(idUser);
      
      if(!user)
      {
        new NotFoundError('Id user introuvable');
      }
      toUpdate={
        roles:user.roles.map(ro=>ro.toString()).filter(r=>!unassignRole.roles.includes(r))
    }
      const updated = await User.findOneAndUpdate(
        { _id: idUser },
        toUpdate,
        { new: true }
      )
      .populate({path:"roles",select:['_id','name']})
      .populate({path:"idTownAuthorise",select:['_id','name']})
      if (!updated) {
        throw new NotFoundError('No user updated');
      }
      res.json(getUpdateUserResponseDTO(updated));
    } catch (error) {
      next(error);
    }
  })
  router.patch('/:idUser/assignTown', [authJwt.verifyToken],authJwt.autorize("admin"),async(req, res, next)=>{
    try {
      let toUpdate = {};
      const {userId}=req;
      const {idUser}=req.params;
      const {assignTown} = req.body;
      const user= await User.findById(idUser);
      
      if(!user)
      {
        new NotFoundError('Id user introuvable');
      }
      toUpdate={
        idTownAuthorise:[...user.idTownAuthorise, ...assignTown.towns]  
    }
      const updated = await User.findOneAndUpdate(
        { _id: idUser },
        toUpdate,
        { new: true }
      )
      .populate({path:"roles",select:['_id','name']})
      .populate({path:"idTownAuthorise",select:['_id','name']})
      if (!updated) {
        throw new NotFoundError('No user updated');
      }
      res.json(getUpdateUserResponseDTO(updated));
    } catch (error) {
      next(error);
    }
  })
  router.patch('/:idUser/unassignTown', [authJwt.verifyToken],authJwt.autorize("admin"), async (req, res, next) => {
    try {
      let toUpdate = {};
      const {userId}=req;
      const {idUser}=req.params;
      const {unassignTown } = req.body;
      const user= await User.findById(idUser);
      
      if(!user)
      {
        new NotFoundError('Id user introuvable');
      }
      toUpdate={
        idTownAuthorise:user.idTownAuthorise.map(it=>it.toString()).filter(t=>!unassignTown.towns.includes(t))
    }
      const updated = await User.findOneAndUpdate(
        { _id: idUser },
        toUpdate,
        { new: true }
      )
      .populate({path:"roles",select:['_id','name']})
      .populate({path:"idTownAuthorise",select:['_id','name']})
      if (!updated) {
        throw new NotFoundError('No user updated');
      }
      res.json(getUpdateUserResponseDTO(updated));
    } catch (error) {
      next(error);
    }
  });
  router.post('/delete',[authJwt.verifyToken],authJwt.autorize("admin"),async (req, res, next) => {
try {
  const {usersToDelete}=req.body;
  const userDeleted=await User.deleteMany({_id: { $in: usersToDelete}});
  res.json(getDeleteUsersResponseDTO(userDeleted));
  
} catch (error) {
  next(error)
}
  })
  export default router;
