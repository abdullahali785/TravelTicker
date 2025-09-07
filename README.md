# 🌍 TravelTicker

TravelTicker is a Node.js + Express + PostgreSQL app that lets you track the countries you’ve visited.  
It displays visited countries, counts them, and prevents duplicates.

---

## 🚀 Features
- Add a country by name (case-insensitive search).
- View all visited countries and the total count.
- Prevent duplicate entries with database constraints.
- Shows error messages for invalid or duplicate countries.
- Database password stored securely in `password.txt` (not pushed to GitHub).

---

## 🛠️ Tech Stack
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [EJS](https://ejs.co/) for templating
- [pg](https://node-postgres.com/) for PostgreSQL connection

---

## ⚙️ Setup Instructions

```bash
git clone git@github.com:abdullahali785/TravelTicker.git
cd TravelTicker

npm install

node index.js
```

