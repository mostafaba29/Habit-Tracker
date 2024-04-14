const {MongoClient} = require('mongodb');

async function connectToDatabase(){
    const uri = 'mongodb://localhost:27017';
    const dbName = 'HTdb';
    const client = new MongoClient(uri,{useNewUrlParser: true, useUnifiedTopology: true});

    try {
        await client.connect();
        console.log('connected to the db');
        const db = client.db(dbName);
        const collections = await db.listCollections().toArray();

        if (collections.length === 0 ){
            await db.createCollection('habits');
            console.log('habits collection created');
        }
        return db;
    } catch (error) {
        console.error('error connecting to the db',error);
        throw error;
    }
}

module.exports = connectToDatabase;