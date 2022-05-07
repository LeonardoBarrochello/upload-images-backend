import { S3} from "aws-sdk";
import fs from "fs";

interface IStorageProvider {
    save(file: string, folder: string): Promise<string>;
    delete(file: string, folder: string): Promise<void | Error>;
    getObject(file: string, folder: string) : Promise<S3.GetObjectOutput | fs.Stats | Error >;
}

export { IStorageProvider };