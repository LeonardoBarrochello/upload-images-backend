import { ImageService } from "../services/ImageService";
import { container } from "tsyringe";
import {Request, Response } from "express";

export class ImagesController {

    private imageService : ImageService

    constructor(){
        this.imageService = container.resolve(ImageService)
    }

    async save(request : Request , response : Response ) : Promise<Response>{
    
        const { filename , size } = request.file;

        const { user_id } = request.user;

        await this.imageService.save(filename,size,user_id)
    
        return response.status(201).send()

    }

    async delete(request : Request , response : Response ) : Promise<Response> {
        
        const { id } = request.params;

        await this.imageService.delete(id)

        return response.status(201)
    }

    async findByUserId(request : Request , response : Response ) : Promise<Response>{

        const { user_id } = request.user;

        const images = await this.imageService.findByUserId(user_id);

        return response.status(200).json(images);
    }

}