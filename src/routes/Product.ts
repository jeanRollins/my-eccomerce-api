import { Router } from 'express' ;
import { add } from '../controllers/ProductController';
import { ValidateToken } from '../libs/Token';


const routerProduct: Router = Router() ;

routerProduct.post('/product/add' , ValidateToken, add ) ;

routerProduct.get('/product/version', () => console.log('version 1.0***') ) ;

export default routerProduct ;
