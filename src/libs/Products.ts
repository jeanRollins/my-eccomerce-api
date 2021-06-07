
import IFile  from '../interfaces/IFile';
import File   from '../models/File';

import Product   from '../models/Product';
import IProduct  from '../interfaces/IProduct';
import { generateSlug } from './Commons';
import { ICategory } from '../models/Category';

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

    public async getByCod()  : Promise<any[]>  {

        const products : IProduct[] = await Product.aggregate([
            { 
                $match : { code : this.code } 
            },
            {
                $lookup : {
                    from : "categories" ,
                    localField : "categories" ,
                    foreignField : "_id" ,
                    as : "categories"
                }    
            },
            { 
                $unwind : "$categories" 
            }
        ]) ;

        const _products : Array<string> = products[0].files.map( f => f.toString() ) ;
        
        const files : IFile[] = await File.find({ 
            _id : {  
                $in : _products
            } 
        }) ;
        
        const dataWithFiles = await this.ordersData( products , files ) ;
        return dataWithFiles ;
    } 

    public async ordersData( data : Array<any> , files : Array<any> ) : Promise<any> {

        if( data.length === 0 ) return {} ;

        let product : IProduct = await data[0] ;

        product.categories  = data.map( c => c.categories ) 
        product.files       = files ;

        return product ;
    }

    public async pushField( 
        field           : string, 
        values          : Array<string>, 
        valueIdentifier : string, 
        identifier      : string = '_id' ) : Promise< Array<any> >   {

        let productsSaved : Array<any> = [] ; 

        for await ( const f of values ){
            const productSaved = await Product.updateOne(
                { 
                    [ identifier ] : valueIdentifier 
                },
                {
                    $push : {
                        [ field ] : f
                    }
                }
            )
            productsSaved.push( productSaved ) ;
        }
        return productsSaved ;
    } 

    public async pullField( field : string, value : string, valueIdentifier : string, identifier : string = '_id' ) {
        
        const productSaved = await Product.updateOne(
            { 
                [ identifier ] : valueIdentifier 
            },
            { 
                $pull : { 
                    [ field ] : value 
                } 
            }
        ) ;
        return productSaved ;
    }

}