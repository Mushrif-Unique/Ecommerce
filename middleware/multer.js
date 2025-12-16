import multer from "multer";
import {v4 as uuid} from "uuid";

const storage = multer.diskStorage({
    destination(req,file,cb){
        cb(null,"./uploads"); //where cb have to save
    },
    filename(req,file,cb){ // provide proper file name to cb
        const id = uuid(); // to get unique id
        const extension = file.originalname.split(".").pop();// To get the extension of the uploaded file
        const filename = `${id}.${extension}`;
        cb(null,filename);
    }
});

export const uploadFiles = multer({storage}).single("image");