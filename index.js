const express = require('express');
const mongoose = require('mongoose');

// const cors = require('./middlewares/cors');
const authController = require('./controllers/authController');
const dataController = require('./controllers/dataController');
const trimBody = require('./middlewares/trimBody');
const session = require('./middlewares/session');
const cors = require('cors');


const connectionString = 'mongodb://localhost:27017/store';

start();

async function start() {
    // await mongoose.connect(connectionString);
    
    await mongoose.connect(process.env.DATABASE_URL || connectionString);
    console.log('Database connected');

    const app = express();

    app.use(express.json());
    // app.use(cors());
    app.use(cors({
        origin: ['http://localhost:4200, https://store-qt00.onrender.com/'],
        credentials: true
    }));
  
    app.use(trimBody());
    // app.use(session());

    app.get('/', (req, res) => {
        res.json({ message: 'REST service operational' });
    });

    app.use('/users', authController);
    app.use('/data/catalog', dataController);

    app.listen(3030, () => console.log('REST service started'));
}