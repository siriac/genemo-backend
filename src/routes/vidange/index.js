import { Router } from "express";
import {
  getCreateVidangeResponseDTO,
  getDeleteVidangeResponseDTO,
  getVidangeByIdResponseDTO,
  getVidangeResponseDTO,
  getUpdateVidangeResponseDTO,
  getVidangeDTO
} from "../../dto/vidange.dto";
import {
  getModuleDTO
} from "../../dto/module.dto";
import { NotFoundError } from "../../lib/errors";
import { validateObjectId } from "../../middlewares/validations";
import { Vidange } from "../../models/vidange";
import { Module } from "../../models/module";
const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const [vidanges, count] = await Promise.all([
      Vidange.find()
        .skip((page - 1) * limit)
        .limit(limit)
        .populate({
          path: "idModule",
          select: ["stationName"],
        }),
      Vidange.count(),
    ]);

    res.json(getVidangeResponseDTO(vidanges, page, limit, count));
  } catch (error) {
    next(error);
  }
});

router.get("/:id", validateObjectId, async (req, res, next) => {
  try {
    const id = req.params.id;
    const vidange = await Vidange.findOne({ _id: id }).populate({
      path: "idModule",
      select: ["stationName"],
    });
    if (!vidange) {
      throw new NotFoundError("Id Not Found");
    }
    res.json(getVidangeByIdResponseDTO(vidange));
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { idModule, date, remarque } = req.body;
    let module = await Module.findById(idModule);
    if (!module) {
      const err = new Error("Id module introuvable");
      err.status = 404;
      throw err;
    }
    const vidange = await Vidange.create({
      idModule,
      date,
      remarque,
    });
    module=await Module.findByIdAndUpdate(
      idModule,
      {
        elapse: {
          milliseconds: 0,
          seconds: 0,
          minutes: 0,
          hours: 0,
          days: 0,
          months: 0,
          years: 0,
        },
      },
      { new: true }
    );
    //send socket
    const moduleDto=getModuleDTO(module)
   global.io.emit("vidangeCreated",{
    ...moduleDto,
    infoVidange:getVidangeDTO(vidange)
  });
    res.json(getCreateVidangeResponseDTO(vidange));
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", validateObjectId, async (req, res, next) => {
  try {
    const deleted = await Vidange.findOneAndUpdate({ _id: req.params.id });
    if (!deleted) {
      throw new NotFoundError("No trame deleted");
    }
    res.json(getDeleteVidangeResponseDTO(deleted));
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", validateObjectId, async (req, res, next) => {
  try {
    const toUpdate = {};
    const { remarque, date } = req.body;
    if (remarque) toUpdate.remarque = remarque;
    if (date) toUpdate.date = date;
    const updated = await Vidange.findOneAndUpdate(
      { _id: req.params.id },
      toUpdate,
      { new: true }
    );
    if (!updated) {
      throw new NotFoundError("No menu updated");
    }
    res.json(getUpdateVidangeResponseDTO(updated));
  } catch (error) {
    next(error);
  }
});

export default router;
