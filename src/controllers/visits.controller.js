const { incrementCountry, getAllStats } = require('../services/visits.service');

class VisitsController {
  static async postVisit(req, res) {
    try {
      const out = await incrementCountry(req.body.country);
      res.json(out);
    } catch (e) {
      console.error('Redis increment failed:', e);
      res.status(503).json({ error: 'StorageUnavailable', message: 'Redis error' });
    }
  }

  static async getVisits(_req, res) {
    try {
      const data = await getAllStats();
      res.json(data);
    } catch (e) {
      console.error('Redis read failed:', e);
      res.status(503).json({ error: 'StorageUnavailable', message: 'Redis error' });
    }
  }
}

module.exports = VisitsController;
