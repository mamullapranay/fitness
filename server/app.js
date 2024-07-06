"use strict";

const express = require('express');
const path = require('path');
const GymClass = require('./gymClass');
const bookingRoutes = require('./routes/booking');
const cancellationRoutes = require('./routes/cancellation');
const listsRoutes = require('./routes/lists');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const classMap = new Map();
let timePlus30 = new Date();
timePlus30.setMinutes(timePlus30.getMinutes() + 30);

classMap.set("yoga", new GymClass("gym", timePlus30, 5));
classMap.set("gym", new GymClass("gym", timePlus30, 5));
classMap.set("dance", new GymClass("dance", new Date('1999-09-10'), 5));

// Middleware to expose classMap to routes
app.use((req, res, next) => {
    req.classMap = classMap;
    next();
});

app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.use('/', bookingRoutes);
app.use('/', cancellationRoutes);
app.use('/', listsRoutes);

const PORT = process.env.PORT || 5080;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

module.exports = classMap; // Export the class map
