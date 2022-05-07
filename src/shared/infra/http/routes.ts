import { Router } from "express";
import multer from "multer";
import { container } from "tsyringe";
import  uploadConfig  from "../../../configs/upload";
import { ImagesController } from "../../../controllers/ImagesController";
import { UserController } from "../../../controllers/UserController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

const userController =  container.resolve(UserController);
const imageController = new ImagesController();
const router = Router();

router.post("/image" , ensureAuthenticated ,  multer(uploadConfig).single("file") 
, (req,res) => imageController.save(req,res) );

router.post("/user" , (req,res) => userController.create(req,res));

router.get("/user/images" , ensureAuthenticated ,(req,res) =>  imageController.findByUserId(req,res) );

router.post("/user/token/session" , (req,res) =>  userController.session(req,res) );

router.delete("/user/image/:id" ,(req,res) =>  imageController.delete(req,res) );


export {router}