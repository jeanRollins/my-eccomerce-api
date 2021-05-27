import {Request,  Response} from 'express' ;
import IProduct from '../interfaces/IProduct';
import { deleteFile } from '../libs/FileLoad' ;

import { Products } from '../libs/Products' ;
import Product from '../models/Product' ;



export const add =  async ( req : Request  , res : Response  ) => {

    req.body.files = req.files ;
    let { name , code, sku, categories, description, technicalInformation, files } = req.body ;

    try {
        if( name == undefined || name == '' ){
            res.status(203).send({ action : false , message : 'Name required' }) ;
            deleteFile( req.files ) ;
            return ;
        }

        if( code == undefined || code == '' ){
            res.status(203).send({ action : false , message : 'Code required' }) ;
            deleteFile( req.files ) ;
            return ;
        }

        if( sku == undefined || sku == '' ){
            res.status(203).send({ action : false , message : 'SKU required' }) ;
            deleteFile( req.files ) ;
            return ;
        }

        if( description == undefined || description == '' ){
            res.status(203).send({ action : false , message : 'Description price required' }) ;
            deleteFile( req.files ) ;
            return ;
        }

        if( technicalInformation == undefined || technicalInformation == '' ){
            res.status(203).send({ action : false , message : 'Technical information price required' }) ;
            deleteFile( req.files ) ;
            return ;
        }

        if( categories == undefined || !Array.isArray( categories ) ) categories = [] ;
    
        const product = new Products() ;
        
        const productSaved = await product.add( req.body , files ) ;
        
        res.status(200).send( { action : true, messagge : 'ok', data : productSaved } ) ;
    }
    catch( error ){
        res.status(203).send( { action : false , messagge : error , data : [] } ) ;
    }

} 

export const remove = async ( req : Request  , res : Response ) => {
        
    const { id } = req.body ;

    try {
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


export const get = async ( req : Request  , res : Response ) => {

    const code : string = req.params.code ;

    const product : Products = new Products( '' , code ) ; 

    const productFounded : IProduct [] = await product.getByCod() ;


    console.log('code :: ' , code ) ;

    console.log('productFounded :: ' , productFounded ) ;

    

    try {

    
        
        res.status(200).send( {  action : true , messagge : 'ok' , data : productFounded } ) ;
        
    } catch (error) {
        res.status(400).send( {  action : false , messagge : error , data : [] } ) ;
    }
}
