import prismaClient  from "../../prisma";
import { IUsersRepository , User } from "../IUsersRepository"



export class UsersRepository implements IUsersRepository {

     private repository : typeof prismaClient.user;
     constructor(){
        this.repository = prismaClient.user
     }
     async create({name , email , password} : User) : Promise<void>{
         await this.repository.create({
             data : {
                name,
                email,
                password
            }
          }
         )
         return;
     }
     async findById(id : string) : Promise<User>{
          const user = await this.repository.findFirst( { where : { id: id } });
          return user;
     }
     async findByEmail(email : string): Promise<User>{
            const user = await this.repository.findFirst( { where : { email : email }})
            return user;
     }
}