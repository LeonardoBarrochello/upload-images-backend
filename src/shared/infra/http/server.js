import "dotenv/config";
import config from "../../../configs/config.js"
import app from "./app.js"




const {address , port} = config;

app.listen(port , () => {
    console.log(`Server running at ${address}`)
})