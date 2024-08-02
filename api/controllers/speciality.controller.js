import Speciality from "../models/speciality.model.js";
import { errorHandler } from "../utils/error.js";

export const createSpeciality = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const speciality = await Speciality.create({ name, description });
    res.status(201).json(speciality);
  } catch (error) {
    next(errorHandler(error.code, error.message));
  }
};

export const getSpecialities = async (req, res, next) => {
  try {
    const specialities = await Speciality.find();
    res.status(200).json(specialities);
  } catch (error) {
    next(errorHandler(error.code, error.message));
  }
};