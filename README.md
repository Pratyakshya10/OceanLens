# 🌊 OceanLens — AI-Powered Marine Conservation Platform

> Submit a photo → AI identifies species → Water health scored → Community data grows → Science happens.
> What takes a marine researcher 3 hours now takes **30 seconds**.

Built for the **NatGeo × TNC Externship (2026)**

🔗 **Live Demo:** [ocean-lens.vercel.app](https://ocean-lens.vercel.app) &nbsp;&nbsp; 🐙 **GitHub:** [Pratyakshya10/OceanLens](https://github.com/Pratyakshya10/OceanLens)

---

## The Problem

Coastal communities, divers, and fishers observe marine ecosystem changes daily — but have no way to:

- Document species sightings with AI-backed identification
- Report coral bleaching, pollution, or habitat loss systematically
- Contribute to an open dataset that institutions can actually use
- See their observations on a live global map in real time

The Tamil Nadu fisherman who notices the reef looks different has no platform. The Kashmiri wetland watcher has no tool. OceanLens changes that.

> **Origin story:** This project began watching the Saraswati River in Indore disappear with no systematic documentation. That silence is what OceanLens is built to end.

---

## The Solution

OceanLens lets anyone with a phone submit a marine or freshwater observation. AI interprets it instantly. The community owns the data.

---

## Core Demo Flow

1. Go to `/submit` and upload a water body photo
2. Enter your name, location coordinates, depth, and field notes
3. AI (Groq Llama 4 Scout Vision) identifies species and assesses water health
4. Observation is saved to the open dataset with bleaching level and confidence score
5. Pin appears live on the `/map` with full AI analysis
6. `/dashboard` updates with real-time stats
7. Export full dataset as CSV from dashboard

---

## ✨ Features

| Feature | Description |
|---|---|
| 🤖 AI Species Detection | Groq Llama 4 Scout Vision identifies species, bleaching level, and water health |
| 🗺️ Live Observation Map | Real pins placed from actual lat/lng coordinates, color-coded by bleaching level |
| 📊 Real-time Dashboard | Live stats — total observations, species count, AI analyses, active locations |
| 📍 Manual Coordinates | Submit observations from any location worldwide with manual lat/lng input |
| ☁️ Cloudinary Image Storage | Uploaded images stored persistently on Cloudinary CDN |
| 📥 CSV Export | Full open dataset downloadable as CSV in one click |
| 🌊 CoralWatch Scale | Bleaching rated 0–4 per CoralWatch methodology (healthy → fully bleached) |
| 📖 Impact Story Page | Live stats embedded in mission narrative — updates as community grows |

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite + Tailwind CSS v3 |
| Backend | Node.js + Express |
| Database | MongoDB Atlas |
| AI Vision | Groq API — Llama 4 Scout 17B Vision |
| Image Storage | Cloudinary |
| Frontend Deploy | Vercel |
| Backend Deploy | Render |

---

## 🗺️ Walkthrough

### 1. Submit — Upload photo with location and notes
Anyone with a phone can submit. GPS auto-detects location or enter coordinates manually for remote sites.

### 2. AI Analysis — Species identified, water health scored
Groq Llama 4 Scout Vision analyzes the image and returns species, bleaching level (CoralWatch 0–4), AI summary, and confidence score.

### 3. Map — Live observation pins across India and the world
Every submission appears as a colored pin. Click any pin to see the full AI analysis, image, and field notes.

### 4. Dashboard — Community data at a glance
Real-time counts of observations, species, AI analyses, and active locations. Export full dataset as CSV.

---

## Running Locally

```bash
# Clone the repo
git clone https://github.com/Pratyakshya10/OceanLens.git
cd OceanLens

# Backend
cd BACKEND/backend
npm install
# Add your .env (see below)
nodemon server.js

# Frontend (new terminal)
cd FRONTEND/frontend
npm install
npm run dev
```

---

## 🔑 Environment Variables

**Backend** (`BACKEND/backend/.env`):
```
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
GROQ_API_KEY=your_groq_api_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

**Frontend** (`FRONTEND/frontend/.env`):
```
VITE_API_URL=http://localhost:5000
```

---

## 📁 Project Structure

```
OceanLens/
├── BACKEND/
│   └── backend/
│       ├── config/
│       │   └── db.js
│       ├── controllers/
│       │   ├── observationController.js
│       │   └── mapController.js
│       ├── middleware/
│       │   ├── upload.js
│       │   └── errorHandler.js
│       ├── models/
│       │   └── Observation.js
│       ├── routes/
│       │   ├── observations.js
│       │   └── map.js
│       ├── services/
│       │   └── aiService.js
│       └── server.js
└── FRONTEND/
    └── frontend/
        └── src/
            ├── api/
            ├── components/
            ├── pages/
            │   ├── HomePage.jsx
            │   ├── SubmitPage.jsx
            │   ├── DashboardPage.jsx
            │   ├── MapPage.jsx
            │   └── StoryPage.jsx
            └── main.jsx
```

---

## How AI Integration Works

OceanLens uses the Groq API with Llama 4 Scout Vision to:

- Identify species, organisms, or environmental subjects in water body photos
- Rate coral bleaching on the CoralWatch 0–4 scale
- Generate plain-English water health summaries
- Return confidence scores for each analysis

The AI service (`aiService.js`) is fully isolated — it handles both Cloudinary URLs (production) and local file paths (development) automatically.

---

## 🌍 Live Observations

OceanLens has documented ecological conditions across India including:

- Chilika Lake (Odisha) — cyanobacterial blooms
- Gulf of Mannar (Tamil Nadu) — coral bleaching
- Wular Lake (Kashmir) — water hyacinth invasion
- Zuari River (Goa) — industrial fish kill
- Lakshadweep — reef bleaching at depth
- Sundarbans (West Bengal) — mangrove loss
- Kahn River (Indore) — origin story, severe pollution

---

## What We Believe

- **Open data** — every observation belongs to the community
- **Local knowledge** — the fisher who has worked the same reef for 30 years knows things no satellite can capture
- **AI as a tool, not a gatekeeper** — AI interprets observations, it does not decide who gets to make them

---

*"I started with a dying river in Indore. I want to make sure I'm part of the reason the ocean doesn't follow."*
