const express = require("express");
const routes = express.Router();


//Routes
routes.get("/", (req, res) => {res.render("index.handlebars")});
routes.get("/subscription", (req, res) => {res.render("subscription.handlebars")});
routes.get("/login", (req, res) => { res.render("login.handlebars")});



 
module.exports = routes;