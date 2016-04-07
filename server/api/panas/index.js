'use strict';

const controller = require('./panas.controller');
const express = require('express');
const router = express.Router();

router.delete('/:id', controller.destroy);
router.get('/', controller.index);
router.get('/:id', controller.show);
router.patch('/:id', controller.update);
router.post('/', controller.create);
router.put('/:id', controller.update);

module.exports = router;
