const express = require('express');
const app = express();
const path = require('path');
const {db} = require('./firebase');


app.set('view engine', 'ejs');
app.use(express.static('public'));

// Define the root route
app.get('/', async (req, res) => {
  const qscDocsPromise = db.collection('qsc').get();
  const networkDocsPromise = db.collection('ubiquiti').get();

  const [qscDocs, networkDocs] = await Promise.all([qscDocsPromise, networkDocsPromise]);

  const qscData = qscDocs.docs.map((doc) => doc.data());
  const networkData = networkDocs.docs.map((doc) => doc.data());

  res.render('index.ejs', { qsc: qscData, network: networkData });
});

app.get('/api/data', async (req, res) => {
  const qscDocsPromise = db.collection('qsc').get();
  const networkDocsPromise = db.collection('ubiquiti').get();

  const [qscDocs, networkDocs] = await Promise.all([qscDocsPromise, networkDocsPromise]);

  const qscData = qscDocs.docs.map((doc) => doc.data());
  const networkData = networkDocs.docs.map((doc) => doc.data());

  res.json({ qsc: qscData, network: networkData });
});


app.listen(3000, () => {
  console.log('Server on localhost:3000');
});
