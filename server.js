
//NodeJs Server Setup
var http = require('http');

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('Deployed To Heroku!');
}).listen(port);


//Mongo Database Stuff
var {MongoClient} = require('mongodb');
require('dotenv').config();

async function main(){
  /**
   * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
   * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
   */
  const uri = "mongodb+srv://" + process.env.USER_NAME + ":" + process.env.USER_PASSWORD + "@muninn.m3vbg.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri)
  
  
  try {
    await client.connect();
    await listDatabases(client);
  } catch (e) {
    console.error(e);
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

main().catch(console.error);