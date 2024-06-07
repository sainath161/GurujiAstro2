const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const flowRoutes = require('./routes/flowRoutes');
const app = express();
const PORT = 3000;
const url = process.env.MONGO_URI;


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