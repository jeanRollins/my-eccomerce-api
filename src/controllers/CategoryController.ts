import {Request,  Response} from 'express' ;
import { Categories } from '../libs/Categories';
import { ICategory } from '../models/Category';

export const getCategories = async ( req: Request, res: Response )  =>  {
        
    try {
        const categories : ICategory []  = await Categories.getAll()  ;
        
        res.status(200).send( { action : true, message : 'ok' , data: categories }  ) ;
    } 
    catch( error ) {
        res.status(400).send( { action : false, message : error , data: [] } ) ;    
    }
    
}