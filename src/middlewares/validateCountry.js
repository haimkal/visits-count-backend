function validateCountry(req, res, next) {
  const { country } = req.body || {};
  if (!country || typeof country !== 'string' || !/^[A-Za-z]{2}$/.test(country)) {
    return res
      .status(400)
      .json({ error: 'BadRequest', message: 'Please enter a country code with 2 letters' });
  }
  next();
}

module.exports = { validateCountry };
