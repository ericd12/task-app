const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


mongoose.connect('mongodb://127.0.0.1:27017/powerbrain', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true 
});

const connection = mongoose.connection;
connection.once('open',() => {
    console.log("db connection created successfully");
});

const elementsRouter = require('./routes/elements');
const tracksRouter = require('./routes/tracks');

app.use('/elements', elementsRouter);
app.use('/tracks', tracksRouter)

app.listen(port, () => {
    console.log('Server is running on port: ' + port);
});