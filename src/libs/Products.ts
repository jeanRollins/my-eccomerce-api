
import IFile  from '../interfaces/IFile';
import File   from '../models/File';

import Product   from '../models/Product';
import IProduct  from '../interfaces/IProduct';
import { generateSlug } from './Commons';

export class Products {
    
    private _id  : string = '' ; 
    private code : string = '' ; 


    constructor( id : string = '' , code : string = '' ) {
        this._id  = id ;
        this.code = code ;
    } ;

    public async add ( p : any, files : any ){

        const slug : string = generateSlug( p.name ) ;

        const filesSaved : Array<IFile> = [] ;

        if ( files.length > 0 && files !== undefined ) {

            for await ( const f of files ){

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
        } 

        const product : IProduct = new Product({
            name        : p.name ,
            code        : 'COD' + p.code ,
            sku         : p.sku  ,
            normalPrice : 0 ,
            offerPrice  : 0 ,
            slug        : slug ,
            categories  : p.categories ,
            files       : filesSaved.map( f => f._id ) ,
            technicalInformation : p.technicalInformation ,
            description : p.description ,
            stock       : 0,
            status      : 0 ,
            createdAt   : new Date , 
            updateAt    : new Date 
        }) ;

        const productSaved = await product.save() ;
        return productSaved ;
    }

    public async getByCod(){

        const product : IProduct[] = await Product.aggregate([
            { 
                $match : { code : this.code } 
            },
            {
                $lookup : {
                    from : "files" ,
                    localField : "files" ,
                    foreignField : "_id" ,
                    as : "ProductFiles"
                }    
            }
            
        ]) ;

        return product ;
    } 

}