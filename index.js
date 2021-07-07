const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const cors = require('cors');

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

app.use(cors(corsOptions));


 //import routes
 const authRoute = require('./routes/auth');


dotenv.config();

//connect to db
mongoose.connect( process.env.DB_CONNECT , 
 { useUnifiedTopology: true },
()=> console.log('connected to db'));


//middleware
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });
//Route middleware
 app.use('/api' , authRoute);

app.listen(4000 , ()=> console.log("server up and running"))