import express from 'express';
import { createNewUser, findUserById, findUserByEmail, updateThisUser, deleteThisUser} from '../controllers/userController.js';

const router = express.Router();


router.post('/users', createNewUser);


router.get('/users/:id', findUserById);


router.get('/users/email/:email', findUserByEmail);


router.put('/users/:id', updateThisUser);


router.delete('/users/:id', deleteThisUser);

export default router;