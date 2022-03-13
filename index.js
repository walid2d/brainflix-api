const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const app = express();
const cors = require('cors');
require('dotenv').config();
const controller = require('./models/videoModels');
const { PORT } = process.env;

// Middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(express.static('public'));
// routes
app.route('/videos').get(controller.sideVideos);
app.route('/videos/:id').get(controller.videosById);
app.route('/videos/post').post(controller.newVideo);
// Port - listen
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
});
