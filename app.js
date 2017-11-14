const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(express.static(__dirname));

app.use(bodyParser.json()); // support json encoded bodies
// app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// some data for the API
var foods = [
  { "id": 1, "name": "Donuts" },
  { "id": 2, "name": "Pizza" },
  { "id": 3, "name": "Tacos" }
];

// the "index" route, which serves the Angular app
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname,'index.html'))
});

// the GET "foods" API endpoint
app.get('/api/food', function (req, res) {

    console.log("GET foods");

    // This is a very simple API endpoint. It returns the current value of the "foods" array.
    res.send(foods);

});

// POST endpoint for creating a new food
app.post('/api/food', function (req, res) {
    // NOTE: This is a sample app to show the Angular Http client functionality.
    // This API endpoint keeps the submitted data in memory. It does not save to a database.

    // This example uses Express because it is easy to install and run.
    // You could write a different back-end app in PHP, Python, Ruby, .NET, etc.

    console.log("POST food: " + req.body.name);

    // calculate the next ID
    let id = 1;
    if (foods.length > 0) {
        let maximum = Math.max.apply(Math, foods.map(function (f) { return f.id; }));
        id = maximum + 1;
    }

    // build the new food object
    let new_food = {"id": id, "name": req.body.name};

    // "save" the data by adding it to the "foods" array in memory
    foods.push(new_food);

    // In the real world, you would put code here to save the data to a
    // database or another type of storage.

    // When we're done, it's nice to return the newly created object to the caller.
    res.send(new_food);

});

// PUT endpoint for editing food
app.put('/api/food/:id', function (req, res) {

    console.log("PUT food: " + req.params.id);

    // read the ID from the query string
    let id = req.params.id;

    // find the requested food in the array
    let f = foods.find(x => x.id == id);

    // write the new name to the data storage
    f.name = req.body.name;

    // send a copy of the modified object back to the caller
    res.send(f);

});

// DELETE endpoint for deleting food
app.delete('/api/food/:id', function (req, res) {

    console.log("DELETE food: " + req.params.id);

    // read the ID from the query string
    // (DELETE requests don't have a body)
    let id = req.params.id;

    // read the object from the data (so we have it later)
    let f = foods.find(x => x.id == id);

    // remove it from the data
    foods = foods.filter(x => x.id != id);

    // send back the object we deleted, in case the caller wants to look at what was there
    res.send(f);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// HTTP listener
app.listen(3000, function () {
    console.log('Example listening on port 3000!');
});
module.exports = app;
