// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.



// Initialize the main project folder
app.use(express.static('website'));

// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Setup Server
const port =8000;
const localhost="127.0.0.1";
const server = app.listen(port, listening);

function listening(){
    console.log("Server running");
    console.log(`running on at:  https://${localhost}:${port}`);
}

let data = [];
//get data method

app.post("/addData",postData);
