import { AppError } from '../shared/errors/AppError.js';
import bcryptPkg from 'bcryptjs';
import jwtPkg from 'jsonwebtoken';
import auth from '../configs/auth.js';
import {DependencyInjection}  from '../shared/containers/index.js';

const { hash , compare } = bcryptPkg;
const {sign} = jwtPkg

export class UserService {

    userRepository;
    constructor(){
        this.userRepository = new DependencyInjection().getDependency("UsersRepository");
    }
    async create(name,email,password){
        
        
         const user = await this.userRepository.findByEmail(email)

         if(user){
             throw new AppError("User already exists" , 400)
         }

         const passwordHash = await hash(password,8)

         await this.userRepository.create(name,email,passwordHash)

         return;
    }

    async session(email , password){

        const {
            expires_in_token,
            secret_token,
        } = auth

        const user = await this.userRepository.findByEmail(email)

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