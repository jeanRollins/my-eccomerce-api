import IFile from "../interfaces/IFile";
import File from "../models/File";
import { deleteFile } from "./FileLoad";


export class Files {

    private _id :  string = '' ;

    constructor( _id : string = '' ){
        this._id = _id ;
    }

    public async add( files : Array<any> ) : Promise<IFile[]> {

        const filesSaved : Array<IFile> = [] ;

        for await ( const f of files ) {

            const file : IFile = new File({
                originalName : f.originalname ,
                type         : f.mimetype ,
                destination  : f.destination ,
                filename     : f.filename ,
                path         : f.path     ,
                createdAt    : new Date   , 
                updateAt     : new Date 
            }) ;

            const fileSaved = await file.save() ;
            filesSaved.push( fileSaved ) ; 
        }
        return filesSaved ;
    }

    public async remove( field : string, value : string, url : string = '') {

        const fileRemove : any = await File.deleteOne( { [ field ] : [ value ] } ) ;
        
        const pathToDelete : Array<any> = [{ path : `dist/static/uploads/products/${ url }` }] ;

        deleteFile( pathToDelete ) ;

        return fileRemove ;
    }
}