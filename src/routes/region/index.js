import { Router } from 'express';
import {
    getCreateRegionResponseDTO,
    getDeleteRegionResponseDTO,
    getRegionByIdResponseDTO,
    getRegionResponseDTO,
    getUpdateRegionResponseDTO,
} from '../../dto/region.dto';
import { NotFoundError } from '../../lib/errors';
import { validateObjectId } from '../../middlewares/validations';
import { Region, Module } from '../../models';
import keycloak from '../../index';
import {authJwt} from '../../middlewares';
const router = Router();
/**
 * ici je dois filter en fonction des roles
 * role admin je renvoyerai toutes les regions 
 * et les autres utilisateurs les regions qui leur a étè affecté par l'administrateur
 */
//cette route sera protegée et accessible seulement par l'utilisateur
router.get('/', [authJwt.verifyToken],authJwt.autorize(["admin"]),async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const [regions, count] = await Promise.all([
        Region.find()
        .skip((page - 1) * limit)
        .limit(limit),
          Region.count(),
    ]);

    res.json(getRegionResponseDTO(regions, page, limit, count));
  } catch (error) {
    next(error);
  }
});
router.get('/:regionName/modules',[authJwt.verifyToken,authJwt.autorizeTown],authJwt.autorize(["admin","user"]),async (req, res, next) =>{
    try {
        const { page = 1, limit = 10, name=''} = req.query;
        const { regionName }=req.params;
        const region=await Region.findOne({name:regionName})
        if(!region){
            throw new NotFoundError('nom de region introuvable');
        }
        const [mods, count] = await Promise.all([
          Module.find({ stationName:{$regex: name,$options: 'i'},idRegion:region._id})
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ createdAt: -1 }),
          Module.count({ stationName:{$regex: name,$options: 'i'},idRegion:region._id}),
        ]);
        const {data,pagination}=getModuleResponseDTO(mods, page, limit, count);
        const modules=await Promise.all(data.map(async d=>{
          const v=await Vidange.find({idModule:d.id}).sort({date:-1}).limit(1);
          const t=await Trame.find({idModule:d.id}).sort({date:-1}).limit(1);
          return {
            ...d,
            infoVidange:v.length>0?getVidangeDTO(v[0]):{},
            lastInfoTrame:t.length>0?getTrameDTO(t[0]):{}
          }
        }))
        res.json(
          {
            modules,
            pagination
          }
        );
      } catch (error) {
        next(error);
      }
});
router.get('/regionToAssign',[authJwt.verifyToken],authJwt.autorize(["admin"]), async (req, res, next)=>{    
    try {
        const { page = 1, limit = 10, idUser} = req.query;
        //verifie si l'utilisateur existe déjà dans MongoDB en fonction de son ID
        const user=await User.findById(idUser);
        if(!user){
            throw new NotFoundError("id user Not Found");
        }
        else{
            const [regions, count] = await Promise.all([
                Region.find({_id:{$nin: user.idTownAuthorise}})
                .skip((page - 1) * limit)
                .limit(limit),
                Region.find({_id:{$nin: user.idTownAuthorise}}).count(),
            ]);
            res.json(getRoleResponseDTO(regions, page, limit, count))
        }
    } catch (error) {
        next(error);
    }
});

export default router;
