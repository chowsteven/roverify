require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { S3Client } = require('@aws-sdk/client-s3');
const multer = require('multer');
const multerS3 = require('multer-s3');
const userRoutes = require('./routes/users');
const playlistRoutes = require('./routes/playlists');
const songRoutes = require('./routes/songs');
// const compression = require('compression');
// const helmet = require('helmet');

// Create app
const app = express();

// Connect to MongoDB
const mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));

// Set up middleware
// app.use(compression());
// app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', userRoutes);
app.use('/api/playlists', playlistRoutes);
app.use('/api/songs', songRoutes);

app.listen(process.env.PORT || 5000);
