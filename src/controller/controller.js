var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { userModel } from "../model/userModel.js";
import { createToken } from "../utilities/jwt.js";
import { idConverter } from "../utilities/monbIdToStringConverter.js";
import { findDocumentByEmail } from "../utilities/mongoDocumentFinder.js";
import { passwordComparing } from "../utilities/bcrypt.js";
import shortId from "shortid";
import { Types } from "mongoose";
import { urlModel } from "../model/urlModel.js";
export default {
    register: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { name, email, password } = req.body;
        try {
            if (!name || !email || !password) {
                throw new Error("in sufficient data");
            }
            const data = {
                FullName: name,
                Password: password,
                Email: email,
            };
            const newUser = new userModel(data);
            const mongoDoc = yield newUser.save();
            const docId = idConverter(mongoDoc._id);
            const token = createToken(docId, mongoDoc.Email, mongoDoc.FullName);
            res.json({ status: "Registration successfull", token });
        }
        catch (error) {
            if (error instanceof Error) {
                next(error);
            }
        }
    }),
    login: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(req.body);
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                throw new Error("in sufficient data");
            }
            const mongodoc = yield findDocumentByEmail(email);
            if (mongodoc) {
                const isValidPassoword = yield passwordComparing(password, mongodoc.Password);
                if (isValidPassoword) {
                    const docId = idConverter(mongodoc._id);
                    const token = createToken(docId, mongodoc.Email, mongodoc.FullName);
                    res.json({ status: "login successfull", token });
                }
                else {
                    console.log(58);
                    res.status(400).json({ message: "password not matching" });
                }
            }
            else {
                res.status(400).json({ message: "user not found" });
            }
        }
        catch (error) {
            console.log(64);
            next(error);
        }
    }),
    createShortUrl: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.user.id;
            const { longUrl } = req.body;
            console.log(req.body);
            const shortUrl = shortId.generate();
            if (!longUrl || typeof longUrl !== "string") {
                res.status(400).json({ message: "url not found or not valid url" });
            }
            else if (!id) {
                res.status(400).json({ message: "id not valid" });
            }
            else {
                const data = {
                    originalUrl: longUrl,
                    shortUrl: shortUrl,
                    userId: new Types.ObjectId(id),
                };
                const stagedDoc = new urlModel(data);
                const newDocument = yield stagedDoc.save();
                console.log(newDocument);
                res.json({
                    newUrl: `http://localhost:8001/api/getUrl/${newDocument.shortUrl}`,
                });
            }
        }
        catch (error) {
            next(error);
        }
    }),
    fetchUrls: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.user.id;
            if (!id) {
                throw new Error("id not found");
            }
            const data = yield urlModel.find({ userId: id }, { _id: 0, originalUrl: 1, shortUrl: 1 });
            res.json(data);
        }
        catch (error) {
            next(error);
        }
    }),
    redirectUrl: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const shortId = req.params.shortId;
            if (!shortId) {
                res.status(400).json({ message: "url not found" });
            }
            else {
                const fetch = yield urlModel.findOne({ shortUrl: shortId }, { _id: 0, originalUrl: 1 });
                res.redirect(fetch.originalUrl);
            }
        }
        catch (error) {
            next(error);
        }
    }),
    fetchName: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log(req.user);
            const name = yield userModel.findOne({ _id: req.user.id }, { FullName: 1, _id: 0 });
            console.log(name);
            res.json(name);
        }
        catch (error) {
            next(error);
        }
    }),
};
