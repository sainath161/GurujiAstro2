const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const flowRoutes = require('./routes/flowRoutes');
const app = express();
const PORT = 3000;
const url = 'mongodb+srv://sagarparise01:59UK0NQEr1j3LaPa@cluster0.hsox2e2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'


app.use(bodyParser.json());

mongoose.connect(url).then(() => {
  console.log("Connected to mongoDb");
}).catch(err => {
  console.log("Error connecting to mongoDb: " + err);
})

app.use('/api', flowRoutes);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });