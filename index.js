const 
    express = require('express'),
    router = express.Router(),
    app = express(),
    port = 4001;

const 
    clocksController = require('./controllers/clocks'),
    workingtimesController = require('./controllers/workingtimes'),
    usersController = require('./controllers/users');

router
    .get('/api/users/:userID', usersController.getUsersById)
    .get('/api/users', usersController.getUsers)
    .post('/api/users', usersController.postUsers)
    .put('/api/users/:userID', usersController.putUsersById)
    .delete('/api/users/:userID', usersController.deleteUsersById)

    .get('/api/workingtimes/:userID', workingtimesController.getWorkingTimesByUserID)
    .get('/api/workingtimes/:userID/:workingtimeID', workingtimesController.getWorkingTimesByIDS)
    .post('/api/workingtimes/:userID', workingtimesController.postWorkingTimesByUserID)
    .put('/api/workingtimes/:id', workingtimesController.putWorkingTimesById)
    .delete('/api/workingtimes/:id', workingtimesController.deleteWorkingTimesById)

    .get('/api/clocks/:userID', clocksController.getClocksById)
    .post('/api/clocks/:userID', clocksController.postClockById)

app.use( '/', router);
app.listen(port, () => console.log(`Time manager API on port ${port}!`))
