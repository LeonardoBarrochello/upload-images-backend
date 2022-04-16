import cron from "node-cron";

export class Tasks  {
    
    InitializateTasks(){
        console.log("Initializating Tasks . Ignite :  " , new Date())
        this.PrintThirdSecond(); 
    }
    
    PrintThirdSecond(){
        cron.schedule('*/3 * * * * *' , () => {
            console.log("rodando a cada 3 segundos")
       })
    }
}
