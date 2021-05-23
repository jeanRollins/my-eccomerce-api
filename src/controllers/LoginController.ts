import {Request,  Response} from 'express' ;
import User, { IUser } from '../models/User';
import jwt from 'jsonwebtoken' ;
import { ValidateSession } from '../libs/Token';

export const signup = async ( req : Request ,res : Response ) => {
    
    const { names, surname, secondSurname, email, password } = req.body ;

    const valid = validateSignup( names, surname, secondSurname, email, password ) ;

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

        res.header( 'auth-token' , token ).status( 200 ).json( { action : true, message : "ok", data: savedUser } ) ;   
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
    if( !user ) return res.status( 200 ).json({ message : 'Email or password is wrong' , action : false}) ;

    const isValid : boolean = await user.validatePassword( req.body.password , user.password ) ;
 
    if( !isValid ) return res.status( 200 ).json( { message : 'Invalid password' , action : false} ) ;
    
    const token = jwt.sign( { _id: user._id } , process.env.Token || 'jean' , {
        expiresIn : 60 * 60 * 24
    });
    console.log('token' , token ) ;

    user.token = token ;
    res.header( 'auth-token', token ).send( { action : true, message : 'ok', data : user } ) ;
}

export const profile = async (req : Request ,res : Response) => {
    const user = await User.findById( req.uid, { password : 0 } )
    if ( !user ) return res.status( 404 ).json( { action : false , message : 'User not found' }  )
    res.send( user ) ;
}

export const ValidateSessionPage = (req : Request ,res : Response) => {

    try {
        const token : string = req.header('auth-token') || 'jean' ;

        const response : boolean =  ValidateSession( token ) ;
        
        res.status(200).send( { action : response, message : response ? 'ok' : 'auth fail' , data: [] } ) ;    
    } 
    catch ( error ) {
        res.status(400).send( { action : false, message : "auth fail", data: [] } ) ;    
    }
    
}

