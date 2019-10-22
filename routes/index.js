'use strict';

const router = require('express').Router();

module.exports = passport => {
  router.get('/', (req, res) => {
    res.status(200).send(`
      <!DOCTYPE html>
      <html lang="pl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Fajna aplikacja</title>
      </head>
      <body>
        <h1>siema</h1>
        <img src="/public/molas.png" width="1000" height="500" alt="">
      </body>
      </html>
    `);
  });
  return router;
}
