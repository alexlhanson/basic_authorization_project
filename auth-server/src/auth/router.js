'use strict';

import express from 'express';
import authenticator from '../middleware/authenticator';
import User from './user';

const router = express.Router();

router.post('/register', (req, res, next) => {
  console.log(req.body);
  let user = new User(req.body);
  user.save()
    .then(user => res.send(user.generateToken()))
    .catch(next);
});

router.get('/signin', authenticator, (req, res, next) => {
  res.cookie('Token', req.token);
  res.send('login successful');
});

export default router;
