import { Router } from 'express' ;
import { getCategories } from '../controllers/CategoryController';
import { ValidateToken } from '../libs/Token';


const CategoryRoutes: Router = Router() ;

CategoryRoutes.get('/category/get' , getCategories ) ;

export default CategoryRoutes ;
