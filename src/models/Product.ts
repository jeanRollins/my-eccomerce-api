import  {Schema, model} from 'mongoose' ;
import IProduct from '../interfaces/IProduct' ;

const productSchema = new Schema({
    name : {
        type     : String ,
        unique   : true ,
        required : true 
    },
    code : {
        type     : String ,
        required : true   ,
        unique   : true        
    },
    sku : {
        type     : String ,
        required : true   ,
        unique   : true        
    },
    normalPrice : {
        type     : Number ,
        required : true 
    },
    offerPrice : {
        type     : Number 
    },
    slug : {
        type     : String ,
        required : true ,
        unique   : true
    },
    categories : [
        {
            type     : Schema.Types.ObjectId, ref : 'Category' ,
            required : true
        }
    ] ,
    files : [
        {
            type     : Schema.Types.ObjectId, ref : 'File' ,
            required : false ,
        }
    ],
    technicalInformation : {
        type     : String ,
        required : true
    },
    description : {
        type     : String ,
        required : true
    },
    stock : {
        type     : Number , 
        default  : 0
    },
    status : {
        type     : Number ,
        required : true   ,
        default  : 0
    },
    createdAt : {
        type : Date ,
        default : Date.now() 
    },
    updateAt : {
        type : Date ,
        default : Date.now() 
    }
}) ;

export default model<IProduct>( 'Product' , productSchema ) ;
