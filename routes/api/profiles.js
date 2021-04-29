'use strict';

const express = require('express');
const HttpStatus = require('http-status-codes');

const interceptors = require('../interceptors');
const models = require('../../models');

const router = express.Router();

router.get('/', async function(req, res) { // if it matches
    const rows = await models.Profile.findAll(); // "s" at the end or no?
    res.json(rows);
});

router.post('/', interceptors.requireLogin, async function (req, res){
    // build a new profile rows in memory from the form data in the body of the request
    const rows = models.Profile.build(req.body);
    try {
        // wait for the database to save the new row
        await rows.save();
        // if successful, return 201 status (CREATED), amd the JSON data of the row
        res.status(201).json(rows);
    } catch (error) {
        // if the database returns an error, print it to the consol
        // console.log(error);
        // send back the UNPROCESSABLE ENTITY error code and the error message
        res.status(422).json(error);
    }
});

router.get('/:id', async function(req, res) {
  const rows = await models.Profile.findByPk(req.params.id);
  if (rows) {
    res.json(rows);
  } else {
    res.status(HttpStatus.NOT_FOUND).end();
  }
});

router.patch('/:id', interceptors.requireLogin, async function(req, res) {
  const rows = await models.Profile.findByPk(req.params.id);
  if (rows) {
    try {
      await rows.update(req.body);
      res.status(HttpStatus.OK).end();  
    } catch (error) {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).json(error);
    }
  } else {
    res.status(HttpStatus.NOT_FOUND).end();
  }
})

router.delete('/:id', interceptors.requireLogin, async function(req, res) {
  const rows = await models.Profile.findByPk(req.params.id);
  if (rows) {
    await rows.destroy();
    res.status(HttpStatus.OK).end();
  } else {
    res.status(HttpStatus.NOT_FOUND).end();
  }
});

module.exports = router;