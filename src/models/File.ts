import  { Schema, model } from 'mongoose' ;
import IFile from '../interfaces/IFile' ;


const fileSchema = new Schema({
    originalName : {
        type : String ,
        required : true 
    },
    type : {
        type : String ,
        required : true 
    },
    destination : {
        type : String ,
        required : true 
    },
    filename : {
        type : String ,
        required : true ,
        unique : true
    },
    path : {
        type : String ,
        required : true 
    },
    createdAt : {
        type : Date ,
        default : Date.now() 
    },
    updateAt : {
        type : Date ,
        default : Date.now() 
    }
});

export default model<IFile>( 'File' , fileSchema ) ;