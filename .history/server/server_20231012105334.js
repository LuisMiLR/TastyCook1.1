const express = require('express');
const server = express();
require('dotenv').config({path: './.env' });
const routesUsers = require('./routes/usersRoutes');
const routesPosts = require('./routes/postsRoutes');
const routesComments = require('./routes/commentsRoutes');
const bodyParser = require('body-parser');

const cors = require('cors');
// const { default: crud } = require('express-crud-router');
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

//server.use('/comments', routesComments);

// gestion des erreurs 404
server.use(({ res }) => {
    const message = "Erreur 404 Impossible de trouver la ressource demandée !";
    res.status(404).json({ message });
  });


// server.use(
//   crud('/admin/users', {
//     getList: ({ filter, limit, offset, order }) =>
//         models.Users.findAndCountAll({ limit, offset, order, where: filter }),
//     getOne: id => models.Users.findByPk(id),
//     create: body => models.Users.create(body),
//     update: (id, body, {req, res}) => models.Users.update(body, { where: { id } }).then(() => res.status(200).json({id, ...body})),
//     destroy: id => models.Users.destroy({ where: { id } })
//   })
// )

// server.use(
//   crud('/admin/posts', {
//     getList: ({ filter, limit, offset, order }) =>
//         models.Posts.findAndCountAll({ limit, offset, order, where: filter }),
//     getOne: id => models.Posts.findByPk(id),
//     create: body => models.Posts.create(body),
//     update: (id, body, {req, res}) => models.Posts.update(body, { where: { id } }).then(() => res.status(200).json({id, ...body})),
//     destroy: id => models.Posts.destroy({ where: { id } })
//   })
// )



  

server.listen(process.env.PORT, () => {
    console.log(`Le serveur est en routes ${process.env.PORT}`)
});