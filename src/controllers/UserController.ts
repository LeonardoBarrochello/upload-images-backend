import { UserService } from "../services/UserService";
import {container} from "tsyringe";
import { Request , Response } from "express";


interface IRequest {
     name : string ; 
     email : string ;
     password : string ;
}


class UserController {

     private userService : UserService

     constructor(){
          this.userService = container.resolve(UserService)
     }

     async create(request : Request , response : Response)  : Promise<Response> {
         
            const { name, email , password } : IRequest = request.body;    

            await this.userService.create(name,email,password)
            
            return response.status(200).send()
     }

     async session(request : Request ,response : Response) : Promise<Response> {
           
          const {email , password } : IRequest = request.body 
          
          const token = await this.userService.session(email,password)
          
          return response.status(200).json(token)
     }
}

export { UserController }