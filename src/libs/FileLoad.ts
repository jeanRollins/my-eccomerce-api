import { v4 as uuid } from 'uuid';
import multer   from "multer";
import path     from "path";
import fs       from 'fs' ;

const filesystem = fs.promises ;

const INPUT_FILE_NAME     : string = 'inputFile' ;
const PATH_IMAGES_PRODUCT : string  = "uploads/products" ;

const storage = multer.diskStorage({

    destination: ( req, file, cb ) : void => cb( null , PATH_IMAGES_PRODUCT ),

    filename    : ( req, file, cb ) : void  => {
        cb( null, uuid() + path.extname( file.originalname )  ) ;
    }
}) ;

export const deleteFile = async ( files : any ) => {

    for await ( const file of files ){
        await filesystem.unlink( file.path ) ; 
    }
} 


export default multer( { storage } ).array( INPUT_FILE_NAME ) ;