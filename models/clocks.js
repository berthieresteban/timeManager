import mongoose from 'mongoose';

/* 
clocks = {
" time ": " datetime - required - can 't be null " ,
" status ": " boolean - required - true ( when clock 'in ) - can 't be null " ,
" user ": " employee - required - can 't be null "
}
*/

const clockSchema = new mongoose.Schema({
  time: {
    type: Date,
    required: true
  },
  status: {
    type: boolean,
    required: true
  },
  user: {
    type: employee,
    required: true
  },
});

const Clock = mongoose.model('Clock', clockSchema);
export default Clock;