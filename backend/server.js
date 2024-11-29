const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv/config');
const userRoutes = require('./routes/userRoutes');
const contactRoutes = require('./routes/contactRoutes');
const app= express();
app.use(express.json(),cors({origin:'*'}));

app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI);

app.use('/api', userRoutes);
app.use('/api', contactRoutes);

PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });