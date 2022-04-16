import { ImageService } from "../../services/ImageService.js";
import { UserService } from "../../services/UserService.js";
import { LocalStorageProvider } from "../providers/StorageProvider/LocalStorageProvider.js";
import { S3StorageProvider } from "../providers/StorageProvider/S3StorageProvider.js";
import {ImagesRepository} from "../../repositories/ImagesRepository.js"
import { UsersRepository } from "../../repositories/UsersRepository.js";


export class DependencyInjection {     
    container = {
        ImagesRepository : null,
        UsersRepository: null,
        s3 : null,
        local : null,
    }
    constructor(){
        this.container.ImagesRepository = new  ImagesRepository(),
        this.container.UsersRepository = new UsersRepository(),
        this.container.s3 =  new S3StorageProvider() ,
        this.container.local = new LocalStorageProvider()
    }
    getDependency(dependencyName){
         return this.container[dependencyName]
    }
}


