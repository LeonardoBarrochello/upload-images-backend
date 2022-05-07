import { IImagesRepository } from "./IImagesRepository";
import { User} from "@prisma/client"





interface IUsersRepository {
    create(name , email ,password) : Promise<void> ;
    findById(id) : Promise<User>;
    findByEmail(email) : Promise<User>;
}


export { User , IUsersRepository}