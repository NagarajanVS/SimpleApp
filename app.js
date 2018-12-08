var express = require("express");
var app = express();
var bodyparser = require("body-parser");
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

var newName;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'myproject';

// Create a new MongoClient
const client = new MongoClient(url);



app.use(bodyparser.urlencoded({extended:true}));

app.get("/", function(req, res){
    //res.send("Welcome to Home");
    res.render("home.ejs");
});

app.post("/addfriend", function(req, res){
    //res.send("Welcome to Home");
    newName = req.body.newfriend;
    console.log(newName);


    // Use connect method to connect to the Server
client.connect(function(err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
  
    const db = client.db(dbName);

    const name = newName
  
    // Insert a single document
  db.collection('inserts').insertOne({
    a:newName
  , b: function() { return 'hello'; }
}, {
    w: 'majority'
  , wtimeout: 10000
  , serializeFunctions: true
}, function(err, r) {
assert.equal(null, err);
assert.equal(1, r.insertedCount);
client.close();
console.log("Inserted Sucessfully");
});
    
findDocuments(db, function() {
});
  });

  

    res.send("You are requesting to Add "+newName+" as new Friend");
});

const findDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");
      console.log(docs);
      callback(docs);
    });
  }


app.listen("3000", function(req, res){
    console.log("Server is running");
});