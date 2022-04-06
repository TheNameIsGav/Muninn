const core = require('@actions/core');

//Mongo Database Stuff
var {MongoClient} = require('mongodb');
require('dotenv').config();

async function main(){
  /**
   * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
   * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
   */

    if(process.env.USER_NAME == undefined || process.env.USER_PASSWORD == undefined){
        core.setFailed("Failed to validate user credentials");
    }

    console.log(process.env.USER_NAME);
    console.log(process.env.USER_PASSWORD);

    const uri = "mongodb+srv://" + process.env.USER_NAME + ":" + process.env.USER_PASSWORD + "@muninn.m3vbg.mongodb.net/test?retryWrites=true&w=majority";
    const client = new MongoClient(uri)

    try {
        await client.connect();
        await listDatabases(client);
    } catch (e) {
        core.setFailed(e);
    }

    finally {
        await client.close();
    }
}

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases: ");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}

main();