import "dotenv/config";
import config from "../../../configs/config"
import app from "./app"




const {address , port} = config;

app.listen(port , () => {
    console.log(`Server running at ${address}`)
})