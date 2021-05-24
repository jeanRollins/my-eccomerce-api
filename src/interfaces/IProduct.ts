import  { Document} from 'mongoose' ;

export default interface IProduct extends Document {
    name        : string ;
    code        : string ;
    sku         : string ;
    normalPrice : number ;
    offerPrice  : number ;
    slug        : string ;
    categories  : Array<string> ;
    files       : Array<string> ;
    technicalInformation : string ;
    description : string ;
    stock       : number ;
    status      : number ;
    createdAt   : Date   ;
    updateAt    : Date   ;
} ;