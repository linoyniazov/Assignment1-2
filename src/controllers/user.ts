import userModel from "../models/user";
import { Request, Response } from "express";
import BaseController from "./base_controller";

const userController = new BaseController(userModel);

export default userController;