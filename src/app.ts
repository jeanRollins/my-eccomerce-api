import express, { Application } from 'express' ;
import routes from './routes/Login' ;
import routerProduct from './routes/Product' ;

import cors from 'cors' ;

const app: Application = express() ;
const port :number = 3000 ;
//settings

app.use( cors() )
app.set( 'port' , port ) ;

app.use( express.json() );

app.use( '/api/', routerProduct ) ;

app.use( '/api/',routes ) ;

export default app ;
