// C:\Users\pined\Desktop\api_mibinestar_711\api\v1\routes\events.routes.js

const { Router } = require('express');
const router = Router();
const eventsController = require('../controllers/events.controller');

router.get("/", eventsController.getEvents);
router.get("/:id", eventsController.getEventById);
router.post("/", eventsController.createEvent);
router.put("/:id", eventsController.updateEvent);
router.delete("/:id", eventsController.deleteEvent);

module.exports = router;