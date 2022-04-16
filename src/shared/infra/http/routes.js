import { Router } from "express";
import multer from "multer";
import  uploadConfig  from "../../../configs/upload.js";
import { ImagesController } from "../../../controllers/ImagesController.js";
import { UserController } from "../../../controllers/UserController.js";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated.js";

const router = Router();
const userController = new UserController();
const imageController = new ImagesController();

router.post("/image" , ensureAuthenticated ,  multer(uploadConfig).single("file") 
, (req,res) => imageController.save(req,res));

router.post("/user" , (req,res) =>  userController.create(req,res) );

router.get("/user/images" , ensureAuthenticated , (req,res) => imageController.findByUserId(req,res));

router.post("/user/token/session" , (req,res) => userController.session(req,res) );

router.delete("/user/image/:id" , (req,res) => imageController.delete(req,res));


export {router}