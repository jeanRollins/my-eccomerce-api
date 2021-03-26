import  {Schema, model, Document} from 'mongoose' ;


export interface ICategory extends Document {
    name : string  ;
    slug : string ;
} ;

const categorySchema = new Schema({
    name : {
        type : String ,
        unique : true ,
        required : true 
    },
    slug : {
        type : String ,
        unique : true ,
        required : true 
    }
});

export default model<ICategory>( 'Category' , categorySchema ) ;