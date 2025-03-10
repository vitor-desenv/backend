import  crypto from 'crypto'; //já vem no nodejs
import multer from 'multer';

import { extname, resolve } from 'path'; //já vem no nodejs

export default{
    upload(folder: string){
        return{
            storage: multer.diskStorage({
                destination: resolve(__dirname, '..', '..', folder),
                filename: (request, file, callback)=> {
                    const fileHash = crypto.randomBytes(16).toString("hex");
                    const filename = `${fileHash}-${file.originalname}`

                    return callback(null, filename)
                }
            })
        }
    }
}

