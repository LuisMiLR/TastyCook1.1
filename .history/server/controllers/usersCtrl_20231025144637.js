const models = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtUtils = require("../middleware/jwtUtils");
require("dotenv").config({ path: "./config/.env" });
const saltRounds = 10;
const validator = require("validator");
const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;


// Register

module.exports = {
  register: async (req, res) => {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
      return res
        .status(500)
        .json({ message: "Veuillez remplir tous les champs." });
    }
    if (!regexPassword.test(password)) {
      return res.status(400).json({ message: "invalid password" });
    }
    if (!validator.isEmail(email)) {
      console.log("EMAIL");
      return res.status(400).json({ message: "invalid email" });
    }
    const user = await models.Users.findOne({ where: { email: email } }).catch(
      (e) => {
        return res.status(500).json({ message: "user not found." });
      }
    );
    if (user === null) {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        const newUser = await models.Users.create({
          username: username,
          password: hash,
          email: email,
          role: role || "user", // initialise le champ role à "user" si role est faux
        });
        if (newUser) {
          return res.status(200).json({ message: "User crée." });
        } else {
          return res.status(400).json({ message: "erreur serveur." });
        }
      });
    } else {
      return res
        .status(500)
        .json({ message: "cet email existe déjà, veuillez-vous connecter." });
    }
  },

  // Login

  auth: async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(500)
        .json({ message: "Veuillez remplir tous les champs." });
    }
    const user = await models.Users.findOne({ where: { email: email } });
    if (user) {
      const password_valid = await bcrypt.compare(password, user.password);
      if (password_valid) {
        token = jwt.sign(
          {
            id: user.id,
            email: user.email,
            prenom: user.prenom,
            nom: user.nom,
            is_admin: user.is_admin,
          },
          process.env.SECRET
        );
        return res.status(200).json({ token: token });
      } else {
        return res.status(400).json({ error: "Password Incorrect" });
      }
    } else {
      return res.status(404).json({ error: "User does not exist" });
    }
  },

  //logout

  logoutUser: (req, res) => {
    // Supprimer le JWT stocké dans le stockage local
    localStorage.removeItem("token");
    // Rediriger l'utilisateur vers la page de connexion ou la page d'accueil
    res.redirect("/login");
  },

  // Update User

  updateUser: async (req, res) => {
    const id = req.params.id;
    const { username, email } = req.body;

    if (!username || !email) {
      return res
        .status(500)
        .json({ message: "Veuillez remplir tous les champs." });
    }

    const user = await models.Users.findOne({ where: { id } });
    await user
      .update({
        username: username ? username : user.username,
        email: email ? email : user.email,
      })
      .then(() => {
        return res.status(200).json({ message: "modification effectué" });
      })
      .catch((e) => {
        return res
          .status(400)
          .json({ message: "erreur lors de la modification" });
      });
  },

  //suppression d'un user

  deleteUser: async (req, res) => {
    const id = req.params.id;

    const user = await models.Users.findOne({ where: { id: id } });
    if (user) {
      await models.Users.destroy({
        where: { id: id },
      })
        .then(() => {
          return res.status(200).json({ message: "utilisateur supprimé" });
        })
        .catch((e) => {
          return res
            .status(400)
            .json({ message: "erreur lors de la suppression" });
        });
    }
  },

  // Get All Users

  getAllUsers: async (req, res) => {
    await models.Users.findAll()
      .then((users) => {
        return res.status(200).json({ users: users });
      })
      .catch((e) => {
        return res.status(400).json({ message: "une erreur est survenue." });
      });
  },

  // Get One User

  getUserProfile: async (req, res) => {
    const authorization = req.headers["authorization"];
    const userId = jwtUtils.getUser(authorization);
    await models.Users.findOne({ where: { id: userId } })
      .then((user) => {
        return res.status(200).json({ user: user });
      })
      .catch((e) => {
        return res.status(400).json({ message: "Utilisateur pas trouvé" });
      });
      
  },
};


INSERT INTO Users ( username, password, email, role )
VALUES ( 'value_username', 'value_password', 'value_email' )