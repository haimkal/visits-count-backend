# 🌍 Visits Count API (Node.js + Redis)

A lightweight REST API for tracking visits per country.  
Built with **Express**, **Redis**, and tested using **Vitest + Supertest**.

---

## 📡 Endpoints

| Method | Path      | Description                                    |
| ------ | --------- | ---------------------------------------------- |
| `GET`  | `/health` | Returns `{ "ok": true }`                       |
| `POST` | `/visits` | Increments the visit count for a given country |
| `GET`  | `/visits` | Returns visit counts for all countries         |

### Example Request

```bash
curl -X POST http://localhost:4000/visits   -H "Content-Type: application/json"   -d '{"country":"us"}'
```

### Example Response

```json
{ "country": "us", "count": 42 }
```

---

## 🐳 Run with Docker Compose

This spins up both **Redis** and the **API**:

```bash
docker compose up --build -d
```

**Services:**

- API: [http://localhost:4000](http://localhost:4000)
- Redis: `localhost:6380`

Test health:

```bash
curl http://localhost:4000/health
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

Integration tests using **Vitest + Supertest**:

```bash
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
