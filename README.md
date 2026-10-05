# Smart College Doubt Solving Platform

An AI/ML-powered Question & Answer community platform tailored for college students to post, discover, and resolve technical doubts efficiently[cite: 10, 11].

---

## 📌 Project Overview

In a typical college technical ecosystem, students frequently encounter repetitive technical doubts[cite: 11]. Existing communication channels often make finding past answers difficult, and multi-domain questions get mixed together[cite: 11].

The **Smart College Doubt Solving Platform** integrates an intelligent ML layer onto a Stack Overflow-style Q&A web application[cite: 11]. The ML service automatically categorizes questions by domain and topic, detects duplicate or similar questions prior to posting, and recommends relevant discussion threads[cite: 10, 11].

---

## 👥 Team Details — Gradient Descenders

### 👨‍🏫 Mentors
* **Harsh Giri Sir** — ML Mentor[cite: 10]
* **Dishant Singh Sir** — ML Mentor[cite: 10]
* **Somu Sir** — Frontend Mentor[cite: 10]
* **Ujjawal Sir** — Backend Mentor[cite: 10]
* **Kamakshi Rai Ma'am** — Design Mentor[cite: 10]

### 🎓 Team Members
* **Varun Kumar** — Machine Learning[cite: 10]
* **Divyansh Chaurasia** — Machine Learning[cite: 10]
* **Jitendra Sahu** — Machine Learning[cite: 10]
* **Ayush Kumar Gupta** — Machine Learning[cite: 10]
* **Priyanka Pal** — Frontend Development[cite: 10]
* **Abhinav Gupta** — Backend Development[cite: 10]

---

## 🎯 Key Modules & Task Distribution

### 🤖 Machine Learning Module (40%)[cite: 10, 13]
* **Automatic Classification (15%):** Predicts broad domain and topic (e.g., Frontend, Backend, ML/AI, DSA, Database, DevOps) from question titles and descriptions[cite: 13].
* **Similar Question Detection (15%):** Vectorizes question text to detect duplicate or highly similar questions before submission[cite: 13].
* **Recommendations (10%):** Recommends related questions and topics based on text similarity and user activity[cite: 13].

### ⚙️ Backend Module (30%)[cite: 10, 14]
* **Authentication & Security:** Signup, login, password hashing, and protected route access[cite: 14].
* **Question & Answer Pipeline:** Full CRUD operations for creating, reading, searching, and filtering doubts[cite: 14].
* **Voting & Reputation Engine:** Upvote/downvote logic, marking accepted answers, and updating user reputation scores[cite: 14].
* **ML Microservice Connection:** Handles HTTP requests and data flow between the main application and the ML service[cite: 14].

### 💻 Frontend Module (30%)[cite: 10, 14]
* **Q&A Dashboard:** Main home feed displaying latest/trending doubts with search and domain filtering[cite: 14].
* **Smart Similarity UI:** Real-time pop-up displaying potential duplicate questions while the user drafts a post[cite: 14].
* **Interactive Question Page:** Displays detailed question text, community answers, voting controls, and accepted solution indicators[cite: 14].
* **User Profile & Activity:** Displays student reputation, history of asked questions, given answers, and achievements[cite: 14].

---

## 🔄 System Architecture & Workflow

[Student Frontend] ──> [Backend Server] ──> [ML Microservice]
│                     │                    │
│                     ▼                    ▼
│             [Database Store]    [ML Models / Inference]
│                     │
└─────────────────────┴──> [Community Answers & Upvotes]

This project is developed by team Gradient Descenders for the final probation task evaluation.