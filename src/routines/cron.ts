import cron from "node-cron";
import { IImagesRepository } from "../repositories/IImagesRepository";
import { inject , injectable } from "tsyringe";
import { IStorageProvider } from "../shared/providers/StorageProvider/IStorageProvider";

@injectable()
export class Tasks  {
    
    constructor(
        @inject("ImagesRepository")
        private imagesRepository : IImagesRepository,
        @inject("StorageProvider")
        private storageProvider : IStorageProvider
    ){}

    InitializateTasks(){
        console.log("Initializating Tasks . Ignite :  " , new Date())
        this.PrintThirdSecond(); 
        this.VerifyFilesAccessibility();
    }
    
    PrintThirdSecond(){
        cron.schedule('*/3 * * * * *' , () => {
            console.log("rodando a cada 3 segundos")
       })
    }

    async VerifyFilesAccessibility(){

        cron.schedule('*/30 * * * * *' , async () => {

            var allImages = await this.imagesRepository.list();
   
            allImages.forEach( async (image) => {
   
               if(image.isFileAccessible){
                     var checkIfFileExists = await this.storageProvider.getObject(image.name , "uploads");
                     if(!checkIfFileExists){
                        image.isFileAccessible = false;
                        await this.imagesRepository.create(image);
                     }
               }              
            });
   
        })

       

    }
}
