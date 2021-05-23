import  { Document } from 'mongoose' ;

export default interface IFile extends Document {
    originalName : string ;
    type         : string ;
    destination  : string ;
    filename     : string ;
    path         : string ;
    createdAt    : Date   ;
    updateAt     : Date   ;
} ;
