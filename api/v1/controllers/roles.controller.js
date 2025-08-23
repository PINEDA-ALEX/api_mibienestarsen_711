// C:\Users\pined\Desktop\api_mibinestar_711\api\v1\controllers\roles.controller.js

const { Roles } = require('../../../models'); 

// Obtener todos los roles
exports.getRoles = async (req, res) => {
    try {
        const roles = await Roles.findAll();
        res.status(200).json({ success: true, data: roles });
    } catch (error) {
        console.error("Error al obtener los roles:", error);
        res.status(500).json({ success: false, error: 'Error al obtener los roles' });
    }
};

// Obtener un rol por ID
exports.getRoleById = async (req, res) => {
    try {
        const { id } = req.params;
        const role = await Roles.findByPk(id);

        if (!role) {
            return res.status(404).json({ success: false, error: 'Rol no encontrado' });
        }

        res.status(200).json({ success: true, data: role });
    } catch (error) {
        console.error("Error al obtener el rol:", error);
        res.status(500).json({ success: false, error: 'Error al obtener el rol' });
    }
};

// Crear un nuevo rol
exports.createRole = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ success: false, error: 'El nombre del rol es requerido' });
        }

        const newRole = await Roles.create({ name });
        res.status(201).json({ success: true, data: newRole });
    } catch (error) {
        console.error("Error al crear el rol:", error);
        res.status(500).json({ success: false, error: 'Error al crear el rol' });
    }
};

// Actualizar un rol por ID
exports.updateRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        
        const [updated] = await Roles.update({ name }, {
            where: { id },
            returning: true
        });

        if (updated === 0) {
            return res.status(404).json({ success: false, error: 'Rol no encontrado' });
        }

        const updatedRole = await Roles.findByPk(id);
        res.status(200).json({ success: true, data: updatedRole });
    } catch (error) {
        console.error("Error al actualizar el rol:", error);
        res.status(500).json({ success: false, error: 'Error al actualizar el rol' });
    }
};

// Eliminar un rol por ID
exports.deleteRole = async (req, res) => {
    try {
        const { id } = req.params;
        const role = await Roles.findByPk(id);

        if (!role) {
            return res.status(404).json({ success: false, error: 'Rol no encontrado' });
        }

        await role.destroy();
        res.status(200).json({ success: true, message: 'Rol eliminado correctamente' });
    } catch (error) {
        console.error("Error al eliminar el rol:", error);
        res.status(500).json({ success: false, error: 'Error al eliminar el rol' });
    }
};