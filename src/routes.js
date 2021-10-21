const express = require("express");
const routes = express.Router();
var timeout = require('connect-timeout')
const server = express();


//Routes
routes.get("/", timeout('20s'), (req, res, next) => {res.render("index.handlebars")
if (!req.timedout) next()});
routes.get("/subscription", timeout('20s'), (req, res, next) => {res.render("subscription.handlebars")
if (!req.timedout) next()});
routes.get("/login", timeout('20s'), (req, res, next) => { res.render("login.handlebars")
if (!req.timedout) next()});



 
module.exports = routes;