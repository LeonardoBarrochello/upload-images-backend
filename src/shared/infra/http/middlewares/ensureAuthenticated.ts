import { AppError } from "../../../errors/AppError";
import auth from "../../../../configs/auth";
import {verify} from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";


export async function ensureAuthenticated (request : Request , response : Response , next : NextFunction) {
     const authHeader = request.headers.authorization ;

     if(!authHeader){
          throw new AppError("token missing!",401)
     }

     const [ , token ] = authHeader.split(" ") ;

     try {
           const { sub : user_id } = verify(token ,auth.secret_token);

           request.user = {
                user_id
           }

           next()

     } catch (error) {
            throw new AppError("Invalid Token!" , 401)
     }

}