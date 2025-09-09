import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import fs from "fs";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: fs.readFileSync("password.txt", "utf8"),
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 10;

let users = [];
let userData = await db.query("SELECT * FROM users");
userData.rows.forEach((usr) => {
  //console.log(usr.id, usr.name, usr.colour);
  users.push([usr.id, usr.name, usr.colour]);
});
//console.log(users);

async function checkVisited() {
  const result = await db.query("SELECT country_code FROM visited_countries WHERE user_id = $1", [currentUserId]);
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}; 

app.get("/", async (req, res) => {
  const countries = await checkVisited();
  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: "grey",
  }); 
});

app.post("/add", async (req, res) => {
  const input = req.body["country"];
  //console.log(input);

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    const data = result.rows[0];
    const countryCode = data.country_code;
    //console.log(countryCode);
    try {
      await db.query(
        "INSERT INTO visited_countries (country_code, user_id) VALUES ($1, $2)",
        [countryCode, currentUserId]
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
      const countries = await checkVisited();

      res.render("index.ejs", {
          countries: countries,
          total: countries.length,
          users: users,
          color: "grey",
          error: "Country has already been added!",
      });
    };

  } catch (err) {
    console.log(err);
    const countries = await checkVisited();

    res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      error: "Country Name Does Not Exist!"
    });
  };
});

app.post("/user", async (req, res) => {
  const input = req.body;
  //console.log(input);

  if (input.user) {
    currentUserId = req.body.user;
    const result = await db.query(
      "SELECT country_code FROM visited_countries WHERE user_id = $1",
      [currentUserId]
    );

    let countries = [];
    result.rows.forEach((country) => {
      countries.push(country.country_code);
    });
    //console.log(countries);

    const colourData = await db.query(
      "SELECT colour FROM users WHERE id = $1",
      [currentUserId]
    );

    //console.log(colourData.rows[0]);
    const colour = colourData.rows[0].colour;

    res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      users: users,
      color: colour,
    });

  } else if (input.add) {
    res.render("new.ejs");
  };
});

app.post("/new", async (req, res) => {
  const input = req.body;
  //console.log(input);

  await db.query(
    "INSERT INTO users (name, colour) VALUES ($1, $2)",
    [input.name, input.color]
  );

  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});