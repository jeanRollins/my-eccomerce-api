import { Router } from 'express' ;
import { add, getCategories, remove } from '../controllers/CategoryController';
import { ValidateToken } from '../libs/Token';


const CategoryRoutes: Router = Router() ;

CategoryRoutes.get('/category/get' , getCategories ) ;
CategoryRoutes.post('/category/add' , add ) ;
CategoryRoutes.post('/category/remove' , remove ) ;



export default CategoryRoutes ;
