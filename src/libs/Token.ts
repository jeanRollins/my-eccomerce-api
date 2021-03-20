import { Request, Response, NextFunction } from 'express' ;
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config() ;


interface IPayload {
    _id : string ;
    iat : number ;
    exp : number ;
}
export const ValidateToken =  ( req: Request , res: Response, next: NextFunction )  => {
    
    const messageFail =  { action : false , message : "Access Denied" } ;
    try {
        const token : string = req.header('auth-token') || 'jean' ;
        if( !token ) return res.status(401).send( messageFail ) ;
    
        const payload  = jwt.verify( token , process.env.TOKEN || 'jean' ) as IPayload ;
        req.uid = payload._id ;

        next() ;
    } 
    catch (error) {
        res.status(401).send( messageFail ) ;    

    }
  

    
}