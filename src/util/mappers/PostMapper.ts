import { Post } from "../../repositories/IImagesRepository"

export default class PostMapper {
    toDto({id,name,size,image_url,userId,isFileAccessible,createdAt,updatedAt} : Post ){     
         if(isFileAccessible){   
             return {
                id,
                name,
                size,
                image_url,
                userId,
                isFileAccessible,
                createdAt,
                updatedAt
             }
         }
        return {
            id,
            name,
            size,
            userId,
            isFileAccessible,
            createdAt,
            updatedAt
        }
    }

    toDtoList(posts : Post[]){
        var images = [];
        posts.forEach( (element) => {
            var postMapped = this.toDto(element)
            images.push(postMapped)
        })
        return images;       
    }
}