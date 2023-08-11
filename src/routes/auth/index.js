import { Router } from 'express';
import {verifySignUp,authJwt} from '../../middlewares';
import controller from '../../controller/auth.controller';
import { NotFoundError } from '../../lib/errors';
const router = Router();
/**
 * ici je dois filter en fonction des roles
 * role admin je renvoyerai toutes les regions 
 * et les autres utilisateurs les regions qui leur a étè affecté par l'administrateur
 */
//cette route sera protegée et accessible seulement par l'utilisateur
router.post('/signup', [
    verifySignUp.checkDuplicateUsernameOrEmail,
    verifySignUp.checkRolesExisted
  ],controller.signup);
router.post('/signin',controller.signin)
export default router;
