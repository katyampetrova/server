const express = require('express');
const mongoose = require('mongoose');

const cors = require('./middlewares/cors');
const authController = require('./controllers/authController');
const dataController = require('./controllers/dataController');
const trimBody = require('./middlewares/trimBody');
const session = require('./middlewares/session');


const connectionString = 'mongodb://localhost:27017/store';

start();

async function start() {
    // await mongoose.connect(connectionString);

    mongoose.connect(process.env.DATABASE_URL || connectionString);
    console.log('Database connected');

    const app = express();

    app.use(express.json());
    app.use(cors());
    app.use(trimBody());
    app.use(session());

    app.get('/', (req, res) => {
        try {
            res.json({ message: 'REST service operational' });
        } catch (e) {
            res.status(500).json({
                message: e,
             });
        }
    });

    app.use('/users', authController);
    app.use('/data/catalog', dataController);

    app.listen(3030, () => console.log('REST service started'));
}