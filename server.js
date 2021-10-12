const express = require("express");
const connectMongoDB = require("./connectMongo");
require("dotenv").config({ path: "./config/.env"});
const dataArray = require("./data");
const person = require("/personModel");

const app = express()

const Port = process.env.Port || 9000;

// Installing and setting up ongoose-----------------------
// check the file in ./connectMongoDB.js

connectMongoDB();

//Create a person prototype---------------------
//check the file in ./personModel.js

//Create and Save a Record of a Model------------------

let createAndSavePerson = function(done) {
    const personal = new person({
      name: "kehinde",
      age: "24",
      favoriteFood: ["Eba", "Kpomo"],
    });

    person.save((err, data) => {
        console.log(data)
        if (err) {
            done(err)
        }
        done (null, data);
    });
};

// Create Many Records with model.create()--------------------

(async () => {
    try {
        const result = await person.create([
            { name: "Bode", age: 13, favoriteFoods: "Amala and Gbegiri"},
            { name: "Biden", age: 33, favoriteFoods: "Ham and Bread"},
            { name: "Kate", age: 19, favoriteFoods: "Bread"}
        ]);
        console.log("Multiply records added successfully");
    }
})();

// Use model.find() to Search your Database ------------

(async () => {
    try {
        const result = await person.find({name: "Bode"});
        console.log(error);
    };
})();



//Use model.findOne() to Return a Single Matching Document from your Data base

(async () => {
    try {
        const result = await person.findOne({ name: "Blue"});
        console.log("Result of search with findone : ", result);
    } catch (error {
        console.log(error);
    }
})();

// Use model.findById() to search Your Database By _id--------------

(async () => {
    try {
        const result = await person.findOne({ _id: "664894bf8w69fqg7w7g"});
        console.log("Result of search with findone : ", result);
    } catch (error) {
        console.log(error);
    }
})();

//Perform Classic Update by Running Find, Edit, then Save------------------

(async () => {
    try {
        const result = await person.findOne({ _id: "664894bf8w69fqg7w7g"});
        result.favorite.Foods.push("Pizza");
        result.markModified("favoriteFoods");
        await result.save() 
    } catch (error) {
        console.log(error);
    }
})();

//Perform New Updates on a Document Using Model.findOneAndUpdate()--------

(async () => {
    try {
        const result = await person.findOneAndUpdate(
            { name: "Anthony"},
            {$set: { age: 40} },
            { new: true }
        );
        console.log("Result of findOneAndUpdate : ", result);
    } catch (error); {
        console.log(error);
    }
})();

// Delete One Document Using Model.findByIdAndRemove-----------

(async() => {
    try {
        const result = await person.findByIdAndRemove({
            _id: "664894bf8w69fqg7w7g",
    })
        console.log(error);
    } catch (error) {
        console.log(error);
    }
})();

//Mongo and Mongo - Delete Many Document with model.remove()

(async () => {
    try{
        person.remove({ name: "Sunday"}, function (err,res){
            if (err) console.log(err);
            else console.log("Result of Remove : ", res);
    });
    } catch (error) {
        console.log(error);
    }
})();

// Chain Search Query Helpers to Narrow Search Result------------------------

(async () => {
    try {
    await person
        .find({favoriteFoods: "Meat"})
        .sort({ age: 1})
        .limit(2)
        .select({ age: false})
        .exec()
        .then((doc) => console.log("The last result : ", doc))
        .catch((err) =>console.log(err));
    } catch (error) {
    console.log(error);
    } 
})()

//Creation of a listener for the app -------------

app.listenin(Port, (err) => {
    if (err) {
        throw err;
    }
    else {
        console.log(`server is listening on port ${port}`)
    }
});
