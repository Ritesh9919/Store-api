const express = require('express');
const db = require('./db/connect');
require('dotenv').config()
const port = process.env.PORT || 8000;
const connectDB = require('./db/connect');
const notFound = require('./middleware/not_found');
const errorHandlerMiddleware = require('./middleware/error_handler');
require('express-async-errors');

const app = express();


app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.get('/', (req, res) => {
    return res.send('Store Home');
})

app.use('/', require('./routes/product'));

app.use(notFound);
app.use(errorHandlerMiddleware);


const start = async () => {
    try{
   await connectDB(process.env.MONGO_URI);
   app.listen(port, () => {
    console.log('Server is running on port:',port);
})
    }catch(err) {
        console.log(err);
    }

}

start();