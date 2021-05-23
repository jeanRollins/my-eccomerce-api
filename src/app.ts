import express, { Application } from 'express' ;
import routes from './routes/Login' ;
import routerProduct from './routes/Product' ;
import routerCategory from './routes/Category' ;


import cors from 'cors' ;

const app: Application = express() ;
const port :number = 3000 ;
//settings

app.use( cors() )
app.set( 'port' , port ) ;

app.use( express.json() );

app.use( '/api/back/', routerProduct ) ;
app.use( '/api/back/', routerCategory ) ;


app.use( '/api/back/',routes ) ;

export default app ;
