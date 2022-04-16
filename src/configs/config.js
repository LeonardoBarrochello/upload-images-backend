import { fileURLToPath }  from "url"
import {dirname , resolve } from "path"
import { LocalStorageProvider } from "../shared/providers/StorageProvider/LocalStorageProvider.js"
import { S3StorageProvider } from "../shared/providers/StorageProvider/S3StorageProvider.js"



export default {
    address : process.env.API_URL ,
    port : 3000,
    imageURL : {
        s3 : `${process.env.AWS_BUCKET_URL}/uploads/`,
        local : `${process.env.API_URL}/uploads/`
    } 
}