import { NextFunction, Request, Response } from "express";
import userModel from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async (req: Request, res: Response) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await userModel.create({
      email: req.body.email,
      password: hashedPassword,
    });
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
  res.status(400).send();
};

const login = async (req: Request, res: Response) => {
  try {
    //verify user
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      res.status(400).send("wrong user name or password");
      return;
    }
    //verify password

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      res.status(400).send("wrong user name or password");
      return;
    }
    if (!process.env.TOKEN_SECRET) {
      res.status(500).send("Server error");
      return;
    }
    //generate token

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRES,
    });
    res.status(200).send({ token: token, _id: user._id });
  } catch (error) {
    res.status(400).send(error);
  }
};

type Payload = {
  _id: string;
};

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.header("authorization");
  const token = authorization && authorization.split(" ")[1];
  if (!token) {
    res.status(401).send("Access Denied");
    return;
  }
  if (!process.env.TOKEN_SECRET) {
    res.status(500).send("Server error");
    return;
  }
  jwt.verify(token, process.env.TOKEN_SECRET, (error, payload) => {
    if (error) {
      res.status(401).send("Access Denied");
      return;
    }
    req.params.userId = (payload as Payload)._id;
    next();
  });
};

export default {
  register,
  login,
};