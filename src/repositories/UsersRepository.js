import pkg from '@prisma/client';
const { PrismaClient } = pkg;

export class UsersRepository {

     repository;
     constructor(){
        this.repository = new PrismaClient().user
     }
     async create(name , email , password){
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
     async findById(){
     }
     async findByEmail(email){
         
            const user = await this.repository.findFirst( { where : { email : email }})

            return user;
     }
}