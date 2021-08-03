import Category  , { ICategory } from "../models/Category";
import { Commons } from "./Commons";
import ObjectID from "bson-objectid";
import Product from "../models/Product";
import IProduct from "../interfaces/IProduct";

export class Categories {

    private _id : string = '' ;

    constructor( _id : string = '' ){
        this._id = _id ;
    }

    static async getAll( parent : string = '' )  {

        
        const categories : ICategory [] =  await Category.find({ parent })  ; 
        
        if( categories.length == 0 ) return []  ;

        let nodeCategories  : any = [] ;

        for await ( let c of categories ) {

            let categoryToSaved =  { id : c._id , name : c.name , type : '' ,data : [] , parent  } ;
            
            const parentFounded  = await this.getAll( c._id ) ; 

            parentFounded.length === 0 && ( categoryToSaved.type = 'tail' );
            
            parentFounded.length !== 0 && ( categoryToSaved = { ...categoryToSaved , type : 'node' , data : parentFounded } ) ;

            nodeCategories.push( categoryToSaved ) ;
        };
        return nodeCategories ;
    }


    
    public async add( name : string, parent : string ) : Promise<ICategory> {

        const slug : string = await Commons.generateSlug( name ) ;

        const category : ICategory = new Category({
            name ,
            slug ,
            parent
        }) ;

        const categorySaved : ICategory = await category.save() ;
        return categorySaved ;
    } 
 
    public async remove( field : string ) : Promise<ICategory>  {

        const categoryRemoved : any = await Category.deleteOne( { [ field ] : this._id } ) ;
      
        return categoryRemoved ;
    }

    public async existInProducts( ) : Promise<boolean> {
        
        const objectValid : boolean = ObjectID.isValid( this._id ) ;

        if( !objectValid ) return false ;

        const id : any = new ObjectID( this._id ) ;
        
        const productsFounded : Array<IProduct> = await Product.find({             
            
            categories : {
                $in : [ id ]
            }  
        }) ;

        return  ( productsFounded.length > 0 ) ;
    }

    public async get( field : string = '', value : string = ''  ){

        const query : object = field === '' && value === '' ? {} : { field : value } ;

        const categories : ICategory [] =  await Category.find( query )  ; 
        
        return categories.length === 0 ? [] : categories ;
    }

}