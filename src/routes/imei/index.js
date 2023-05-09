import { Router } from 'express';
import {
    getCreateImeiResponseDTO,
    getDeleteImeiResponseDTO,
    getImeiByIdResponseDTO,
    getImeiResponseDTO,
    getUpdateImeiResponseDTO,
} from '../../dto/imei.dto';
import { BadRequestError, NotFoundError } from '../../lib/errors';
import { validateObjectId } from '../../middlewares/validations';
import { Imei } from '../../models/imei';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const [imeis, count] = await Promise.all([
        Imei.find()
        .skip((page - 1) * limit)
        .limit(limit),
        Imei.count(),
    ]);

    res.json(getImeiResponseDTO(imeis, page, limit, count));
  } catch (error) {
    next(error);
  }
});

router.get('/:id', validateObjectId, async (req, res, next) => {
  try {
    const id = req.params.id;
    const imei = await Imei.findOne({ _id: id});
    if (!imei) {
      throw new NotFoundError('Id Not Found');
    }
    res.json(getImeiByIdResponseDTO(imei));
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    let imei=await Imei.findOne({imei:req.body.imei}).exec();
    if(imei){
      throw new BadRequestError("Cet imei existe déjà");
    }
    imei = await Imei.create({
        imei: req.body.imei,
    });
    res.json(getCreateImeiResponseDTO(imei));
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', validateObjectId, async (req, res, next) => {
  try {
    const deleted = await Imei.findByIdAndRemove(req.params.id)
    if (!deleted) {
      throw new NotFoundError('No menu deleted');
    }
    res.json(getDeleteImeiResponseDTO(deleted));
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', validateObjectId, async (req, res, next) => {
  try {
    const toUpdate = {};
    const { imei } = req.body;
    if (imei) toUpdate.imei = imei;

    const updated = await Imei.findOneAndUpdate(
      { _id: req.params.id},
      toUpdate,
      { new: true }
    );
    if (!updated) {
      throw new NotFoundError('No menu updated');
    }
    res.json(getUpdateImeiResponseDTO(updated));
  } catch (error) {
    next(error);
  }
});

export default router;
