const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

const { client, connectToDB } = require('./db');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

connectToDB()

  app.get('/fullbody', async (req, res) => {
    try {
      const db = client.db("projekt");
      const collection = db.collection("fullbody");
      const cursor = collection.find();
      const result = await cursor.toArray();
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching data from database');
    }
  });

  app.get('/fullbody2', async (req, res) => {
    try {
      const db = client.db("projekt");
      const collection = db.collection("fullbody2");
      const cursor = collection.find();
      const result = await cursor.toArray();
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching data from database');
    }
  });

  app.get('/lowerbody', async (req, res) => {
    try {
      const db = client.db("projekt");
      const collection = db.collection("lowerbody");
      const cursor = collection.find();
      const result = await cursor.toArray();
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching data from database');
    }
  });

  app.get('/lowerbody-visedonji', async (req, res) => {
    try {
      const db = client.db("projekt");
      const collection = db.collection("lowerbody-visedonji");
      const cursor = collection.find();
      const result = await cursor.toArray();
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetchning data from database');
    }
  });

  app.get('/lowerbody-visegornji', async (req, res) => {
    try {
      const db = client.db("projekt");
      const collection = db.collection("lowerbody-visegornji");
      const cursor = collection.find();
      const result = await cursor.toArray();
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching data from database');
    }
  });

  app.get('/upperbody', async (req, res) => {
    try {
      const db = client.db("projekt");
      const collection = db.collection("upperbody");
      const cursor = collection.find();
      const result = await cursor.toArray();
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching data from database');
    }
  });

  app.get('/upperbody-visegornji', async (req, res) => {
    try {
      const db = client.db("projekt");
      const collection = db.collection("upperbody-visegornji");
      const cursor = collection.find();
      const result = await cursor.toArray();
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching data from database');
    }
  });

  app.get('/upperbody-visedonji', async (req, res) => {
    try {
      const db = client.db("projekt");
      const collection = db.collection("upperbody-visedonji");
      const cursor = collection.find();
      const result = await cursor.toArray();
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching data from database');
    }
  });

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
