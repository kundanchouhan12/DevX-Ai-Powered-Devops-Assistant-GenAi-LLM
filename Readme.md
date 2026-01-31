# 🚀 AI DevOps Assistant

> **Think: ChatGPT + DevOps Engineer in one tool**

An **AI-powered DevOps assistant** that analyzes GitHub repositories, Docker configurations, and infrastructure using **LLMs, Redis, BullMQ**, and **containerized background workers**.

⚠️ **Not a demo chatbot** — this project demonstrates **real-world GenAI + DevOps system design** used in production-grade architectures.

---

## 🧠 What This Project Does

**AI DevOps Assistant** helps developers and teams **understand, optimize, and improve** their codebases and DevOps setup.

Once a repository is connected, the system can:

* 🔍 Understand the complete **codebase structure**
* 🐛 Detect **bugs & bad practices**
* 🐳 Analyze **Dockerfiles** and suggest optimizations
* 🔁 Generate **CI/CD pipelines**
* 🔐 Provide **performance & security recommendations**

✅ Real-world utility
✅ Enterprise-grade architecture
✅ Interview-ready **GenAI + DevOps** project

---

## 🔥 Key Features

### 🧠 Codebase Intelligence

* Connect GitHub repositories
* Analyze folder & file structure
* AI-powered insights such as:

  * *“Can this service cause a memory leak?”*
  * *“Which files need refactoring?”*
  * *“Security risks in this repo?”*

---

### 🐳 Docker Analyzer

* Upload or auto-detect `Dockerfile`
* AI explains:

  * Why the image size is large
  * How to optimize using **multi-stage builds**
  * Base image **security issues**

---

### ⚡ Redis Smart Layer (Core Strength)

Redis is a **core architectural component**, not an add-on:

* 🧠 Cache AI analysis results
* ⏳ Queue long-running jobs using **BullMQ**
* 🚦 Rate-limit LLM requests
* 💬 Maintain chat / analysis context

---

### 🤖 LLM Magic

* Code explanation
* Bug detection
* Infra & Docker optimization
* CI/CD YAML generation

**Supported LLMs:**

* Gemini LLM
* Ollama *(local LLM – zero cost 💰)*
* OpenAI *(optional)*

---

### 📊 Developer Dashboard *(Planned)*

* Repository health score
* Docker optimization score
* CI/CD readiness score
* AI usage statistics

---

## 🛠 Tech Stack

### Frontend

* React + Vite
* Tailwind CSS
* Chat-style UI
* Repo analysis dashboard

### Backend

* Node.js
* Express.js
* GitHub API integration
* LLM orchestration layer

### Queue & Cache

* Redis
* BullMQ

### GenAI

* Gemini LLM
* 
### Infrastructure

* Docker
* Docker Compose

---

## 📁 Project Folder Structure

```
ai-devops-assistant/
│
├── docker-compose.yml          # Docker services orchestration
├── package.json                # Root scripts
├── README.md                   # Project documentation
│
├── backend/                    # Backend API (Node.js + Express)
│   ├── server.js
│   ├── redis.js
│   ├── routes/
│   │   └── analyze.js
│   ├── queue/
│   │   └── repoQueue.js        # BullMQ producer
│   ├── Dockerfile
│   ├── .env
│   └── package.json
│
├── worker/                     # Background job processor
│   ├── worker.js
│   ├── redis.js
│   ├── queue/
│   │   └── repoQueue.js        # BullMQ consumer
│   ├── Dockerfile
│   ├── .env
│   └── package.json
│
├── frontend/                   # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── Dockerfile
│   ├── vite.config.js
│   └── package.json
│
└── .gitignore
```
---

## 🧠 System Architecture (High Level)

```
Frontend (React)
   |
   v
Backend API (Express)
   |
   |-- Redis Cache
   |-- BullMQ Queue
   v
Redis (Queue + Cache)
   |
   v
Worker (Heavy AI Processing)
   |
   v
Gemini / LLM Engine
```

---

## 🔌 API Endpoints

### 📌 Base URL

```
http://127.0.0.1:5000/
```

---

### 🚀 Submit Repository for Analysis

Starts async repo analysis using **Redis + BullMQ**.

**Endpoint**

```
POST /api/analyze/submit
```

**Request Body**

```json
{
  "repoUrl": "https://github.com/kundanchouhan12/cinezenithnew.git",
  "userId": "888"
}
```

**Response**

```json
{
  "status": "queued",
  "message": "Repository analysis started",
  "jobId": 1
}
```

---

### ⏳ Check Analysis Status

```
GET /api/analyze/status/:jobId
```

**Response**

```json
{
  "status": "processing",
  "progress": 10
}
```

**Status Values**

* queued
* processing
* completed
* failed

---

### 📊 Get Analysis Result

```
GET /api/analyze/result/:jobId
```

**Sample Response**

```json
{
  "files": 97,
  "lines": 13982,
  "folders": ["src", "components", "pages"],
  "extensions": {
    ".js": 4,
    ".jsx": 30,
    ".scss": 21
  },
  "aiReport": "As a senior DevOps engineer and software architect..."
}
```

---

## 🔁 End-to-End Request Flow

```
Frontend
   |
   | POST /api/analyze/submit
   v
Backend (Express)
   |
   | 1. Redis cache check
   | 2. Add job to BullMQ queue
   v
Redis (Queue)
   |
   v
Worker
   |
   | Repo scan + LLM analysis
   v
Redis (Result Cache)
   |
   v
GET /api/analyze/result/:jobId
```

---

## 🧪 Failure Handling (Enterprise-Grade)

* Worker crash → Redis retries job
* LLM failure → Job retry / fail state
* Backend restart → Queue remains safe

✅ **Fault-tolerant by design**

---

## 🐳 Run Project Locally

```bash
docker compose up --build
```

**Access URLs**

* Frontend → [http://localhost:3000](http://localhost:3000)
* Backend → [http://localhost:5000](http://localhost:5000)
* Redis → `6379`

---

## 💡 Why This Project Stands Out

✔ Real async architecture
✔ Redis used **properly**, not just installed
✔ LLM + DevOps fusion
✔ Scales to enterprise workloads
✔ Perfect for **SDE / DevOps / Platform Engineer** interviews

---

🔥 Built with **production mindset**, not tutorial vibes.
