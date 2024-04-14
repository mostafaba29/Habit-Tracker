const express = require('express');
const connectToDatabase = require('./MongoClient');
const app = express();
const port = 3000;

async function main() {
    try {
        const db = await connectToDatabase();
        console.log('connected to the db');
        app.listen(port, () => {
            console.log(`server is running on port ${port}`);
        });
    } catch (error) {
        console.error('error connecting to the db', error);
        throw error;
    }
}
main();