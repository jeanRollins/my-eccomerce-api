import {Request,  Response} from 'express' ;
import Product, { IProduct } from '../models/Product';

export const add =  async ( req : Request  , res : Response  ) => {

    let { name , normalPrice, offerPrice, slug, categories, stock } = req.body ;

   
    try{
        if( name == undefined || name == '' ){
            res.status(400).send({ action : false , message : 'Name required' }) ;
            return ;
        }
    
        if( normalPrice == undefined || normalPrice == '' ){
            res.status(400).send({ action : false , message : 'Normal price required' }) ;
            return ;
        }
    
        if( offerPrice == undefined || offerPrice == '' ) offerPrice = 0 ;
    
    
        if( slug == undefined || slug == '' ){
            res.status(400).send({ action : false , message : 'Slug required' }) ;
            return ;
        }
    
        if( categories == undefined || !Array.isArray( categories ) ) categories = [] ;
    
        if( stock == undefined || stock === false ) stock = 0 ;
    
        const product : IProduct = new Product({
            name ,
            normalPrice ,
            offerPrice ,
            slug ,
            categories ,
            stock
        }) ;
    
        const productSaved = await product.save() ;
    
        console.log('productSaved' , productSaved ) ;
        res.status(200).send( {  action : true , messagge : 'ok' , data : productSaved } ) ;
    }
    catch( error ){
        res.status(400).send( {  action : false , messagge : error , data : [] } ) ;
    }
    

} 
