const Database = require("./db/config.js");
const express = require("express");
const server = express();

module.exports = {
async postLogin(req, res, next) {
  res.headersSent = null
  const db = await Database();
  const user = await db.all(`SELECT cpf FROM user`);
  const userForm = Number(req.body.cpf);
  var userDB = await db.all(`SELECT * FROM user WHERE cpf = ${userForm}`);

  // Valid
  user.map((item) => {

    const cpf = item.cpf;
    
     
    if (cpf == userForm) {
      server.get("/classroom", async (req, res) => {
        res.render("classroom.handlebars");
      })
      res.redirect("/classroom")
      

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
}
}