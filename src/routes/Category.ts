import { Router } from 'express' ;
import { getCategories } from '../controllers/CategoryController';
import { ValidateToken } from '../libs/Token';


const routerCategory: Router = Router() ;

routerCategory.get('/category/get' , getCategories ) ;

export default routerCategory ;
