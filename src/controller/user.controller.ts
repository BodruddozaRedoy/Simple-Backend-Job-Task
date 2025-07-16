import { NextFunction, Request, Response } from "express";
import { User } from "../model/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// register user
export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password)
      throw { statusCode: 400, message: "No field provided" };
    const existingUser = await User.findOne({ email });
    if (existingUser) throw { statusCode: 400, message: "User already exists" };
    if (password.length < 6)
      throw { statusCode: 400, message: "Password is too short" };
    const hashedPass = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPass,
    });
    await newUser.save();
    res
      .status(201)
      .json({ success: true, message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

// login user
export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) throw { statusCode: 400, message: "User not found" };
    const isPassMatch = await bcrypt.compare(password, existingUser.password);
    if (!isPassMatch) throw { statusCode: 400, message: "Invalid credentials" };
    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });
    const user = {
      _id: existingUser._id,
      name: existingUser.name,
      email: existingUser.email,
    };
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: user,
      token,
    });
  } catch (error) {
    next(error);
  }
};

// get me
export const getMe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req as any;
  try {
    const user = await User.findById(userId).select("-password");
    if (!user) throw { statusCode: 404, message: "User not found" };
    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
