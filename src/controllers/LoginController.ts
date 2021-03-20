import {Request,  Response} from 'express' ;
import User, { IUser } from '../models/User';
import jwt from 'jsonwebtoken' ;

export const signup = async ( req : Request ,res : Response ) => {
    
    const user: IUser = new User({
        username : req.body.username ,
        email    : req.body.email    ,
        password : req.body.password ,
    }) ;

    user.password = await user.encryptPassword( user.password ) ;

    const savedUser = await user.save() ;
    //token
    const token = jwt.sign({ _id : savedUser._id } , process.env.Token || 'jean') ;
    res.header( 'auth-token' , token ).json( savedUser ) ;

}

export const signin = async (req : Request ,res : Response) => {

    const user = await User.findOne({ email : req.body.email }) ;
    console.log('user' , user ) ;
    if( !user ) return res.status( 400 ).json({ message : 'Email or password is wrong' , action : false}) ;

    const isValid : boolean = await user.validatePassword( req.body.password , user.password ) ;
 
    if( !isValid ) return res.status( 400 ).json( { message : 'Invalid password' , action : false} ) ;
    
    const token = jwt.sign( { _id: user._id } , process.env.Token || 'jean' , {
        expiresIn : 60 * 60 * 24
    });

    res.header( 'auth-token', token ).json( user ) ;
}

export const profile = async (req : Request ,res : Response) => {
    const user = await User.findById( req.uid, { password : 0 } )
    if ( !user ) return res.status( 404 ).json( { action : false , message : 'User not found' }  )
    res.send( user ) ;
}

