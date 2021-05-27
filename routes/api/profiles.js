'use strict';

const express = require('express');
const HttpStatus = require('http-status-codes');

const interceptors = require('../interceptors');
const models = require('../../models');

const router = express.Router();

router.get('/', async function(req, res) {
  const profiles = await models.Profile.findAll({
    order: [['position', 'ASC'], ['name', 'ASC']]
  });
  res.json(profiles);
});

router.post('/', interceptors.requireLogin, async function(req, res) {
  const profile = models.Profile.build(req.body);
  try {
    await profile.save();
    res.status(HttpStatus.CREATED).json(profile);
  } catch (error) {
    res.status(HttpStatus.UNPROCESSABLE_ENTITY).json(error);
  }
});

router.get('/:id', async function(req, res) {
  const profile = await models.Profile.findByPk(req.params.id);
  if (profile) {
    res.json(profile);
  } else {
    res.status(HttpStatus.NOT_FOUND).end();
  }
});

router.patch('/:id', interceptors.requireLogin, async function(req, res) {
  const profile = await models.Profile.findByPk(req.params.id);
  if (profile) {
    try {
      await profile.update(req.body);
      res.status(HttpStatus.OK).end();  
    } catch (error) {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).json(error);
    }
  } else {
    res.status(HttpStatus.NOT_FOUND).end();
  }
})

router.delete('/:id', interceptors.requireLogin, async function(req, res) {
  const profile = await models.Profile.findByPk(req.params.id);
  if (profile) {
    await profile.destroy();
    res.status(HttpStatus.OK).end();
  } else {
    res.status(HttpStatus.NOT_FOUND).end();
  }
});

module.exports = router;