import fs from "fs";
import { AppError } from "../shared/errors/AppError";
import {  resolve } from "path"
import { injectable , inject } from "tsyringe";
import upload from "../configs/upload";
import PostMapper from "../util/mappers/PostMapper"
import config from "../configs/config";
import { IImagesRepository } from "../repositories/IImagesRepository";
import { IStorageProvider } from "../shared/providers/StorageProvider/IStorageProvider";


@injectable()
export class ImageService {

     constructor(
          @inject("ImagesRepository")
          private imagesRepository : IImagesRepository,
          @inject("StorageProvider")
          private storageProvider : IStorageProvider
     ){
     }

     async save(filename , size  , user_id){

          const {uploadDir} = upload

          var fileFullPath = resolve(uploadDir , filename)

          try {
               await fs.promises.stat(fileFullPath)
          
          } catch (err) {
               throw new AppError("Ocorreu algum erro ao acessar o arquivo !" , 500)     
          }

          var byteToKByte = (size/1000).toFixed(1) + "KB" ;

          var image_url = config.imageURL[process.env.disk] + filename;

          await this.imagesRepository.create(
               { 
                    id: null , 
                    name : filename ,  
                    size : byteToKByte , 
                    image_url , 
                    userId : user_id,
                    isFileAccessible : true,
                    createdAt : null,
                    updatedAt : null
               })
          
          await this.storageProvider.save(filename , "uploads")

          return;

     }
     async delete(id){

          const file = await this.imagesRepository.findById(id)

          if(!file){
               throw new AppError("was not possible to find the file")
          }
          
          await this.storageProvider.delete(file.name , "uploads")
          await this.imagesRepository.delete(id)
     }

     async findByUserId(user_id){

          var imagesSyncronized =  await this.imagesRepository.findByUserId(user_id)
          var imagesMapped = new PostMapper().toDtoList(imagesSyncronized);
          return imagesMapped;

      }

     async list(){
          var images = await this.imagesRepository.list();
          return images;
     }

     
}