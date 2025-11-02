const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const cfg = {
  port: Number(process.env.PORT || 4000),
  host: process.env.HOST || '0.0.0.0',
};

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.get('/health', (_req, res) => res.json({ ok: true }));

if (require.main === module) {
  app.listen(cfg.port, cfg.host, () => {
    console.log(`API listening on http://${cfg.host}:${cfg.port}`);
  });
}
module.exports = app;
