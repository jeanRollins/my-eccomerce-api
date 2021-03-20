import  {Schema, model, Document} from 'mongoose' ;
import bcrypt from 'bcryptjs' ;

export interface IUser extends Document {
    username : string  ;
    email    : string  ;
    password : string  ;
    encryptPassword( password: string ) : Promise <string> ;
    validatePassword( password1 : string , password2 : string ) : Promise <boolean> ;
} ;

const userSchema  = new Schema({
    username: {
        type : String ,
        required : true ,
        min : 4 ,
        lowercase: true
    },
    email : {
        type : String ,
        unique : true ,
        required : true ,
        lowercase: true
    },
    password : {
        type : String ,
        required : true 
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