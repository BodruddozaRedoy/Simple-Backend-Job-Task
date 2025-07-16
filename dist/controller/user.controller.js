"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUser = exports.getMe = exports.loginUser = exports.registerUser = void 0;
const user_model_1 = require("../model/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// register user
const registerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password)
            throw { statusCode: 400, message: "No field provided" };
        const existingUser = yield user_model_1.User.findOne({ email });
        if (existingUser)
            throw { statusCode: 400, message: "User already exists" };
        if (password.length < 6)
            throw { statusCode: 400, message: "Password is too short" };
        const hashedPass = yield bcrypt_1.default.hash(password, 10);
        const newUser = new user_model_1.User({
            name,
            email,
            password: hashedPass,
        });
        yield newUser.save();
        res
            .status(201)
            .json({ success: true, message: "User created successfully" });
    }
    catch (error) {
        next(error);
    }
});
exports.registerUser = registerUser;
// login user
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const existingUser = yield user_model_1.User.findOne({ email });
        if (!existingUser)
            throw { statusCode: 400, message: "User not found" };
        const isPassMatch = yield bcrypt_1.default.compare(password, existingUser.password);
        if (!isPassMatch)
            throw { statusCode: 400, message: "Invalid credentials" };
        const token = jsonwebtoken_1.default.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
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
    }
    catch (error) {
        next(error);
    }
});
exports.loginUser = loginUser;
// get me
const getMe = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req;
    try {
        const user = yield user_model_1.User.findById(userId).select("-password");
        if (!user)
            throw { statusCode: 404, message: "User not found" };
        res.status(200).json({
            success: true,
            message: "User fetched successfully",
            data: user,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getMe = getMe;
// get all user
const getAllUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.User.find();
    res.json(users);
});
exports.getAllUser = getAllUser;
