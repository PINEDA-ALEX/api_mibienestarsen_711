// C:\Users\pined\Desktop\api_mibinestar_711\api\v1\routes\categories.routes.js

const { Router } = require('express');
const router = Router();
const categoriesController = require('../controllers/categories.controller');

router.get("/", categoriesController.getCategories);
router.get("/:id", categoriesController.getCategoryById);
router.post("/", categoriesController.createCategory);
router.put("/:id", categoriesController.updateCategory);
router.delete("/:id", categoriesController.deleteCategory);

module.exports = router;