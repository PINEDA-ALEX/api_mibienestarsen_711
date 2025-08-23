// C:\Users\pined\Desktop\api_mibinestar_711\api\v1\controllers\users.controller.js

const { User } = require('../../../models'); 

// Obtener todos los usuarios
exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Error al obtener usuarios' });
    }
};

// Obtener un usuario por ID
exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ success: false, error: 'Usuario no encontrado' });
        }

        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Error al obtener el usuario' });
    }
};

// Crear un nuevo usuario
exports.createUser = async (req, res) => {
    try {
        // Asegúrate de desestructurar todos los campos del cuerpo de la petición
        const { username, email, password, roleId, phone, document, birthDate, gender } = req.body;
        
        // Verifica que al menos los campos obligatorios existan
        if (!username || !email || !password || !roleId) {
            return res.status(400).json({ success: false, error: 'Campos requeridos faltantes' });
        }
        
        // Crea el nuevo usuario pasando todos los campos
        const newUser = await User.create({
            username,
            email,
            password,
            roleId,
            phone,
            document,
            birthDate,
            gender,
            state: 'active'
        });
        
        res.status(201).json({ success: true, data: newUser });
    } catch (error) {
        console.error("Error al crear el usuario:", error);
        res.status(500).json({ success: false, error: 'Error al crear el usuario', details: error.message });
    }
};

// Eliminar un usuario por ID
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ success: false, error: 'Usuario no encontrado' });
        }

        await user.destroy();
        res.status(200).json({ success: true, message: 'Usuario eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Error al eliminar el usuario' });
    }
};

// Actualizar un usuario por ID
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedFields = req.body;

        const [updated] = await User.update(updatedFields, {
            where: { id },
            returning: true
        });

        if (updated === 0) {
            return res.status(404).json({ success: false, error: 'Usuario no encontrado' });
        }

        const updatedUser = await User.findByPk(id);
        res.status(200).json({ success: true, data: updatedUser });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Error al actualizar el usuario' });
    }
};