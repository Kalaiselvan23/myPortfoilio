const mongodb=require("mongodb");
const MongoClient=mongodb.MongoClient;
let database;
const dbUrl="mongodb://localhost:27017";
const dbName="blogSite";
async function getDb()
{
    const client=await MongoClient.connect(dbUrl);
    database=client.db(dbName)
    if(!database)
    {
        console.log("Database not connected")
    }
    return database;
}

module.exports={getDb}