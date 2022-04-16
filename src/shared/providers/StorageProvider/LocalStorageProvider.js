import {resolve} from "path";
import fs from "fs"
import config from "../../../configs/config.js";
import upload from "../../../configs/upload.js";


export class LocalStorageProvider {
    
    async save(file , folder){
        const {uploadDir} = upload;

        await fs.promises.rename(
            resolve(uploadDir, file ),
            resolve(`${uploadDir}/${folder}`, file)
        );
        return file;

    }
    async delete(file , folder){
        const fileName = resolve(`${upload.uploadDir}/${folder}`, file);
        
        try {
            await fs.promises.stat(fileName);
        } catch {
            throw new Error(
                "An Error has ocurred searching for the given file path"
            );
        }
        fs.unlink(fileName, (err) => {
            if (err) throw err;
            console.log(`${fileName} was deleted`);
        });
    }
}