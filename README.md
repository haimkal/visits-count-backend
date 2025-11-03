# 🌍 Visits Count API (Node.js + Redis)

A lightweight REST API for tracking visits per country.  
Built with **Express**, **Redis**, and tested using **Vitest + Supertest**.

---

## 🐳 Run with Docker Compose

This spins up both **Redis** and the **API**

### 1. Clone the repo

```bash
git clone https://github.com/haimkal/visits-count-backend.git
```

### 2. Enter repo

```bash
cd visits-count-backend
```

### 3. Run with Docker

```bash
docker compose up --build -d
```

---

**Services:**

- API: [http://localhost:4000](http://localhost:4000)
- Redis (from host): `localhost:6380`
  _Note: Inside the container Redis listens on 6379, but it’s mapped to 6380 on the host._

---

## 📡 Endpoints

| Method | Path      | Description                                    |
| ------ | --------- | ---------------------------------------------- |
| `GET`  | `/health` | Returns `{ "ok": true }`                       |
| `POST` | `/visits` | Increments the visit count for a given country |
| `GET`  | `/visits` | Returns visit counts for all countries         |

### Example Request: POST /visits

```bash
curl -X POST http://localhost:4000/visits   -H "Content-Type: application/json"   -d '{"country":"us"}'
```

### Example Response: POST /visits

```json
{ "country": "us", "count": 42 }
```

### Example Request: GET /visits

```bash
# Get all counts
curl http://localhost:4000/visits
```

### Example Response: GET /visits

```json
{ "us": 2, "cy": 1 }
```

---

## 🧑‍💻 Local Development

### Requirements

- Node.js **v18+** (recommended v20)
- Redis running locally (`redis://localhost:6380`)

### Install dependencies

```bash
npm install
```

### Example `.env` file

```env
PORT=4000
HOST=0.0.0.0
REDIS_URL=redis://localhost:6380
REDIS_KEY=visits_by_country
CORS_ORIGIN=*
```

### Run locally

```bash
npm run dev
```

---

## 🧪 Tests

To run the automated integration tests (using **Vitest + Supertest**):

1. Make sure Redis is running (e.g., via `docker compose up -d redis`)
2. Then run:

```bash
   npm ci
   npm test
```

> Tests run against a real Redis instance and use isolated keys.

---

## 🧱 Project Structure

```
src/
  controllers/
    visits.controller.js
  middlewares/
    validateCountry.js
  services/
    visits.service.js
  config/
    redis.js
  routes.js
  server.js
test/
  api.spec.mjs
Dockerfile
docker-compose.yml
.env (local)
```

---

## ⚙️ Environment Variables

| Variable      | Default             | Description             |
| ------------- | ------------------- | ----------------------- |
| `PORT`        | `4000`              | API port                |
| `HOST`        | `0.0.0.0`           | Bind host               |
| `REDIS_URL`   | —                   | Redis connection string |
| `REDIS_KEY`   | `visits_by_country` | Redis hash key          |
| `CORS_ORIGIN` | `*`                 | CORS allowed origin     |

---
