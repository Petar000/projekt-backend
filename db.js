const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://petar:1234@webapps-learntotrain.salpwu2.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
}
module.exports = { client, connectToDB };