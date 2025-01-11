import express from 'express';
import dotenv from 'dotenv';
import logger from 'morgan';
//import cors so that I can make requests from my front end to my back end
import cors from 'cors';
// connect to the database
import db from './db/connection.mjs';

// Load the environment variables
dotenv.config();

import users from './routes/user.mjs';
import login from './routes/user.mjs';


//setup the PORT
const PORT = process.env.PORT || 3000;

//initialize the express app
const app = express();

// Middleware
app.use(logger('dev'));
app.use(express.json());
// app.use(cors());

app.use(cors());


import diaryEntryRoutes from './routes/diaryEntry.mjs';

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the home page');
});

// ROUTES
app.use('/api/diary-entries', diaryEntryRoutes);  // Mount the diary entry routes
app.use('/api/users',users) 
app.use('/api',login)


// Catch all route for any other requests that don't exist on the server and redirect to the home page
app.get('/*', (req, res) => {
    res.redirect('/');

})



// Global error handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});