require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { S3Client } = require('@aws-sdk/client-s3');
const multer = require('multer');
const multerS3 = require('multer-s3');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
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
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(compression());
// app.use(helmet());

app.listen(process.env.PORT || 5000);
