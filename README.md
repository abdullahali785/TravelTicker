# Family Travel Tracker

**Travel Ticker** is a web application that lets you track the travels of your entire family. Users can add family members, log visited countries, and view dynamic maps showing travel history.

---

## Features

- Track travels for multiple family members
- Add new users with a preferred color
- Log visited countries for each member
- View visited countries on the homepage
- Highlight countries with color coding per user
- Prevent duplicate country entries
- Responsive UI with maps (future enhancement)

---

## Tech Stack

- **Backend:** Node.js, Express.js  
- **Frontend:** EJS templates, HTML, CSS, JavaScript  
- **Database:** PostgreSQL  
- **Other Packages:** body-parser, pg, fs  

---

## Installation
```bash
git clone https://github.com/yourusername/travel-ticker.git
cd travel-ticker

npm install

node index.js
```
- App runs at http:localhost:3000

---

## Project Structure

├─ public/          # Static files (CSS, JS, images)
├─ views/           # EJS templates
├─ index.js         # Main server file
├─ password.txt     # PostgreSQL password (not committed)
├─ package.json
└─ README.md
