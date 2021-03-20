import { Router } from 'express' ;
import { ValidateToken } from '../libs/Token';
import { signup, signin, profile  } from '../controllers/LoginController' ;

const router: Router = Router() ;

router.post('/login/signin', signin ) ;
router.post('/login/signup', signup ) ;
router.get('/login/profile' , ValidateToken , profile ) ;

router.get('/'  , () => console.log('status ok') ) ;


export default router ;