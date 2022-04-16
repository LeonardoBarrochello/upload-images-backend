import pkg from '@prisma/client';
const { PrismaClient } = pkg;

export class ImagesRepository {

     repository;
     constructor(){
        this.repository = new PrismaClient().post
     }
     async create(element){

        await this.repository.upsert({
            where:{
                id : element.id ? element.id ?? "" : ""
            },
            create : {
                name : element.name,
                size : element.size,
                userId : element.userId,
                image_url : element.image_url
            },
            update:{
                name : element.name,
                size : element.size,
                userId : element.user_id,
                image_url : element.image_url,
                isFileAccessible : element.isFileAccessible,
            },
                                 
        })
        //  if(element.id){
        //      console.log("update =>>" , element.id)
        //      await this.repository.update({
        //          data: {
        //             name : element.name,
        //             size : element.size,
        //             userId : element.user_id,
        //             image_url : element.image_url,
        //             isFileAccessible : element.isFileAccessible,
        //          },
        //          where :{
        //              id : element.id
        //          }
        //      })
        //      return;
        //  }
        //  return await this.repository.create({
        //      data : {
        //         name : element.name,
        //         size : element.size,
        //         userId : element.userId,
        //         image_url : element.image_url
        //     }
        //   }
        //  )

     }
     async findById(id){
          const image = await this.repository.findFirst({ where : { id }})
          return image;
     }
     async findByUserId(user_id){

        const images = await this.repository.findMany( { where : { 
            userId : user_id
        }})

        return images;
        

     }

     async delete(id){
          return await this.repository.delete({where : {id}});
     }

     async all(id){
          return await this.repository.findMany( { where : { id }})
     }
    
}