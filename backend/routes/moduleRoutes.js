// routes/moduleRoutes.js
const express = require('express');
const {
  createModule,
  getAllModules,
  getModuleById,
  updateModule,
  deleteModule,
} = require('../controllers/moduleControllers');
const authenticateToken = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/modules', authenticateToken, createModule);
router.get('/modules', authenticateToken, getAllModules);
router.get('/modules/:id', authenticateToken, getModuleById);
router.put('/modules/:id', authenticateToken, updateModule);
router.delete('/modules/:id', authenticateToken, deleteModule);

module.exports = router;
