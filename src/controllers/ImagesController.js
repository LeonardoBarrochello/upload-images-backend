import { ImageService } from "../services/ImageService.js";

export class ImagesController {


    constructor(){
         this.imageService = new ImageService()
    }

    async save(request,response){
    
        const { filename , size } = request.file ;

        const { user_id } = request.user;

        await this.imageService.save(filename,size,user_id)
    
        return response.status(201).send()

    }

    async delete(request,response){
        
        const { id } = request.params;

        await this.imageService.delete(id)

        return response.status(201)
    }

    async findByUserId(request,response){

        const { user_id } = request.user;

        const images = await this.imageService.findByUserId(user_id);

        return response.status(200).json(images);
    }

}