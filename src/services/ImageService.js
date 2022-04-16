import fs from "fs";
import { AppError } from "../shared/errors/AppError.js";
import {  resolve } from "path"
import  { DependencyInjection } from "../shared/containers/index.js";
import upload from "../configs/upload.js";
import PostMapper from "../mappers/PostMapper.js"
import config from "../configs/config.js";



export class ImageService {

     imagesRepository;
     storageProvider;
     constructor(){
          this.imagesRepository = new DependencyInjection().getDependency("ImagesRepository")
          this.storageProvider = new DependencyInjection().getDependency(process.env.disk)
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

          await this.imagesRepository.create({ name : filename ,  size : byteToKByte , image_url , userId : user_id})
          
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
          return new Promise(
               (resolve) => {
                    this.syncDbFilesAndServerFiles(user_id).then( async () =>{
                         var imagesSyncronized =  await this.imagesRepository.findByUserId(user_id)
                         var imagesMapped = new PostMapper().toDtoList(imagesSyncronized);
                         console.log("images Sync ==>" , imagesSyncronized)
                         resolve(imagesMapped)
                    })
               }
          );
      }

     async syncDbFilesAndServerFiles(user_id){
          var images = await this.imagesRepository.findByUserId(user_id)
          return new Promise(
               (resolve) =>{
                    images.forEach( async (element) => {
                         var checkIfFileExistsInServer = await this.storageProvider.getObject(element.name , "uploads")
                         .then((data) => {
                              return data
                         })
                         .catch(() => {
                              return false
                         });
                         if(!checkIfFileExistsInServer && element.isFileAccessible){

                              element.isFileAccessible = false;                  
                              await this.imagesRepository.create(element)
                         }
                    }); 
                   
                    resolve()
               }
          )
                    
     }
}