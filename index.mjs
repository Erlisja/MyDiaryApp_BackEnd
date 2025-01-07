import express from 'express';  
import dotenv from 'dotenv';
import logger from 'morgan';
import cors from 'cors';

dotenv.config();


//setup the PORT
const PORT = process.env.PORT || 3000;

//initialize the express app
const app = express();

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(cors());


// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the home page');
  });


// Catch all route for any other requests that don't exist on the server and redirect to the home page
app.get('/*', (req,res)=>{
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