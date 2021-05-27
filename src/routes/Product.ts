import { Router } from 'express' ;
import FileLoad from '../libs/FileLoad';
import { add, edit, get, getAll, remove } from '../controllers/ProductController';
import { ValidateToken } from '../libs/Token';


const routerProduct: Router = Router() ;

routerProduct.post('/product/add' , FileLoad , add ) ;

routerProduct.post('/product/remove', remove ) ;

routerProduct.post('/product/edit', edit ) ;

routerProduct.get( '/product/get/:code' , get ) ;

routerProduct.get('/product/getAll', getAll ) ;


export default routerProduct ;
