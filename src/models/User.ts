import  {Schema, model, Document} from 'mongoose' ;
import bcrypt from 'bcryptjs' ;
import { generateMailVerification } from '../libs/Commons';

export interface IUser extends Document {
    names           : string  ;
    surname         : string  ;
    secondSurname   : string  ;
    email           : string  ;
    password        : string  ;
    status          : number  ;
    tokenRecovery   : string  ;
    token           : string  ;
    lastConnected   : Date  ;
    createdAt       : Date  ;
    encryptPassword( password: string ) : Promise <string> ;
    validatePassword( password1 : string , password2 : string ) : Promise <boolean> ;
} ;

const userSchema  = new Schema({
    names : {
        type : String ,
        required : true , 
        min : 2 
    },
    surname : {
        type : String ,
        required : true ,
        min : 2 
    },
    secondSurname : {
        type : String ,
        required : true 
    },
    email : {
        type : String ,
        unique : true ,
        required : true ,
        lowercase: true
    },
    password : {
        type : String ,
        required : true ,
        min : 6
    },
    status : {
        type : Number ,
        default : 0
    },
    tokenRecovery : {
        type : String ,
        default : generateMailVerification()
    },
    token : {
        type : String,
        default : ''
    },
    lastConnected : {
        type : Date,
        default : Date.now()
    },
    createdAt : {
        type : Date,
        default : Date.now()
    }
});

userSchema.methods.encryptPassword =  async ( password : string ) : Promise <string> =>  {
    const salt = await bcrypt.genSalt( 10 ) ;
    return bcrypt.hash( password , salt ) ;
}


userSchema.methods.validatePassword = async function ( password1 : string , password2 : string ): Promise <boolean> {
    return await bcrypt.compare( password1, password2 ) ;
}


export default model<IUser>('User' , userSchema ) ;