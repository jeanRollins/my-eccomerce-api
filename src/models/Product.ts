import  {Schema, model, Document} from 'mongoose' ;


export interface IProduct extends Document {
    name         : string ;
    normal_price : number ;
    offer_price  : number ;
    slug         : string ;
    categories   : Array<number> ;
    stock        : number ;
    created      : Date   ;
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
    created : {
        type : Date ,
        default : Date.now() 
    }

}) ;

export default model<IProduct>( 'Product' , productSchema ) ;
