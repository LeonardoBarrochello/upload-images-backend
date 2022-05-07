import { Post } from "@prisma/client";


interface IImagesRepository {
    create(post : Post) : Promise<void>;
    findById(id  :string) : Promise<Post>;
    findByUserId(id : string) : Promise<Post[]>;
    delete(id : string): Promise<void>;
    list() : Promise<Post[]> ;
}


export {IImagesRepository , Post}