import express from 'express';
import fetch from 'node-fetch';

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/boom-clap', async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send('Paramètre url manquant');

  try {
    const response = await fetch(url);
    const body = await response.text();
    res.set('Content-Type', 'application/vnd.apple.mpegurl');
    res.send(body);
  } catch (err) {
    res.status(500).send('Erreur: ' + err.message);
  }
});

app.listen(3000, () => {
  console.log('Proxy HLS lancé sur http://localhost:3000');
});
