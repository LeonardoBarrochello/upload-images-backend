import { AppError } from '../shared/errors/AppError';
import { hash , compare } from 'bcryptjs';
import sign from 'jsonwebtoken';
import auth from '../configs/auth';
import { injectable , inject } from "tsyringe";
import { IUsersRepository } from '../repositories/IUsersRepository';




@injectable()
export class UserService {
 
    constructor(
        @inject("UsersRepository")
        private usersRepository : IUsersRepository
    ){
    }
    async create(name,email,password){
        
        
         const user = await this.usersRepository.findByEmail(email)

         if(user){
             throw new AppError("User already exists" , 400)
         }

         const passwordHash = await hash(password,8)

         await this.usersRepository.create(name,email,passwordHash)

         return;
    }

    async session(email , password){

        const {
            expires_in_token,
            secret_token,
        } = auth

        const user = await this.usersRepository.findByEmail(email)

        if(!user){
            throw new AppError("email or password incorrect!")
        }

        const passwordMatch = await compare(password , user.password)
        

        if(!passwordMatch){
            throw new AppError("email or password incorrect!")
        }

        const token = sign({}, secret_token, {
            subject: String(user.id),
            expiresIn: expires_in_token,
        });


        return {
            user : {
                name : user.name,
                email : user.email
            },
            access_token : token
        }
    }

}