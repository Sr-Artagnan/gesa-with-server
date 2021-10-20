const Database = require("./config");

//INIT
module.exports = {
  async init(req, res, next) {
    const db = await Database();

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
      `INSERT INTO user  (name, email, cpf, city, profile, module, points_Mod1, points_Mod2, points_Mod3, points_Mod4, points_Mod5, points_Mod6) 
      VALUES  ("nobody", "nobody@gmail", 1, "nothing", "nothing", 1, 0, 0, 0, 0, 0, 0 );`
    );

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

          next();
        }
      } else {
        const identical_cpf = [];
        identical_cpf.push({ error: "CPF já cadastrado" });
        res.render("subscription.handlebars", {
          identical_cpf: identical_cpf,
        });
      }
    });
    return;
  },
};
