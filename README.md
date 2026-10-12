# Smart College Doubt Solving Platform (CampusDoubt / DoubtHub)

An AI/ML-powered Question & Answer community platform tailored for college students to post, discover, and resolve technical doubts efficiently.

**Live links**
- Frontend: https://campusdoubt.vercel.app
- ML service (Swagger docs): https://task-4-doubthub.onrender.com/docs
- Backend API: https://task-4-doubthub-6liq.onrender.com

> The backend and ML service run on Render's free tier and sleep when idle. The first request after a pause can take 30–60 seconds.

---

## 📌 Project Overview

In a typical college technical ecosystem, students frequently encounter repetitive technical doubts. Existing communication channels make finding past answers difficult, and multi-domain questions get mixed together.

The platform adds an intelligent ML layer to a Stack Overflow-style Q&A web app. The ML service automatically classifies questions by domain and recommends similar questions from the same domain.

---

## 👥 Team Details — Gradient Descenders

### 👨‍🏫 Mentors
* **Harsh Giri Sir** — ML Mentor
* **Dishant Singh Sir** — ML Mentor
* **Somu Sir** — Frontend Mentor
* **Ujjawal Sir** — Backend Mentor
* **Kamakshi Rai Ma'am** — Design Mentor

### 🎓 Team Members
* **Varun Kumar** — Machine Learning
* **Divyansh Chaurasia** — Machine Learning
* **Jitendra Sahu** — Machine Learning
* **Ayush Kumar Gupta** — Machine Learning
* **Priyanka Pal** — Frontend Development
* **Abhinav Gupta** — Backend Development

---

## 🎯 Key Features

### 🤖 Machine Learning (FastAPI)
* **Domain classification (Model 1):** predicts Backend, Cyber Security, DSA, Frontend, ML/AI or Programming Language from the question text.
* **Similar-question recommendation (Model 2):** TF-IDF + KMeans clustering with cosine similarity, run within the predicted domain's dataset.

### ⚙️ Backend (Node.js / Express / MongoDB)
* Signup and login with bcrypt password hashing and JWT authentication, with domain selection.
* Questions: create (domain auto-assigned by the ML model), list, inbox by domain, my questions, resolve.
* Answers: post, list, delete own, accept (question owner only).
* Bookmarks, domains, user points and reputation.
* Acts as the bridge between the frontend and the ML service.

### 💻 Frontend (React + Vite)
* Home feed, questions list, categories, trending, search results.
* Ask Question page with live domain prediction and "Recommend (ML Model 2)".
* Question detail with answers, similar doubts, bookmarks, profile and my answers.

---

## 🔄 System Architecture

    [React Frontend (Vercel)] ──> [Express Backend (Render)] ──> [FastAPI ML Service (Render)]
              │                           │
              │                           ▼
              │                   [MongoDB database]
              │
              └──────────────────────────────────────> [ML Service: /predict, /recommend]

1. The student signs up or logs in and receives a JWT.
2. While typing a question, the frontend calls the ML service `/predict` for a live domain label.
3. On post, the backend calls the ML service, normalizes the domain, and stores the question.
4. Similar questions are fetched from the ML service `/recommend`.
5. Other students answer; the owner accepts an answer and marks the doubt resolved.

---

## 🛠️ Tech Stack

| Component | Stack |
| :--- | :--- |
| **Frontend** | React 19, Vite, React Router, lucide-react |
| **Backend** | Node.js, Express 5, Mongoose, JWT, bcryptjs |
| **ML Service** | Python, FastAPI, Uvicorn, scikit-learn, pandas, joblib |
| **Database** | MongoDB |
| **Hosting** | Vercel (frontend), Render (backend + ML) |
| **Version Control** | Git & GitHub |

---

## 📁 Project Structure

```text
Task_4_DoubtHub/
│
├── Frontend/                          # 💻 React + Vite app (deployed on Vercel)
│   ├── public/                        # favicon.svg, icons.svg
│   ├── src/
│   │   ├── api/
│   │   │   └── api.js                 # All backend + ML API calls
│   │   ├── assets/                    # Images (hero, student photo, backgrounds)
│   │   ├── components/
│   │   │   └── Navbar.jsx
│   │   ├── pages/
│   │   │   ├── home.jsx
│   │   │   ├── login.jsx
│   │   │   ├── signup.jsx
│   │   │   ├── question.jsx           # Questions list
│   │   │   ├── questiondetail.jsx     # Question + answers
│   │   │   ├── askquestion.jsx        # Ask page (live ML prediction)
│   │   │   ├── similarquestion.jsx    # ML similar doubts
│   │   │   ├── categories.jsx
│   │   │   ├── trending.jsx
│   │   │   ├── bookmarks.jsx
│   │   │   ├── myanswer.jsx
│   │   │   ├── profile.jsx
│   │   │   ├── searchresults.jsx
│   │   │   ├── categories.css
│   │   │   └── similarquestion.css
│   │   ├── App.jsx                    # Routes
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vercel.json                    # SPA rewrite for React Router
│   ├── vite.config.js                 # Dev-only /ml proxy
│   ├── eslint.config.js
│   └── package.json
│
├── backend/                           # ⚙️ Express API (deployed on Render)
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                  # MongoDB connection
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── queryControllers.js
│   │   │   ├── answerController.js
│   │   │   ├── bookmarkController.js
│   │   │   └── domainControllers.js
│   │   ├── middleware/
│   │   │   └── authMiddleware.js      # JWT verification
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Query.js
│   │   │   ├── Answer.js
│   │   │   ├── Bookmark.js
│   │   │   └── Domain.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── queryRoutes.js
│   │   │   ├── answerRoutes.js
│   │   │   ├── bookmarkRoutes.js
│   │   │   └── domainroutes.js
│   │   ├── services/
│   │   │   ├── mlService.js
│   │   │   ├── model1Service.js       # Calls ML /predict
│   │   │   └── model2Service.js       # Calls ML /recommend
│   │   └── utils/
│   │       └── generateToken.js
│   ├── app.js                         # Express app, CORS, routes
│   ├── server.js                      # Entry point
│   └── package.json
│
├── ml_service/                        # 🤖 FastAPI ML microservice (deployed on Render)
│   ├── model/
│   │   ├── domain_classifier.joblib
│   │   └── domain_classifier_vectorizer.joblib
│   ├── training/
│   │   ├── data/                      # Per-domain Q&A CSVs and classifier datasets
│   │   ├── Domain_classifier.ipynb
│   │   ├── Text_Preprocessing.ipynb
│   │   └── recommend.py               # Similar-question logic (TF-IDF + KMeans)
│   ├── app.py                         # API: /, /predict, /recommend (with CORS)
│   └── requirements.txt
│
├── .gitignore
└── README.md
```

---

## 🚀 Running Locally

**1. ML service**
```bash
cd ml_service
pip install -r requirements.txt
uvicorn app:app --reload --port 8001
```

**2. Backend**
```bash
cd backend
npm install
npm run dev
```

**3. Frontend**
```bash
cd Frontend
npm install
npm run dev
```

### Environment variables

| Where | Variable | Purpose |
| :--- | :--- | :--- |
| Backend | `MONGO_URI` | MongoDB connection string |
| Backend | `JWT_SECRET` | Secret used to sign tokens |
| Backend | `JWT_EXPIRES_IN` | Token lifetime (default `7d`) |
| Backend | `PORT` | Server port (default `8000`) |
| Frontend | `VITE_API_URL` | Backend base URL, e.g. `https://<backend>/api` |
| Frontend | `VITE_ML_API_URL` | ML service URL |

---

## 🔌 API Overview

Base path: `/api`

| Area | Endpoints |
| :--- | :--- |
| Auth | `POST /auth/signup`, `POST /auth/login`, `GET /auth/profile` |
| Queries | `GET/POST /queries`, `GET /queries/inbox`, `GET /queries/my`, `GET /queries/:id`, `GET /queries/:id/similar`, `PATCH /queries/:id/resolve`, `POST /queries/predict`, `POST /queries/recommend` |
| Answers | `POST/GET /answers/:queryId`, `GET /answers/my`, `DELETE /answers/:id`, `PATCH /answers/:id/accept` |
| Bookmarks | `GET /bookmarks`, `POST/DELETE /bookmarks/:queryId` |
| Domains | `GET /domains`, `GET /domains/:name` |

ML service: `POST /predict` and `POST /recommend`, both with body `{ "Query": "..." }`.

---

## ☁️ Deployment Notes

* **Vercel (frontend):** Root Directory `Frontend`, Framework Vite, `vercel.json` inside `Frontend/`.
* **Render (ML):** Root Directory `ml_service`, Build `pip install -r requirements.txt`, Start `uvicorn app:app --host 0.0.0.0 --port $PORT`.
* **Render (backend):** Root Directory `backend`, Build `npm install`, Start `npm start`.
* **CORS:** the ML service allows `https://campusdoubt.vercel.app` and `http://localhost:5173`. Add any new frontend domain to `allow_origins` in `ml_service/app.py`.

---

## 📜 License

This project is developed by team **Gradient Descenders** for the final probation task evaluation.
