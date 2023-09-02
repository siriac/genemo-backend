import { Router } from 'express';
import app from '../../index';
import {
    getCreateRoleResponseDTO,
    getDeleteRoleResponseDTO,
    getRoleByIdResponseDTO,
    getRoleResponseDTO,
    getUpdateRoleResponseDTO,
    getRoleDTO,
    getDeleteRolesResponseDTO
} from '../../dto/role.dto';
import {authJwt} from '../../middlewares';
import { NotFoundError } from '../../lib/errors';
import { validateObjectId } from '../../middlewares/validations';
import { Role,User } from '../../models';
const router = Router();
/**
 * ici je dois filter en fonction des roles
 * role admin je renvoyerai toutes les regions 
 * et les autres utilisateurs les regions qui leur a étè affecté par l'administrateur
 */
router.get('/',[authJwt.verifyToken],authJwt.autorize(["admin"]),async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const [roles, count] = await Promise.all([
        Role.find()
        .skip((page - 1) * limit)
        .limit(limit),
        Role.count(),
    ]);

    res.json(getRoleResponseDTO(roles, page, limit, count));
  } catch (error) {
    next(error);
  }
});
router.get('/roleToAssign',[authJwt.verifyToken],authJwt.autorize(["admin"]), async (req, res, next)=>{    
    try {
        const { page = 1, limit = 10,idUser } = req.query;
        //verifie si l'utilisateur existe déjà dans MongoDB en fonction de son ID
        const user=await User.findById(idUser);
        if(!user){
            throw new NotFoundError("id user Not Found");
        }
        else{
            const [roles, count] = await Promise.all([
                Role.find({_id:{$nin: user.roles}})
                .skip((page - 1) * limit)
                .limit(limit),
                Role.find({_id:{$nin: user.roles}}).count(),
            ]);
            res.json(getRoleResponseDTO(roles, page, limit, count))
        }
    } catch (error) {
        next(error);
    }
});
router.post('/delete',[authJwt.verifyToken],authJwt.autorize("admin"),async (req, res, next) => {
    try {
      const {rolesToDelete}=req.body;
      const rolesDeleted=await Role.deleteMany({_id: { $in: rolesToDelete}});
      res.json(getDeleteRolesResponseDTO(rolesDeleted));
      
    } catch (error) {
      next(error)
    }
      })
export default router;
