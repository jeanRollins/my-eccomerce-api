import { Router } from 'express' ;
import { add, removeItem } from '../controllers/FileController';
import FileLoad from '../libs/FileLoad';

const FileRoutes : Router = Router() ;

FileRoutes.post( '/file/add'    , FileLoad , add ) ;
FileRoutes.post( '/file/remove' , removeItem ) ;

export default FileRoutes ;