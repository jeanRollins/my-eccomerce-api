import Category  , { ICategory } from "../models/Category";


interface categoryToSaved {
    id : string ;
    name : string ;
    type : string ;
    data : Array<any> ;

}
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


}