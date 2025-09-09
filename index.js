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

async function checkVisited() {
  const result = await db.query(
    "SELECT country_code FROM visited_countries ORDER BY id ASC;"
  );
  let countries = [];
  result.rows.forEach(country => {
    countries.push(country.country_code);
  });

  return countries;
};

app.get("/", async (req, res) => {
  let countries = await checkVisited();

  res.render("index.ejs", {
    countries: countries,
    total: countries.length
  });
});

app.post("/add", async (req, res) => {
  const name = req.body.country;

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [name.toLowerCase()]
    );

    const data = result.rows[0]
    const code = result.rows[0].country_code

    try {
      await db.query(
        "INSERT INTO visited_countries (country_code) VALUES ($1);",
        [code]
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
      const countries = await checkVisited();

      res.render("index.ejs", {
        countries: countries,
        total: countries.length,
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

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});