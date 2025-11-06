// server.js
const express = require('express');
const app = express();

// Autoriser les requêtes cross-origin (CORS)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// Endpoint principal /boom-clap
app.get('/boom-clap', async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) {
    return res.status(400).send("Paramètre 'url' manquant !");
  }

  try {
    // Récupérer le contenu du flux externe
    const response = await fetch(targetUrl);
    const body = await response.text();

    // Définir le type MIME HLS
    res.set('Content-Type', 'application/vnd.apple.mpegurl');
    res.send(body);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur lors du proxy : " + err.message);
  }
});

// Lancer le serveur sur le port fourni par Render (ou 3000 par défaut)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy HLS lancé sur http://localhost:${PORT}`);
});
