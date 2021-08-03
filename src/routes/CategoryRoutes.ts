import { Router } from 'express' ;
import { add, getByField, getCategories, remove } from '../controllers/CategoryController';
import { ValidateToken } from '../libs/Token';


const CategoryRoutes: Router = Router() ;

CategoryRoutes.get('/category/get' , getCategories ) ;
CategoryRoutes.post('/category/getByfield' , getByField ) ;
CategoryRoutes.post('/category/add' , add ) ;
CategoryRoutes.post('/category/remove' , remove ) ;




export default CategoryRoutes ;
