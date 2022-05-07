import {resolve} from "path";
import fs from "fs"
import upload from "../../../../configs/upload";
import { IStorageProvider } from "../IStorageProvider";


export class LocalStorageProvider implements IStorageProvider{
    
    async save(file : string , folder : string) : Promise<string>{
        const {uploadDir} = upload;

        await fs.promises.rename(
            resolve(uploadDir, file ),
            resolve(`${uploadDir}/${folder}`, file)
        );
        return file;

    }
    async delete(file : string , folder : string) : Promise<void | Error> {
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

    async getObject(file : string ,folder : string) : Promise<fs.Stats | Error >{
        const fullPath = resolve(`${upload.uploadDir}/${folder}`,file);

        try {
            const fileInfo = await fs.promises.stat(fullPath);
            return fileInfo;

        } catch {
             throw new Error(`cannot access file path : ${fullPath}`);
        }

    }
}