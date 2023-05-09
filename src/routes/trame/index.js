import { Router } from 'express';
import {
    getCreateTrameResponseDTO,
    getDeleteTrameResponseDTO,
  getTrameByIdResponseDTO,
  getTrameResponseDTO,
  getUpdateTrameResponseDTO,
} from '../../dto/trame.dto';
import { NotFoundError } from '../../lib/errors';
import { validateObjectId } from '../../middlewares/validations';
import { Trame } from '../../models/trame';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const [trames, count] = await Promise.all([
        Trame.find()
        .skip((page - 1) * limit)
        .limit(limit)
        .populate({
            path: 'idModule', 
           select: ["stationName"]
          }),
        Trame.count(),
    ]);

    res.json(getTrameResponseDTO(trames, page, limit, count));
  } catch (error) {
    next(error);
  }
});

router.get('/:id', validateObjectId, async (req, res, next) => {
  try {
    const id = req.params.id;
    const trame = await Trame.findOne({ _id: id, isDeleted: false })
    .populate({
        path: 'idModule', 
       select: ["stationName"]
      });
    if (!trame) {
      throw new NotFoundError('Id Not Found');
    }
    res.json(getTrameByIdResponseDTO(trame));
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const trame = await Trame.create(body);
    res.json(getCreateTrameResponseDTO(trame));
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', validateObjectId, async (req, res, next) => {
  try {
    const deleted = await Trame.findOneAndUpdate(
      { _id: req.params.id}
    );
    if (!deleted) {
      throw new NotFoundError('No trame deleted');
    }
    res.json(getDeleteTrameResponseDTO(deleted));
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', validateObjectId, async (req, res, next) => {
  try {
    const toUpdate = {};
    const { temp,fuel,bat,ph1,ph2, ph3,freq,oilPress,status,date,elapsed } = req.body;
    if (temp) toUpdate.temp = temp;
    if (fuel) toUpdate.fuel = fuel;
    if (bat) toUpdate.bat = bat;
    if (ph1) toUpdate.ph1 = ph1;
    if (ph2) toUpdate.ph2 = ph2;
    if (ph3) toUpdate.ph3 = ph3;
    if (freq) toUpdate.freq = freq;
    if (oilPress) toUpdate.oilPress = oilPress;
    if (status) toUpdate.status = status;
    if (date) toUpdate.date = date;

    const updated = await Trame.findOneAndUpdate(
      { _id: req.params.id },
      toUpdate,
      { new: true }
    );
    if (!updated) {
      throw new NotFoundError('No menu updated');
    }
    res.json(getUpdateTrameResponseDTO(updated));
  } catch (error) {
    next(error);
  }
});

export default router;
