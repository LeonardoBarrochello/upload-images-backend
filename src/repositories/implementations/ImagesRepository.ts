import { IImagesRepository, Post } from "../IImagesRepository";
import prismaClient from "../../prisma"

export class ImagesRepository implements IImagesRepository{

     private repository : typeof prismaClient.post;
     constructor(){
        this.repository = prismaClient.post
     }
     async create(element : Post) : Promise<void> {

         if(element.id){
            
             await this.repository.update({
                 data: {
                    name : element.name,
                    size : element.size,
                    userId : element.userId,
                    image_url : element.image_url,
                    isFileAccessible : element.isFileAccessible,
                 },
                 where :{
                     id : element.id
                 }
             })
             return;
         }
         await this.repository.create({
             data : {
                name : element.name,
                size : element.size,
                userId : element.userId,
                image_url : element.image_url
            }
          }
         )
         return;

     }
     async findById(id : string) : Promise<Post> {
          const image = await this.repository.findFirst({ where : { id }})
          return image;
     }
     async findByUserId(user_id : string) : Promise<Post[]> {

        const images = await this.repository.findMany( { where : { 
            userId : user_id
        }})

        return images;
        
     }


     async delete(id : string) : Promise<void>{
          await this.repository.delete({where : {id}});
     }

     async list() : Promise<Post[]>{
          return await this.repository.findMany( { where : { } })
     }
    
}