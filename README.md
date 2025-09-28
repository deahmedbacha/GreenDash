# 🌍 GreenDash – Sustainability Intelligence Dashboard

GreenDash is a MERN-stack web application built during the Wärtsilä Hackathon 2025. It empowers power sector organizations to track, analyze, and act on crucial sustainability metrics, including:

* 🌱 **Renewable energy share**
* ⚡ **Efficiency**
* 🌫️ **CO₂ emissions**
* 📉 **Carbon intensity**
* ✅ **Compliance** (US/EU standards and EU Data Act principles)

With real-time Key Performance Indicators (KPIs), interactive charts, leaderboards, and CSV export, GreenDash helps stakeholders make data-driven decisions for a greener future and ensures regulatory compliance.

---

## ⚡ Tech Stack

**Frontend:**
* React (Vite)
* Tailwind CSS
* Recharts
* Axios
* lucide-react

**Backend:**
* Node.js
* Express.js
* MongoDB
* Mongoose
* dotenv
* CORS

**Database:**
* MongoDB

**Deployment:**
* Vercel (Frontend)
* Render/Heroku (Backend)
* MongoDB Atlas

---

## 📂 Project Structure

```bash
sustainability-platform/
├── backend/                  # Express.js API
│   ├── server.js
│   ├── routes/
│   │   └── metrics.js
│   ├── controllers/
│   │   └── metricsController.js
│   ├── models/
│   │   └── EnergyData.js
│   ├── importData.js         # CSV → Mongo import script
│   └── .env                  # Backend configuration
│
└── frontend/                 # React + Vite + Tailwind dashboard
    ├── src/
    │   ├── api/              # Axios client
    │   ├── components/       # Navbar, Sidebar, KPI, ChartCard, etc.
    │   ├── features/         # Dashboard modules
    │   ├── pages/            # Overview, Trends, Compliance
    │   ├── App.jsx
    │   └── main.jsx
    └── .env                  # Frontend configuration
```

## 🔧 Getting Started

1️⃣ Clone repository

```bash
git clone [https://github.com/deahmedbacha/GreenDash.git](https://github.com/deahmedbacha/GreenDash.git)
cd GreenDash
```

2️⃣ Backend setup
```bash
cd backend
npm install
```

Create a .env file in the backend directory with the following content:
```bash
MONGO_URI=mongodb://localhost:27017/energyDatas
PORT=5050
```

Start the backend server:

```bash
node server.js
```
👉 Runs on http://localhost:5050


3️⃣ Database import (Initial Data Load)
Use the mongoimport utility to load your sample CSV data. Ensure your CSV file (energy_data_output.csv) is in the backend directory.

```bash
mongoimport \
  --db energyDatas \
  --collection energydatas \
  --type csv \
  --headerline \
  --file ./energy_data_output.csv
```

4️⃣ Frontend setup
```bash

cd ../frontend
npm install
```

Create a .env file in the frontend directory with the API base URL:
```bash
VITE_API_BASE=http://localhost:5050
```

Run the development server:

```bash
npm run dev
```

👉 Opens http://localhost:5173
