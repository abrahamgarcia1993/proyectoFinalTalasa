import express from 'express';
import { 
    createNewUser, findUserById, findUserByEmail, updateThisUser, deleteUser
} from '../controllers/userController';

const router = express.Router();


router.post('/users', createNewUser);


router.get('/users/:id', findUserById);


router.get('/users/email/:email', findUserByEmail);


router.put('/users/:id', updateThisUser);


router.delete('/users/:id', deleteUser);

export default router;