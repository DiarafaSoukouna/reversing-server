const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const Account = require("../models/Account");

const authController = {
  register: async (req, res) => {
    try {
      const {
        nom,
        prenom,
        email,
        username,
        password,
        roleId,
        categoryId,
        validity,
      } = req.body;

      // Vérifier si l'utilisateur existe déjà
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "Cet utilisateur existe déjà." });
      }

      // Créer l'utilisateur et récupérer l'ID
      const newUser = await User.createUser(nom, prenom, email, categoryId);
      console.log(newUser);
      const userId = newUser; // Assurez-vous que createUser renvoie un objet avec l'ID

      // Hash du mot de passe
      const passwordHash = await bcrypt.hash(password, 10);

      // Créer le compte en utilisant l'ID de l'utilisateur nouvellement créé
      await Account.createAccount(
        username,
        passwordHash,
        roleId,
        userId,
        validity
      );

      res.status(201).json({ message: "Inscription réussie" });
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de l'inscription", error });
    }
  },
  getUsers: async (req, res) => {
    try {
      const users = await prisma.utilisateurs.findMany();
      res.status(200).json({
        message: "Liste des utilisateurs",
        data: users,
        code: 200,
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs :", error);
      res.status(500).json({
        message: "Erreur lors de la récupération des utilisateurs",
        error: error.message,
        code: 500,
      });
    }
  },
  updateUser: async (req, res) => {
    const { id, nom, prenom, email, categoryId } = req.body;

    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }

      await User.updateUser(id, nom, prenom, email, categoryId);

      res.status(200).json({ message: "Mise à jour réussie" });
    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la mise à jour",
        error: error.message,
      });
    }
  },

  deleteUser: async (req, res) => {
    const { id } = req.params;

    try {
      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }

      await User.deleteUser(id);

      res.status(200).json({ message: "Utilisateur supprimé avec succès" });
    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la suppression de l'utilisateur",
        error: error.message,
      });
    }
  },
  getAccounts: async (req, res) => {
    try {
      const accounts = await prisma.comptes.findMany({
        select: {
          id: true,
          username: true,
          role_id: true,
          user_id: true,
          validity: true,
        },
      });
      res.status(200).json({
        message: "Liste des comptes",
        data: accounts,
        code: 200,
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des comptes :", error);
      res.status(500).json({
        message: "Erreur lors de la récupération des comptes",
        error: error.message,
        code: 500,
      });
    }
  },

  updateAccount: async (req, res) => {
    const { id, username, password, roleId, validity } = req.body;

    try {
      const account = await Account.findById(id);
      if (!account) {
        return res.status(404).json({ message: "Compte non trouvé" });
      }

      let passwordHash = account.password;

      if (password) {
        passwordHash = await bcrypt.hash(password, 10);
      }

      await Account.updateAccount(id, username, passwordHash, roleId, validity);
      res.status(200).json({ message: "Mise à jour du compte réussie" });
    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la mise à jour du compte",
        error: error.message,
      });
    }
  },

  deleteAccount: async (req, res) => {
    const { id } = req.params;

    try {
      const account = await Account.findById(id);
      if (!account) {
        return res.status(404).json({ message: "Compte non trouvé" });
      }

      await Account.deleteAccount(id);
      res.status(200).json({ message: "Compte supprimé avec succès" });
    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la suppression du compte",
        error: error.message,
      });
    }
  },
  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      // Récupérer le compte avec le username spécifié
      const account = await prisma.comptes.findUnique({
        where: { username: username },
        include: { utilisateurs: true }, // jointure avec la table utilisateurs
      });

      // Vérifie si le compte existe
      if (!account) {
        return res.status(400).json({ message: "Identifiants incorrects" });
      }

      // Vérifie le mot de passe
      const validPassword = await bcrypt.compare(password, account.password);
      if (!validPassword) {
        return res.status(400).json({ message: "Identifiants incorrects" });
      }

      // Générer un token JWT
      const token = jwt.sign(
        { userId: account.user_id, roleId: account.role_id }, // Vérifie bien le format de userId et roleId
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      // Envoie la réponse avec le token et les informations de l'utilisateur
      res.status(200).json({
        message: "Connexion réussie",
        token: token,
        user: {
          id: account.utilisateurs.id,
          nom: account.utilisateurs.nom,
          prenom: account.utilisateurs.prenom,
          email: account.utilisateurs.email,
          roleId: account.role_id,
          validity: account.validity,
        },
        code: 200,
      });
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      res.status(500).json({
        message: "Erreur lors de la connexion",
        error: error.message,
        code: 500,
      });
    }
  },
};

module.exports = authController;
