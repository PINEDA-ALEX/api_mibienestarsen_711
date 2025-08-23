// C:\Users\pined\Desktop\api_mibinestar_711\api\v1\controllers\categories.controller.js

const { Categories } = require('../../../models');

// Obtener todas las categorías
exports.getCategories = async (req, res) => {
    try {
        const categories = await Categories.findAll();
        res.status(200).json({ success: true, data: categories });
    } catch (error) {
        console.error("Error al obtener las categorías:", error);
        res.status(500).json({ success: false, error: 'Error al obtener las categorías' });
    }
};

// Obtener una categoría por ID
exports.getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Categories.findByPk(id);

        if (!category) {
            return res.status(404).json({ success: false, error: 'Categoría no encontrada' });
        }

        res.status(200).json({ success: true, data: category });
    } catch (error) {
        console.error("Error al obtener la categoría:", error);
        res.status(500).json({ success: false, error: 'Error al obtener la categoría' });
    }
};

// Crear una nueva categoría
exports.createCategory = async (req, res) => {
    try {
        const { name, description, image } = req.body;

        if (!name) {
            return res.status(400).json({ success: false, error: 'El nombre de la categoría es requerido' });
        }

        const newCategory = await Categories.create({ name, description, image });
        res.status(201).json({ success: true, data: newCategory });
    } catch (error) {
        console.error("Error al crear la categoría:", error);
        res.status(500).json({ success: false, error: 'Error al crear la categoría' });
    }
};

// Actualizar una categoría por ID
exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, image } = req.body;

        const [updated] = await Categories.update({ name, description, image }, {
            where: { id },
            returning: true
        });

        if (updated === 0) {
            return res.status(404).json({ success: false, error: 'Categoría no encontrada' });
        }

        const updatedCategory = await Categories.findByPk(id);
        res.status(200).json({ success: true, data: updatedCategory });
    } catch (error) {
        console.error("Error al actualizar la categoría:", error);
        res.status(500).json({ success: false, error: 'Error al actualizar la categoría' });
    }
};

// Eliminar una categoría por ID
exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Categories.findByPk(id);

        if (!category) {
            return res.status(404).json({ success: false, error: 'Categoría no encontrada' });
        }

        await category.destroy();
        res.status(200).json({ success: true, message: 'Categoría eliminada correctamente' });
    } catch (error) {
        console.error("Error al eliminar la categoría:", error);
        res.status(500).json({ success: false, error: 'Error al eliminar la categoría' });
    }
};