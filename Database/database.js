const core = require('@actions/core');
const mongoose = require('mongoose');

//Mongo Database Stuff
var {MongoClient} = require('mongodb');
require('dotenv').config();


const uri = "mongodb+srv://" + process.env.USER_NAME + ":" + process.env.USER_PASSWORD + "@muninn.m3vbg.mongodb.net/test?retryWrites=true&w=majority";

async function main(){
    try{    
        await mongoose.connect(uri);
    } catch (e){
        console.log("Caught error " + e);
    }

    finally {
        
    }
}

main();






// async function main(){
//   /**
//    * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
//    * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
//    */

//     if(process.env.USER_NAME == undefined || process.env.USER_PASSWORD == undefined){
//         core.setFailed("Failed to validate user credentials");
//     }


//     const uri = "mongodb+srv://" + process.env.USER_NAME + ":" + process.env.USER_PASSWORD + "@muninn.m3vbg.mongodb.net/test?retryWrites=true&w=majority";
//     const client = new MongoClient(uri)

//                                     //Database Name         Collection Name
//     const gameCollection = client.db("testData").collection("games");

//     MongoClient.connect(uri, function(err, db) {
//         if (err) throw err;
//         var myObj = {_id: 154, name: "Animal Crossing", tags: ["MMO", "RPG", "HORROR"], ratings: 5, reviews: ["1", "2", "3"]}
//         // gameCollection.insertOne(myObj, function(err, res) {
//         //     if(err) throw err;
//         //     console.log("1 Document inserted");
//         // })

//         gameCollection.find({_id: 154}).toArray(function(err, result){
//             if(err) throw err;
//             console.log(result);
//         })
//     })

//     try {
//         await client.connect();
//         await listDatabases(client);
//     } catch (e) {
//         core.setFailed(e);
//     }

//     finally {
//         await client.close();
//     }
// }

// async function listDatabases(client){
//     databasesList = await client.db().admin().listDatabases();

//     console.log("Databases: ");
//     databasesList.databases.forEach(db => console.log(` - ${db.name}`));
// }

// main();