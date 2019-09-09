import mongoose from 'mongoose';
require('mongoose-type-email');

/* 
users = {
    " username ": " string - required - can 't be null " ,
    " email ": " string - required - can 't be null - X@X . X " ,
    }
*/

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
});

const User = mongoose.model('User', userSchema);
export default User;