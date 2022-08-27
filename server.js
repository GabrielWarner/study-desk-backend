const express = require('express');
const allRoutes = require('./controllers');
const sequelize = require('./config/connection');
const cors = require('cors')

const app = express();
app.use(cors())
const PORT = process.env.PORT || 3001;
const { User } = require('./models');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', allRoutes);

