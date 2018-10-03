'use strict';

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: {type: String, required:true, unique:true},
  password: { type: String, required: true },
});

userSchema.pre('save', function (next) {
  console.log('save prehook');
  bcrypt.hash(this.password, 5)
    .then(hashed => {
      this.password = hashed;

      next();
    })
    .catch(err => { throw err; });
});

userSchema.methods.generateToken = function (){
  return jwt.sign({id:this._id}, process.env.APP_SECRET || 'secret');
};

userSchema.statics.authenticate = function(auth) {
  return this.findOne({username: auth.username})
    .then(user => user && user.comparePassword(auth.password))
    .catch(err => err);
};

userSchema.methods.comparePassword = function(password){
  return bcrypt.compare(password, this.password)
    .then(valid => valid ? this : null);
};

export default mongoose.model('users', userSchema);