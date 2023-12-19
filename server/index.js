// import express from 'express';
const express = require('express')
// import bodyParser from 'body-parser';
const bodyParser = require('body-parser');
// import cors from 'cors';
const cors = require('cors');
// import dotenv from 'dotenv';
const dotenv = require('dotenv');



const route = require('./Routes/route.js')
const {startDB} = require('./database/db.js')


dotenv.config();
const app = express();
app.use(cors());


const PORT = 6969;



startDB();


app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));
// const whitelist = ['http://localhost:5173'];

//     const corsOptionsDelegate = (req, callback) => {
//     let corsOptions;

//     let isDomainAllowed = whitelist.indexOf(req.header('Origin')) !== -1;
//     let isExtensionAllowed = req.path.endsWith('.jpg');

//     if (isDomainAllowed && isExtensionAllowed) {
//         // Enable CORS for this request
//         corsOptions = { origin: true }
//     } else {
//         // Disable CORS for this request
//         corsOptions = { origin: false }
//     }
//     callback(null, corsOptions)
// }

// app.use(cors(corsOptionsDelegate));

// app.use(cors())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));




app.use('/', route);