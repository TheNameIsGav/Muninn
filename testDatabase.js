//Mongo Database Stuff
var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
var url = "mongodb://localhost:27017/mydb";


//Script to create a new database, and then add a file to it.
//I am unsure if it overwrites the database every time I run it...
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  
  var dbo = db.db("mydb");
  dbo.createCollection("customers", function(err, res){
      if(err) throw err;
      console.log("Collection Created!");
  });

  var myobj = { name : "Company Inc", address: "Highway 37"};
  dbo.collection("customers").insertOne(myobj, function(err, res) {
    if(err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});