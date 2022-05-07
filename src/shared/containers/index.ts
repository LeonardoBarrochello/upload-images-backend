import { LocalStorageProvider } from "../providers/StorageProvider/implementations/LocalStorageProvider";
import { S3StorageProvider } from "../providers/StorageProvider/implementations/S3StorageProvider";
import {ImagesRepository} from "../../repositories/implementations/ImagesRepository"
import { UsersRepository } from "../../repositories/implementations/UsersRepository";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IImagesRepository } from "../../repositories/IImagesRepository";
import { IStorageProvider } from "../providers/StorageProvider/IStorageProvider";

import {container} from "tsyringe";



container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository
)

container.registerSingleton<IImagesRepository>(
    "ImagesRepository",
    ImagesRepository
)

const disk = {
    s3 : S3StorageProvider,
    local : LocalStorageProvider
}


container.registerSingleton<IStorageProvider>(
    "StorageProvider",
    disk[process.env.disk]
)



