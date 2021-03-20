import mongoose from 'mongoose' ;

import dotenv from "dotenv";
dotenv.config() ;

const USER_DB   : string  = process.env.USER_DB || '' ;
const DB        : string  = process.env.DB || '' ;
const DBDEFAULT : string  = process.env.DBDEFAULT || '' ;
const PASSWORD  : string  = process.env.PASSWORD  || '' ;
const HOST      : string  = process.env.HOST || '' ;

const connection : string =  `mongodb://${ USER_DB }:${ PASSWORD }@${ HOST }/${DB}` ;

mongoose.connect( connection, {
    authSource: DBDEFAULT ,
    useNewUrlParser     : true ,
    useUnifiedTopology  : true ,
    useCreateIndex      : true
})
.then( db => console.log('Db is connected'))
.catch( err => console.log(err)) ;