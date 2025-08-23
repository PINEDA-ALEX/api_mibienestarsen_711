// C:\Users\pined\Desktop\api_mibinestar_711\api\v1\routes\roles.routes.js

const { Router } = require('express');
const router = Router();
const rolesController = require('../controllers/roles.controller');

// Rutas para las operaciones CRUD
router.get("/", rolesController.getRoles);
router.get("/:id", rolesController.getRoleById);
router.post("/", rolesController.createRole);
router.put("/:id", rolesController.updateRole);
router.delete("/:id", rolesController.deleteRole);

module.exports = router;