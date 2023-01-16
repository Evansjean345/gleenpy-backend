const Partner = require("../models/partner"); //variable to define the collection or the model in the databse
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = (req, res) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const partner = new Partner({
      name: req.body.name,
      password: hash,
      date: Date(),
    });
    partner
      .save()
      .then(() => {
        res.status(200).json({ message: "partner crée" });
      })
      .catch((error) => {
        res.status(400).json({ error: error });
      });
  });
};

exports.login = (req, res) => {
  Partner.findOne({ name: req.body.name })
    .then((partner) => {
      if (!partner) {
        return res
          .status(400)
          .json({ message: "Paire login/mot de passe incorrect" });
      }
      bcrypt.compare(req.body.password, partner.password).then((valid) => {
        if (!valid) {
          return res
            .status(401)
            .json({ message: "Paire login/mot de passe incorrect" });
        }
        res.status(200).json({
          partnerId: partner._id,
          token: jwt.sign({ partner: partner._id }, "RANDOM_TOKEN_SECRET", {
            expiresIn: "24h",
          }),
        });
      });
    })
    .catch((error) => res.status(500).json({ error }));
};
