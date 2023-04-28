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

app.post('/odgovori', (req, res) => {
  const objekt = req.body;
  const collection = client.db("projekt").collection('odgovorinapitanja');
  
  collection.findOneAndUpdate(
    { prviOdgovor: { $exists: true } },
    { $set: objekt }, // Ažuriramo ga s novim objektom
    { upsert: true } // ako ne postoji dokument s tim svojstvom, stvorit će se novi
  )
  .then(result => {
    console.log('Dokument uspješno ažuriran ili stvoren');
    res.status(200).json({ message: 'Objekt uspješno spremljen.'});
  })
  .catch(err => {
    console.log('Greška prilikom ažuriranja ili spremanja dokumenta:', err);
    // Vraćanje odgovora s http statusom 500 u slučaju greške
    res.status(500).json({ message: 'Došlo je do pogreške prilikom spremanja objekta.'});
  });
});
;

app.post('/mjere', (req, res) => {
  const rezultati = req.body;
  const collection = client.db("projekt").collection('napredak');

  collection.replaceOne({}, {rezultati}, { upsert:true })

  .then(result => {
    console.log('Dokument uspješno ažuriran ili stvoren');
    res.status(200).json({ message: 'Objekt uspješno spremljen.'});
  })
  .catch(err => {
    console.log('Greška prilikom ažuriranja ili spremanja dokumenta:', err);
    // Vraćanje odgovora s http statusom 500 u slučaju greške
    res.status(500).json({ message: 'Došlo je do pogreške prilikom spremanja objekta.'});
  });
});
;

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

  app.get('/mjere', (req, res) => {
    const collection = client.db("projekt").collection('napredak');
    
    collection.find().toArray()
    .then(results => {
      res.status(200).json(results);
    })
    .catch(error => {
      console.error(error)
      res.status(500).json({ message: 'Došlo je do pogreške prilikom dohvaćanja podataka.'});
    });
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

  app.get('/nesto', async (req, res) => {
    try {
      const db = client.db("projekt");
      const collection = db.collection("nesto");
      const cursor = collection.find();
      const result = await cursor.toArray();
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetchning data from database');
    }
  });

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
