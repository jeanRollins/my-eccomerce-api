import  {Schema, model, Document} from 'mongoose' ;


export interface IProduct extends Document {
    name        : string ;
    normalPrice : number ;
    offerPrice  : number ;
    slug        : string ;
    categories  : Array<string> ;
    stock       : number ;
    createdAt   : Date   ;
    updateAt    : Date   ;
} ;

const productSchema = new Schema({

    name : {
        type     : String ,
        unique   : true ,
        required : true ,
    },
    normalPrice : {
        type     : Number ,
        required : true ,
    },
    offerPrice : {
        type     : Number 
    },
    slug : {
        type     : String ,
        required : true ,
        unique   : true
    },
    categories : {
        type     : Schema.Types.ObjectId, ref : 'Category' ,
        required : true 
    },
    stock : {
        type     : Number ,        
        default  : 0
    },
    createdAt : {
        type : Date 
    },
    updateAt : {
        type : Date ,
        default : Date.now() 
    }

}) ;

export default model<IProduct>( 'Product' , productSchema ) ;
