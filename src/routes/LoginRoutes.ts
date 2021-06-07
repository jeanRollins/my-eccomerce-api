import { Router } from 'express' ;
import { ValidateToken, ValidateSession } from '../libs/Token';
import { signup, signin, profile , ValidateSessionPage } from '../controllers/LoginController' ;

const LoginRoutes : Router = Router() ;

LoginRoutes.post('/login/signin'  , signin ) ;
LoginRoutes.post('/login/signup'  , signup ) ;
LoginRoutes.get( '/login/profile'  , ValidateToken , profile ) ;
LoginRoutes.post('/login/validate' , ValidateSessionPage ) ;

LoginRoutes.get('/'  , () => console.log('status ok') ) ;

export default LoginRoutes ;