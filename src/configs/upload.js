import {resolve , dirname}  from "path"
import crypto from "crypto"

import multer from "multer"
import { fileURLToPath } from "url"

const _dirname_ = dirname(fileURLToPath(import.meta.url))
const uploadDirectory = resolve(dirname(fileURLToPath(import.meta.url)) , ".." , ".." , "tmp")

export default {
    uploadDir : uploadDirectory,
    dest : resolve(_dirname_ , ".." , ".." , "tmp"),
    storage : multer.diskStorage({
        destination : function (req, file, cb) {
            cb(null,resolve(_dirname_ , ".." , ".." , "tmp"))
          },
        filename : (req,file,cb) => {
            const hash = crypto.randomBytes(16);
            const fileName = `${hash.toString("hex")}-${file.originalname}`
            cb(null,fileName)
        }
    }) 
}
