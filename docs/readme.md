# 🚨 Rapid Response – Real-time Emergency Incident Reporting Platform

A web-based platform to **report emergencies instantly**, visualize live incidents on a **real-time map**, and manage actions using an **admin/responder dashboard**.

Built for **Hackathon Submission – Emergency Response Problem Statement**

---

## 📌 Overview

During emergencies (accidents, fire, crime, medical issues), **response is delayed due to slow reporting, verification issues, and lack of real-time visibility**.  
Rapid Response allows **citizens to report incidents instantly without login**, attach image proof, and plots them on a **live map with WebSocket updates**.

Admins can **verify reports, change status, track severity**, and quickly coordinate responders.

---

## 🎯 Key Features

| Feature | User | Admin |
|--------|------|-------|
| Report Incident (no login required) | ✔ | ✔ |
| Upload image + location | ✔ | ✔ |
| Live Map with markers | ✔ | ✔ |
| Real-time updates via Socket.IO | ✔ | ✔ |
| View incident details | ✔ | ✔ |
| Status update (Open → In-Progress → Resolved) | ❌ | ✔ |
| Incident Verification | ❌ | ✔ |
| Fake Report Detection (Image similar check) | ⏳ AI-assisted (beta) | ✔ |

---

## 🏗 Tech Stack

| Category | Used |
|---------|--------|
| Frontend | HTML, CSS, EJS, Bootstrap |
| Backend | Node.js + Express |
| Database | MongoDB |
| Realtime | Socket.IO |
| Maps | Leaflet OpenStreetMap (Free API) |
| File Upload | Multer + Cloudinary |
| Authentication | Session + bcrypt |
| Deployment | (to be uploaded after hosting) |

---

## 📡 Architecture Flow

