import { Request,  Response } from 'express' ;
import IFile from '../interfaces/IFile';
import { deleteFile } from '../libs/FileLoad';
import { Files } from '../libs/Files';
import { Products } from '../libs/Products';

export const add =  async ( req : Request, res : Response ) => {

    const files : any    = req.files ;
    const code  : string = req.body.code ;
    try {
        if( files.length === 0 ){
            res.status(203).send( { action : false, messagge : 'files required', data : [] } ) ;
            return false ;
        }
        if( code === '' || code === undefined ){
            res.status(203).send( { action : false, messagge : 'code required', data : [] } ) ;
            return false ;
        }
        const file    = new Files() ;
        const product = new Products() ;

        const filesSaved : Array<IFile> = await file.add( files ) ;  

        const filesIds : Array<string> = filesSaved.map( f => f._id ) ; 
        
        const productSaved = await product.pushField( "files", filesIds, code, 'code' ) ;

        res.status(200).send( { action : true, messagge : 'ok', data : productSaved } ) ;
    } 
    catch (error) {
        res.status(400).send( { action : false, messagge : error, data : [] } ) ;
    }
}

export const removeItem =  async ( req : Request, res : Response ) => {

    const path   : string = req.body.path ;
    const code   : string = req.body.code ;
    const idFile : string = req.body.idFile ;

    try {

        if( idFile === '' || idFile === undefined ){
            res.status(203).send( { action : false, messagge : 'idFile required', data : [] } ) ;
            return false ;
        }
        if( code === '' || code === undefined ){
            res.status(203).send( { action : false, messagge : 'code required', data : [] } ) ;
            return false ;
        }
        if( path === '' || path === undefined ){
            res.status(203).send( { action : false, messagge : 'path required', data : [] } ) ;
            return false ;
        }

        const file    = new Files() ;
        const product = new Products() ;
        
        const productFileRemove = await product.pullField( 'files', idFile, code, 'code' ) ;

        const fileRemove = await file.remove( '_id', idFile, path ) ;

        res.status(200).send( { action : true, messagge : 'ok', data : {fileRemove, productFileRemove} } ) ;
    } 
    catch (error) {
        res.status(400).send( { action : false, messagge : error, data : [] } ) ;
    }

}
