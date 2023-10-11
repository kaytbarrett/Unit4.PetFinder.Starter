// import the pets array from data.js
const pets = require('./data');

// init express app
const express = require('express');
const app = express();

const PORT = 8080;

// GET - / - returns homepage
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

// hello world route
app.get('/api', (req, res) => {
    res.send('Hello World!');
});

// get all pets from the database
// to do this, we just need to access the data which has already been set to pets in line 2
// so all we have to do is res.send(pets)
app.get('/api/v1/pets', (req, res) => {
    //   console.log(pets);
    res.send(pets);
});

// get pet by owner with query string
// we are querying the owners name so 
// when api/v1/pets?owner=John, it will show Johns pets
//However, john has more than one pet so I am actually going to change the find all pet in the pets array 
//in order to display all of Johns pets 
//I will do this by using a pets.filter instead of pet.find
//Pet.find was only showing John's first pet Fido, not his second pet Rover

app.get('/api/v1/pets/owner', (req, res) => {
    // get the owner from the request
    const { owner } = req.query;

    // find the pet in the pets array
    const matchingPets = pets.filter(pet => pet.owner === owner);

    // send the pet as a response
    res.send(matchingPets);
});

// get pet by name
// here, we are looking to get the pet based on their name that is in the url
//to do this we will use req.params to get the name
// then find that pet based off what pet has that pet.name in the data
//then we will send that pet as a response
app.get('/api/v1/pets/:name', (req, res) => {
    // get the name from the request
    const { name } = req.params;


    // find the pet in the pets array
    const pet = pets.find(pet => pet.name === name);

    // send the pet as a response
    res.send(pet);

});

app.listen(PORT, () => {
    console.log('Server is listening on port ' + PORT);
});

module.exports = app;