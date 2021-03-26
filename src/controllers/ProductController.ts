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
            stock ,
            createdAt : new Date 
        }) ;
    
        const productSaved = await product.save() ;
    
        res.status(200).send( {  action : true , messagge : 'ok' , data : productSaved } ) ;
    }
    catch( error ){
        res.status(400).send( {  action : false , messagge : error , data : [] } ) ;
    }

} 

export const remove = async ( req : Request  , res : Response ) => {
        
    const { id } = req.body ;

    try{
        if( id == undefined || id == '' ){
            res.status(400).send({ action : false , message : 'Id required' }) ;
            return ;
        }

        const response = await Product.findByIdAndDelete( id ) ;

        console.log( 'response' , response ) ;

        res.status(200).send( {  action : true , messagge : 'Document deleted' , data : id } ) ;
    }
    catch( error ){
        res.status(400).send( {  action : false , messagge : error , data : [] } ) ;
    }

}


export const edit =  async ( req : Request  , res : Response  ) => {

    let { id, name, normalPrice, offerPrice, slug, categories, stock } = req.body ;

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
    
        const product = {
            name        ,
            normalPrice ,
            offerPrice  ,
            slug        , 
            categories  ,
            stock       
         } ;

        console.log( 'id***' , id ) ;
        console.log( 'product***' , product ) ;



        const responseUpd = await Product.findByIdAndUpdate( id , product ); 

        console.log('responseUpd' , responseUpd) ;
        res.status(200).send( {  action : true , messagge : 'Update ok' , data : responseUpd } ) ;
    }
    catch( error ){
        res.status(400).send( {  action : false , messagge : error , data : [] } ) ;
    }

} 

export const getAll = async ( req : Request  , res : Response  ) => {
    
    const id : string = req.body.id ;

    try {

        const products = await Product.find().populate('Category') ; 
        console.log( 'products' , products ) ;
        
        res.status(200).send( {  action : true , messagge : 'ok' , data : products } ) ;
        
    } catch (error) {
        res.status(400).send( {  action : false , messagge : error , data : [] } ) ;
        
    }
    
    
}
