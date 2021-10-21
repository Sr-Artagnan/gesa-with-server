const express = require("express");
const server = express();
const Database = require("./db/config.js");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const cors = require("cors");
var timeout = require('connect-timeout')

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(express.json());
server.use(cors)
server.use(express.urlencoded({ extended: true }));
server.use(express.static("public"));
server.engine("handlebars", handlebars({ defaultLayout: "main" }));
server.set("view engine", "handlebars");

var timeout = require('connect-timeout')
serve.use(timeout('25s'))

//Routes
server.get("/", (req, res, next) => {res.render("index.handlebars")
if (!req.timedout) next()});
server.get("/subscription", (req, res, next) => {res.render("subscription.handlebars")
if (!req.timedout) next()});
server.get("/login", (req, res, next) => { res.render("login.handlebars")
if (!req.timedout) next()});

//INIT
const initDB = {
  async init() {
    const db = await Database();

    // executa os comandos dentro do banco de dados
    await db.exec(`CREATE TABLE user (
name TEXT,
email TEXT,
cpf INTEGER PRIMARY KEY,
city,
profile,
module INT,
points_Mod1 INT,
points_Mod2 INT,
points_Mod3 INT,
points_Mod4 INT,
points_Mod5 INT,
points_Mod6 INT
)`);

    await db.run(
      `INSERT INTO user  (name, email, cpf, city, profile, module, points_Mod1, points_Mod2, points_Mod3, points_Mod4, points_Mod5, points_Mod6) VALUES  ("nobody", "nobody@gmail", 1, "nothing", "nothing", 1, 0, 0, 0, 0, 0, 0 );`
    );

    server.post("/redirect", async (req, res, next) => {
      const CPF = await db.all(`SELECT cpf FROM user`);

      const cpf_form = Number(req.body.cpf);

      CPF.map((item) => {
        console.log("CPF do DB: " + Number(item.cpf));
        console.log("CPF do formulário: " + cpf_form);

        if (cpf_form != item.cpf) {
          insertInto();
          async function insertInto() {
            res.render("redirect.handlebars", { name: req.body.name });
            await db.run(
              `INSERT INTO user  (name, email, cpf, city, profile, module, points_Mod1, points_Mod2, points_Mod3, points_Mod4, points_Mod5, points_Mod6) VALUES  ("${req.body.name}", "${req.body.email}", ${req.body.cpf}, "${req.body.city}", "${req.body.profile}", 1, 0, 0, 0, 0, 0, 0 );`
            );

          }
        } else {
          const identical_cpf = [];
          identical_cpf.push({ error: "CPF já cadastrado" });
          res.render("subscription.handlebars", {
            identical_cpf: identical_cpf,
          });
        }
      });
    });
  },
};

initDB.init();

server.post("/login", async (req, res) => {
  const db = await Database();
  const user = await db.all(`SELECT cpf FROM user`);
  const userForm = Number(req.body.cpf);
  var userDB = await db.all(`SELECT * FROM user WHERE cpf = ${userForm}`);

  // Valid
  user.map((item) => {
    const cpf = item.cpf;
    if (cpf == userForm) {
      server.get("/classroom", async (req, response) => {
        response.render("classroom.handlebars");
      }) && res.redirect("/classroom");

      server.post("/classroom", async (req, res) => {
        userDB.map((itemDB) => {
          const ident = itemDB.cpf;

          async function Filter() {
            const module = await db.all(
              `SELECT module FROM user WHERE cpf = ${ident}`
            );

            module.map((item) => {
              if (item.module == 1) {
                return (
                  server.get("/module_1", (req, res) => {
                    res.render("module_1.handlebars");
                  }) && res.redirect("/module_1")
                );
              }

              if (item.module == 2) {
                return (
                  server.get("/module_2", (req, res) => {
                    res.render("module_2.handlebars");
                  }) && res.redirect("/module_2")
                );
              }

              if (item.module == 3) {
                return (
                  server.get("/module_3", (req, res) => {
                    res.render("module_3.handlebars");
                  }) && res.redirect("/module_3")
                );
              }
              ("");
            });
          }
          Filter();

          //QUESTIONS
          server.post("/module_1", async (req, res) => {
            const option4 = req.body.option4_q1;
            const option5 = req.body.option1_q2;
            const option11 = req.body.option3_q3;
            const option13 = req.body.option1_q4;
            const option18 = req.body.option2_q5;

            const corrects = [option4, option5, option11, option13, option18];

            Points();
            async function Points() {
              corrects.forEach((element) => {
                map_options();
                async function map_options() {
                  if (element == "on") {
                    await db.all(
                      `UPDATE user SET points_Mod1 = points_Mod1 + 1 WHERE cpf = ${ident}`
                    );
                  }
                }
              });

              next_module();
              async function next_module() {
                userDB.map((itemDB) => {
                  identFunction();
                  async function identFunction() {
                    const ident = itemDB.cpf;
                    const Points_M1 = await db.all(
                      `SELECT points_Mod1 FROM user WHERE cpf = ${ident}`
                    );
                    const fewPoints_Q1 = [];
                    Points_M1.map((item) => {
                      if (item.points_Mod1 >= 3) {
                        up_module();
                        async function up_module() {
                          db.run(
                            `UPDATE user SET module = 2 WHERE cpf = ${ident}`
                          );
                        }
                      }
                    });
                    const module = await db.all(
                      `SELECT module FROM user WHERE cpf = ${ident}`
                    );
                    module.map((item) => {
                      if (item.module == 2) {
                        return (
                          server.get("/module_2", (req, res) => {
                            res.render("module_2.handlebars");
                          }) && res.redirect("/module_2")
                        );
                      } else {
                        fewPoints_Q1.push({ print1: "Pontos insuficientes" });
                        res.render("module_1.handlebars", {
                          fewPoints_Q1: fewPoints_Q1,
                        });
                        reset();
                        async function reset() {
                          await db.run(
                            `UPDATE user SET points_Mod1 = 0 WHERE cpf = ${ident}`
                          );
                        }
                      }
                    });
                  }
                });
              }
            }
          });

          //QUESTIONS Module_2
          server.post("/module_2", async (req, res) => {
            const option1 = req.body.option1_q1;
            const option2 = req.body.option2_q2;
            const option3 = req.body.option3_q3;
            const option4 = req.body.option4_q4;
            const option5 = req.body.option5_q5;

            const corrects = [option1, option2, option3, option4, option5];

            Points();
            async function Points() {
              corrects.forEach((element) => {
                map_options();
                async function map_options() {
                  if (element == "on") {
                    await db.all(
                      `UPDATE user SET points_Mod2 = points_Mod2 + 1 WHERE cpf = ${ident}`
                    );
                  }
                }
              });

              next_module();
              async function next_module() {
                userDB.map((itemDB) => {
                  identFunction();
                  async function identFunction() {
                    const ident = itemDB.cpf;
                    const Points_M2 = await db.all(
                      `SELECT points_Mod2 FROM user WHERE cpf = ${ident}`
                    );
                    const fewPoints_Q2 = [];
                    Points_M2.map((item) => {
                      if (item.points_Mod2 >= 3) {
                        up_module();
                      }
                      async function up_module() {
                        db.run(
                          `UPDATE user SET module = 3 WHERE cpf = ${ident}`
                        );
                      }
                    });
                    const module = await db.all(
                      `SELECT module FROM user WHERE cpf = ${ident}`
                    );
                    module.map((item) => {
                      if (item.module == 3) {
                        return (
                          server.get("/module_3", (req, res) => {
                            res.render("module_3.handlebars");
                          }) && res.redirect("/module_3")
                        );
                      } else {
                        fewPoints_Q2.push({ print2: "Pontos insuficientes" });
                        res.render("module_2.handlebars", {
                          fewPoints_Q2: fewPoints_Q2,
                        });
                        reset();
                        async function reset() {
                          await db.run(
                            `UPDATE user SET points_Mod2 = 0 WHERE cpf = ${ident}`
                          );
                        }
                      }
                    });
                  }
                });
              }
            }
          });
        });
      });
    } else {
      res.render("login");
    }
  });
});
server.listen(process.env.PORT, () => console.log("rodando"));
