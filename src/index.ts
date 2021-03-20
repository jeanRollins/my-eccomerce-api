import dotenv from "dotenv";
import app from './app' ;
import './config/database' ;
dotenv.config() ;
 
function main() :void {
    const port  : number = app.get('port') ;
    app.listen( port ) ;
    console.log(`Server on port ${ port }`) ;
} 

main() ;