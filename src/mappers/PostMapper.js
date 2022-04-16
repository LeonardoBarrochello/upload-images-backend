

const PostWithImageAccessible = {
     id: "",
     name : "",
     image_url: "",
     size : "",
     userId : "",
     isFileAccessible : "",
     createdAt:"",
     updatedAt: "",
}

const PostWithImageNotAccessible = {
    id: "",   
    name : "",
    size: "",
    userId : "",
    isFileAccessible : "",
    createdAt:"",
    updatedAt: "",
}

export default class PostMapper {

    toDto(id,name,size,image_url,userId,isFileAccessible,createdAt,updatedAt){
         var postMapped = {}
         if(isFileAccessible){
             postMapped = Object.assign(PostWithImageAccessible,{
                 id,
                 name,
                 size,
                 image_url,
                 userId,
                 isFileAccessible,
                 createdAt,
                 updatedAt
             })
             return postMapped
         }
         postMapped = Object.assign(PostWithImageNotAccessible,{
            id,
            name,
            size,
            userId,
            isFileAccessible,
            createdAt,
            updatedAt
        })
        return postMapped
    }

    toDtoList(posts){
        var images = [];
        posts.forEach( (element) => {
            var postMapped = this.toDto(
                element.id,
                element.name,
                element.size,
                element.image_url,
                element.userId,
                element.isFileAccessible,
                element.createdAt,
                element.updatedAt,)
            images.push(postMapped)
        })
        return images;       
    }
}