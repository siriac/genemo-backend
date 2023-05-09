import { Router } from 'express';
import moment from 'moment';
import {
    getCreateDataResponseDTO,
    getDeleteDataResponseDTO,
    getDataByIdResponseDTO,
    getDataResponseDTO,
    getUpdateDataResponseDTO,
} from '../../dto/data.dto';
import { NotFoundError } from '../../lib/errors';
import { validateObjectId,imeiIsRegisted } from '../../middlewares/validations';
import { Data } from '../../models/data';

const router = Router(); 

router.get('/', async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const [datas, count] = await Promise.all([
        Data.find()
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 }),
        Data.count(), 
    ]);

    res.json(getDataResponseDTO(datas, page, limit, count));
  } catch (error) {
    next(error);
  }
});

router.get('/:id', validateObjectId, async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await Data.findOne({ _id: id});
    if (!data) {
      throw new NotFoundError('Id Not Found');
    }
    res.json(getDataByIdResponseDTO(data));
  } catch (err) {
    next(err);
  }
});

router.post('/',async (req, res, next) => {
  try {
    const {body={}}=req;
    let data,date1=new Date();
    const {idModule,temperature,fuel,frequence,pression_huile,duree_fonctionnement,date,phase1,phase2}=body;
    //build objet
    const infos={
        idModule,
        temperature,
        fuel,//niveau ou niveau de de carburant en pourcentage
        frequence,
        pression_huile,//nombre numerique en bar
        duree_fonctionnement,
        date,
        phase1,
        phase2
    }
    const toInsert={
            temperature,
            fuel,
            frequence,
            pression_huile,
            duree_fonctionnement,//
            date,
            phase1,
            phase2
        }
    //recherche de la donnnée la plus récente d'un module
    const recentDate=await Data.find({idModule}).sort({date_fin:-1}).limit(1);
    if(recentDate.length>0 && moment(date1).diff(moment(recentDate[0].date_fin),'hours')<1){
        console.log(recentDate[0].date_fin);
        console.log(moment(recentDate[0].date_fin));
        console.log(moment(date1));
        // on fait la mise à jour en inserant les données dans la tableau des infos
        
        data=await Data.findOneAndUpdate(
            { _id:recentDate[0]._id},
            {$push:{infos:toInsert}},
            { new: true }
          );        
    }
    else{
        let d=new Date()
        let minutToSubstrat=moment(d).minutes();
        let st=moment(d).subtract(minutToSubstrat,'minutes');
        st.set('second', 0)
        data={
            idModule,
            date_debut:st,
            date_fin:st.add(1,'hours'), 
            infos:[toInsert]
        }
        data = await Data.create(data);
    }
    
    res.json(getCreateDataResponseDTO(data));
  } catch (error) {
    console.log(error)
    next(error);
  }
});

router.delete('/:id', validateObjectId, async (req, res, next) => {
  try {
    const deleted = await Data.findByIdAndRemove(req.params.id);
    if (!deleted) {
      throw new NotFoundError('No menu deleted');
    }
    res.json(getDeleteDataResponseDTO(deleted));
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', validateObjectId, async (req, res, next) => {
  try {
    const toUpdate = {};
    const { temperature, fuel, frequence,pression_huile,duree_fonctionnement,date} = req.body;
    if (temperature) toUpdate.temperature = temperature;
    if (fuel) toUpdate.fuel = fuel;
    if (frequence) toUpdate.frequence = frequence;
    if (pression_huile) toUpdate.pression_huile = pression_huile;
    if (duree_fonctionnement) toUpdate.duree_fonctionnement = duree_fonctionnement;
    if (date) toUpdate.date = date;

    const updated = await Data.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      toUpdate,
      { new: true }
    );
    if (!updated) {
      throw new NotFoundError('No menu updated');
    }
    res.json(getUpdateDataResponseDTO(updated));
  } catch (error) {
    next(error);
  }
});

export default router;
