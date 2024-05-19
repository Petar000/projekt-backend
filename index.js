const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

app.use(express.json({ strict: false }));

const { client, connectToDB } = require('./db');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

connectToDB()

app.put('/odgovori', async (req, res) => {
  try {
    const objekt = req.body;
    const collection = client.db("projekt").collection('odgovorinapitanja');

    await collection.replaceOne(
      { prviOdgovor: { $exists: true } },
      objekt,
      { upsert: true }
    );

    console.log('Dokument uspješno ažuriran ili stvoren');
    res.status(200).json({ message: 'Objekt uspješno spremljen.' });
  } catch (err) {
    console.log('Greška prilikom ažuriranja ili spremanja dokumenta:', err);
    res.status(500).json({ message: 'Došlo je do pogreške prilikom spremanja objekta.' });
  }
});

app.get('/odgovori', async (req,res) => {
  try {
    const collection = client.db("projekt").collection('odgovorinapitanja');
    const cursor = collection.find();
    const result = await cursor.toArray();
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching data from database');
  }
});
/*
app.post('/mjere', async (req, res) => {
  try {
    const rezultati = req.body;
    const collection = client.db("projekt").collection('napredak');

    const result = await collection.replaceOne({}, {rezultati}, { upsert:true });

    console.log('Dokument uspješno ažuriran ili stvoren');
    res.status(200).json({ message: 'Objekt uspješno spremljen.'});
  } catch (err) {
    console.log('Greška prilikom ažuriranja ili spremanja dokumenta:', err);
    res.status(500).json({ message: 'Došlo je do pogreške prilikom spremanja objekta.'});
  }
});
*/
app.post('/mjere', async (req, res) => {
  try {
    const rezultati = req.body;
    const collection = client.db("projekt").collection('napredak');

    // Provjeri postoji li već dokument s odgovarajućim sessionId
    const existingDocument = await collection.findOne({ 'sessionId': rezultati.sessionId });

    if (!existingDocument) {
      // Ako ne postoji, dodaj novi dokument u kolekciju
      await collection.insertOne({ rezultati });
      console.log('Novi dokument dodan u kolekciju');
      res.status(200).json({ message: 'Objekt uspješno spremljen.'});
    } else {
      await collection.replaceOne({'sessionId': rezultati.sessionId}, {rezultati}, { upsert:true }); 
    }
  } catch (err) {
    console.log('Greška prilikom spremanja dokumenta:', err);
    res.status(500).json({ message: 'Došlo je do pogreške prilikom spremanja objekta.'});
  }
});

app.delete("/izbrisisve", (req, res) => {
  const collection = client.db("projekt").collection('napredak');
  collection.deleteMany()
  .then(result => {
    res.status(200).send('Podaci uspješno obrisani');
  })
  .catch(error => {
    console.error(error);
    res.status(500).send('Greška prilikom brisanja podataka');
  });
});

app.post('/mjere', async (req, res) => {
  try {
    const rezultati = req.body;
    const collection = client.db("projekt").collection('napredak');

    const result = await collection.replaceOne({}, {rezultati}, { upsert:true });

    console.log('Dokument uspješno ažuriran ili stvoren');
    res.status(200).json({ message: 'Objekt uspješno spremljen.'});
  } catch (err) {
    console.log('Greška prilikom ažuriranja ili spremanja dokumenta:', err);
    res.status(500).json({ message: 'Došlo je do pogreške prilikom spremanja objekta.'});
  }
});
  

  app.get('/fullbody1', async (req, res) => {
    try {
      const db = client.db("projekt");
      const collection = db.collection("fullbody1");
      const cursor = collection.find();
      const result = await cursor.toArray();
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send('Greška prilikom dohvaćanja podataka iz baze');
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
      res.status(500).send('Greška prilikom dohvaćanja podataka iz baze');
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
      res.status(500).send('Greška prilikom dohvaćanja podataka iz baze');
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
      res.status(500).send('Greška prilikom dohvaćanja podataka iz baze');
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
      res.status(500).send('Greška prilikom dohvaćanja podataka iz baze');
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
      res.status(500).send('Greška prilikom dohvaćanja podataka iz baze');
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
      res.status(500).send('Greška prilikom dohvaćanja podataka iz baze');
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
      res.status(500).send('Greška prilikom dohvaćanja podataka iz baze');
    }
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
