import {resolve}  from "path"
import crypto from "crypto"

import multer from "multer"

const uploadDirectory = resolve( __dirname , ".." , ".." , "tmp")

export default {
    uploadDir : uploadDirectory,
    dest : resolve(__dirname , ".." , ".." , "tmp"),
    storage : multer.diskStorage({
        destination : function (req, file, cb) {
            cb(null,resolve(__dirname , ".." , ".." , "tmp"))
          },
        filename : (req,file,cb) => {
            const hash = crypto.randomBytes(16);
            const fileName = `${hash.toString("hex")}-${file.originalname}`
            cb(null,fileName)
        }
    }) 
}
