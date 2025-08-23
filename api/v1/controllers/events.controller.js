// C:\Users\pined\Desktop\api_mibinestar_711\api\v1\controllers\events.controller.js

const { Events, User, Categories } = require('../../../models');

// Obtener todos los eventos
exports.getEvents = async (req, res) => {
    try {
        const events = await Events.findAll({
            include: [{ model: User }, { model: Categories }]
        });
        res.status(200).json({ success: true, data: events });
    } catch (error) {
        console.error("Error al obtener los eventos:", error);
        res.status(500).json({ success: false, error: 'Error al obtener los eventos' });
    }
};

// Obtener un evento por ID
exports.getEventById = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await Events.findByPk(id, {
            include: [{ model: User }, { model: Categories }]
        });

        if (!event) {
            return res.status(404).json({ success: false, error: 'Evento no encontrado' });
        }

        res.status(200).json({ success: true, data: event });
    } catch (error) {
        console.error("Error al obtener el evento:", error);
        res.status(500).json({ success: false, error: 'Error al obtener el evento' });
    }
};

// Crear un nuevo evento
exports.createEvent = async (req, res) => {
    try {
        const { name, description, startDate, endDate, state, maxCapacity, categoryId, userId } = req.body;

        if (!name || !startDate || !categoryId || !userId) {
            return res.status(400).json({ success: false, error: 'Campos requeridos faltantes' });
        }

        const newEvent = await Events.create({
            name,
            description,
            startDate,
            endDate,
            state,
            maxCapacity,
            categoryId,
            userId
        });

        res.status(201).json({ success: true, data: newEvent });
    } catch (error) {
        console.error("Error al crear el evento:", error);
        res.status(500).json({ success: false, error: 'Error al crear el evento' });
    }
};

// Actualizar un evento por ID
exports.updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedFields = req.body;

        const [updated] = await Events.update(updatedFields, {
            where: { id },
            returning: true
        });

        if (updated === 0) {
            return res.status(404).json({ success: false, error: 'Evento no encontrado' });
        }

        const updatedEvent = await Events.findByPk(id);
        res.status(200).json({ success: true, data: updatedEvent });
    } catch (error) {
        console.error("Error al actualizar el evento:", error);
        res.status(500).json({ success: false, error: 'Error al actualizar el evento' });
    }
};

// Eliminar un evento por ID
exports.deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await Events.findByPk(id);

        if (!event) {
            return res.status(404).json({ success: false, error: 'Evento no encontrado' });
        }

        await event.destroy();
        res.status(200).json({ success: true, message: 'Evento eliminado correctamente' });
    } catch (error) {
        console.error("Error al eliminar el evento:", error);
        res.status(500).json({ success: false, error: 'Error al eliminar el evento' });
    }
};