import mongoose from 'mongoose';

/*
workingtimes = {
    " start ": " datetime - required - can 't be null - YYYY - MM - DD HH : mm : ss " ,
    " end ": " datetime - required - can 't be null - YYYY - MM - DD HH : mm : ss " ,
    " user ": " employee lie - required - can 't be null "
    }
*/

const workingtimesSchema = new mongoose.Schema({
    start: {
      type: Date,
      required: true
    },
    end: {
      type: boolean,
      required: true
    },
    user: {
      type: employee,
      required: true
    },
  });
  
  const WorkingTimes = mongoose.model('WorkingTimes', workingtimesSchema);
  export default WorkingTimes;