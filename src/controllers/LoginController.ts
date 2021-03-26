import {Request,  Response} from 'express' ;
import User, { IUser } from '../models/User';
import jwt from 'jsonwebtoken' ;

export const signup = async ( req : Request ,res : Response ) => {
    
    const { names, surname, secondSurname, email, password } = req.body ;

    console.log('req.body*****' , req.body );

    const valid = validateSignup( names, surname, secondSurname, email, password ) ;

    console.log('valid*****' , valid );
    
    try {

        if( !valid.action ){
            res.status( 400 ).json( { message : valid.message, action : false, data:[] }) ;
            return ;
        } 

        const user: IUser = new User({
            names    ,
            surname  ,
            secondSurname  ,
            email     ,
            password  
        }) ;

        user.password = await user.encryptPassword( user.password ) ;

        const savedUser = await user.save() ;
        
        const token = jwt.sign({ _id : savedUser._id } , process.env.Token || 'jean') ;

        res.header( 'auth-token' , token ).status( 200 ).json( { action : false, message : "ok", data: savedUser } ) ;   
    } 
    catch (error) {
        res.status( 400 ).json( { message : error, action : false, data:[] }) ;
    }
}

const validateSignup = ( name : String, surname: String, secondSurname: String, email : String , password : String ) => {

    if( name === undefined || name === '' )
        return { action : false , message : "Field name required" } ;

    if( surname === undefined || surname === '' )
        return { action : false , message : "Field surname required" } ;
    
    if( secondSurname === undefined || secondSurname === '' )
        return { action : false , message : "Field secondSurname required" } ;
    
    if( email === undefined || email === '' )
        return { action : false , message : "Field email required" } ;
    
    if( password === undefined || password === '' )
        return { action : false , message : "Field password required" } ;
    
    return { action : true , message : "ok" } ;
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

