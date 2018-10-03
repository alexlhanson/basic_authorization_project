'use strict';

import User from '../auth/user';

let authenticator = (req, res, next) => {

  let _authenticate = (auth) => {

    User.authenticate(auth)
      .then(user => {
        if (!user) {
          throw new Error('401 ERROR: no username found');
        } else {
          req.token = user.generateToken();
          next();
        }

      })
      .catch(next);
  };

  try{
    let auth = {};
    let authHeader = req.headers.authorization;
    let base64Header = authHeader.replace(/Basic\s+/i, '');
    let base64Buffer = Buffer.from(base64Header, 'base64');
    let bufferString = base64Buffer.toString();
    let [username, password] = bufferString.split(':');
    auth = {username, password};

    _authenticate(auth);
  } catch (err){
    next (err);
  }
};

export default authenticator;