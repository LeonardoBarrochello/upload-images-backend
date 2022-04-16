import pkg from 'aws-sdk';
import {resolve} from "path"
import fs from "fs"
import upload from '../../../configs/upload.js';
import mime from "mime"

const {S3} = pkg;

export class S3StorageProvider {

    client;
    constructor(){
        this.client = new S3({
            region : process.env.AWS_BUCKET_REGION
        })
    }
    async save(file , folder){
            const fullFilePath = resolve(upload.uploadDir , file)

            const fileContent = await fs.promises.readFile(fullFilePath)

            const ContentType = mime.getType(fullFilePath)

            await this.client.putObject({
                Bucket : `${process.env.AWS_BUCKET}/${folder}`,
                Key : file,
                ACL : "public-read",
                Body : fileContent,
                ContentType           
            })
            .promise()

            await fs.promises.unlink(fullFilePath)

            return file

    }
    async delete(file , folder){
        await this.client.deleteObject({
            Bucket : `${process.env.AWS_BUCKET}/${folder}`,
            Key : file,          
        })
        .promise()

        return;
    }

    async getObject(file , folder){
        
        var getFile = this.client.getObject({
            Bucket : `${process.env.AWS_BUCKET}`,
            Key : `${folder}/${file}`,          
        } , (err ,data) => {
            return data ;
        })
        .promise()
 
        return getFile;
    }
}