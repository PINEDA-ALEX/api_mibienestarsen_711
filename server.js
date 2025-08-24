const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');

// --- Importación de Sequelize y Sincronización de Base de Datos ---
const sequelize = require('./models/index');

sequelize.sync({ alter: true })
    .then(() => {
        console.log('¡Base de datos y tablas sincronizadas!');
    })
    .catch((err) => {
        console.error('Error al sincronizar la base de datos:', err);
    });

// --- Middleware ---
// Primero, procesa el cuerpo de las peticiones.
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(morgan('dev'));

// Si usas dotenv, asegúrate de que se cargue al principio
if(process.env.NODE_ENV != 'production'){
    require('dotenv').config();
}

// --- Rutas ---
// Después de procesar el cuerpo, usa las rutas.
const usersRoutes = require('./api/v1/routes/users.routes');
const rolesRoutes = require('./api/v1/routes/roles.routes');
const categoriesRoutes = require('./api/v1/routes/categories.routes');
const eventsRoutes = require('./api/v1/routes/events.routes');

app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/roles', rolesRoutes);
app.use('/api/v1/categories', categoriesRoutes);
app.use('/api/v1/events', eventsRoutes);


// --- Endpoints de prueba ---
app.get('/', (req, res) => {
    res.json({ message: 'API funcionando correctamente' });
});

app.get('/test/:id', (req, res) => {
    res.json({ test: 'ok', id: req.params.id });
});

// --- Inicialización del servidor ---
app.set ('port', process.env.PORT || 4000);

app.listen(app.get('port'),()=>{
    console.log(`Server on port ${app.get('port')}`);
});