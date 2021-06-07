import express, { Application } from 'express' ;

import FileRoutes from './routes/FileRoutes' ;
import LoginRoutes from './routes/LoginRoutes' ;
import ProductRoutes from './routes/ProductRoutes' ;
import CategoryRoutes from './routes/CategoryRoutes' ;

import cors from 'cors' ;

const app: Application = express() ;
const port :number = 3000 ;

app.use( '/static' , express.static( __dirname + '/static' ) ) ;
app.use( cors() ) ;
app.set( 'port' , port ) ;

app.use( express.json() );

app.use( '/api/back/' , LoginRoutes ) ;
app.use( '/api/back/' , ProductRoutes ) ;
app.use( '/api/back/' , CategoryRoutes ) ;
app.use( '/api/back/' , FileRoutes ) ;

export default app ;
