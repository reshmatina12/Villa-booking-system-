const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
// Create Express app


// Middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/dbe', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', () => console.log("Error in Connecting to Database"));
db.once('open', () => console.log("Connected to Database"));

// Define User model
const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    phno: String,
    gender: String,
    password: String
});

const User = mongoose.model('User ', userSchema);

// Define Booking model
const bookingSchema = new mongoose.Schema({
    name: String,
    age: Number,
    gender: String,
    checkin: Date,
    checkout: Date,
    email: String,
    villaName: String,
     
});

const Booking = mongoose.model('Booking', bookingSchema);

// Sign up route
app.post("/sign_up", async (req, res) => {
    const { name, age, gender, email, password } = req.body;

    const userData = new User({
        name,
        age,
        gender,
        email,
        password
    });

    try {
        await userData.save();
        console.log("User  Record Inserted Successfully");
        return res.redirect('signup_successful.html');
    } catch (err) {
        console.error("Error inserting user record: ", err);
        return res.status(500).send("Error saving user data.");
    }
});

// Booking route
app.post("/book", async (req, res) => {
    const { name, age, gender, checkin, checkout, email, villaName} = req.body;

    // Create a booking object
    const bookingData = new Booking({
        name,
        age,
        gender,
        checkin,
        checkout,
        email,
        villaName,
        
    });

    // Save booking data to MongoDB
    try {
        await bookingData.save();
        console.log("Booking Record Inserted Successfully");
        return res.status(200).send("Booking confirmed!");
    } catch (err) {
        console.error("Error inserting booking record: ", err);
        return res.status(500).send("Error saving booking data.");
    }
});

// Home route
app.get("/", (req, res) => {
    res.set({ "Access-Control-Allow-Origin": '*' });
    return res.redirect('villa.html');
});

// Start server
app.listen(port, () => {
    console.log("Listening on port 3000");
});