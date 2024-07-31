import express from 'express';
import { createNewUser, findUserById, findUserByEmail, updateThisUser, deleteThisUser} from '../controllers/userController.js';
import { registerUser, loginUser } from '../controllers/userController.js';
/* import { authenticateToken } from '../middleware/auth.js'; */
const router = express.Router();


router.post('/users', createNewUser);


router.get('/users/:id', findUserById);


router.get('/users/email/:email', findUserByEmail);


router.put('/users/:id', updateThisUser);


router.delete('/users/:id', deleteThisUser);
router.post('/register', async (req, res) => {
    const { first_name, last_name, email, password, role, profile_picture, cv } = req.body;
    try {
        const userId = await registerUser(first_name, last_name, email, password, role, profile_picture, cv);
        res.status(201).json({ id: userId });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Ruta de inicio de sesión
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const { token } = await loginUser(email, password);
        res.json({ token });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

export default router;