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

export const add = async ( req: Request, res: Response  ) => {

    const name   : string = req.body.name ;
    const parent : string = req.body.parent ;

    if( name === '' || name === undefined ){
        res.status(203).send( { action : false, messagge : 'name required', data : [] } ) ;
        return false ;
    }

    if( parent === '' || parent === undefined ){
        res.status(203).send( { action : false, messagge : 'parent required', data : [] } ) ;
        return false ;
    }

    try {
        const categories    : Categories = new Categories() ;
        
        const categorySaved : ICategory  = await categories.add( name, parent ) ;
        
        res.status(200).send( { action : true, message : 'ok' , data: categorySaved }  ) ;
    } 
    catch( error ) {
        res.status(400).send( { action : false, message : error , data: [] } ) ;    
    }
}


export const remove = async ( req: Request, res: Response  ) => {

    const id : string = req.body.id ;

    if( id === '' || id === undefined ){
        res.status(203).send( { action : false, messagge : 'id required', data : [] } ) ;
        return false ;
    }
    try {

        const category : Categories = new Categories( id ) ;

        const exist : boolean = await category.existInProducts() ; 
        
        if( exist ){
            res.status(203).send( { action : false, message : 'Product not valid to remove' , data: [] }  ) ;
            return false ;
        }
        const categoryRemoved = await category.remove( "_id" ) ;

        res.status(200).send( { action : true, message : 'ok' , data: categoryRemoved }  ) ;
    } 
    catch( error ) {
        res.status(400).send( { action : false, message : error , data: [] } ) ;    
    }
}
