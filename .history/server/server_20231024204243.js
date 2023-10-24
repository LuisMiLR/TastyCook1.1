const express = require('express');
const server = express();
require('dotenv').config({path: './.env' });
const routesUsers = require('./routes/usersRoutes');
const routesPosts = require('./routes/postsRoutes');
const routesComments = require('./routes/commentsRoutes');
const bodyParser = require('body-parser');

const cors = require('cors');
const models = require('./models');
const path = require('path');


const port = process.env.PORT;

// middleware
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(cors({
    origin: "http://localhost:3000"
}))

//serveur de fichiers statiques
server.use('/public', express.static(path.join(__dirname, '/public')))

// Les routes users et les posts recettes
server.use('/user', routesUsers);
server.use('/post', routesPosts);
server.use('/comments', routesComments);

// gestion des erreurs 404
server.use(({ res }) => {
    const message = "Erreur 404 Impossible de trouver la ressource demandée !";
    res.status(404).json({ message });
  });



  

server.listen(process.env.PORT, () => {
    console.log(`Le serveur est en route sur le port: ${process.env.PORT}`)
});