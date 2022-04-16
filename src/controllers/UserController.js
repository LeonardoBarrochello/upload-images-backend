import { UserService } from "../services/UserService.js";



export class UserController {

     
     constructor(){
          this.userService = new UserService();
     }

     async create(request,response) {
         
            const {name,email,password} = request.body;    

            await this.userService.create(name,email,password)
            
            return response.status(200).send()
     }

     async session(request,response) {
           
          const {email , password} = request.body 
          
          const token = await this.userService.session(email,password)
          
          return response.status(200).json(token)
     }
}