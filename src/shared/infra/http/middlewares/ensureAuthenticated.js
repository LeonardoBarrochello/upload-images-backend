import { AppError } from "../../../errors/AppError.js";
import auth from "../../../../configs/auth.js";
import pkg from 'jsonwebtoken';

const {verify} = pkg;

export async function ensureAuthenticated (request,response ,next) {
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