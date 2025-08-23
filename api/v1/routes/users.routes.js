// C:\Users\pined\Desktop\api_mibinestar_711\api\v1\routes\users.routes.js

const { Router } = require('express');
const router = Router();
const userController = require('../controllers/users.controller'); 

// Rutas para las operaciones CRUD
router.get("/", userController.getUsers);
router.get("/:id", userController.getUserById);
router.post("/", userController.createUser);
router.delete("/:id", userController.deleteUser);
router.put("/:id", userController.updateUser);

module.exports = router;