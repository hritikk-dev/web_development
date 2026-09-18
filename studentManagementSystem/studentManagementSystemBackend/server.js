const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors()); // इसे सभी रूट्स (routes) से ऊपर लिखें

require('dotenv').config();
const db =  require('./db');



const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = 3000;



const User = require('./models/student');
const studentRoutes = require('./Routes/studentRoutes');

app.use('/', studentRoutes);

app.get('/', (req, res) => {
    res.send("welcome to out project")
})


app.listen(PORT, () => {
    console.log("App is listining on PORT  " + PORT);
})