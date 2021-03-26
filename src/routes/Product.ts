import { Router } from 'express' ;
import { add, edit, getAll, remove } from '../controllers/ProductController';
import { ValidateToken } from '../libs/Token';


const routerProduct: Router = Router() ;

routerProduct.post('/product/add' , ValidateToken, add ) ;

routerProduct.post('/product/remove', remove ) ;

routerProduct.post('/product/edit', edit ) ;

routerProduct.get('/product/getAll' , ValidateToken, getAll ) ;


export default routerProduct ;
