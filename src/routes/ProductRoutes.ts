import { Router } from 'express' ;
import FileLoad from '../libs/FileLoad';
import { add, edit, get, getAll, remove } from '../controllers/ProductController';
import { ValidateToken } from '../libs/Token';


const ProductRoutes: Router = Router() ;

ProductRoutes.post('/product/add' , FileLoad , add ) ;

ProductRoutes.post('/product/remove', remove ) ;

ProductRoutes.post('/product/edit', edit ) ;

ProductRoutes.get( '/product/get/:code' , get ) ;

ProductRoutes.get('/product/getAll', getAll ) ;


export default ProductRoutes ;
