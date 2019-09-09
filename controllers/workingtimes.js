exports.getWorkingTimesByUserID = async function (req, res, next) {
    const start = req.param('start');
    const end = req.param('end');
    const userID = req.params.userID;

    if (!start || !end || !userID) {
        return res.status(400).json({ status: 400, message: 'Missing parameter email or username or userID.' });
    }

    try {
        return res.status(200).json({ status: 200,  message: "Succesfully GET workingtime" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.getWorkingTimesByIDS = async function (req, res, next) {
    const userID = req.params.userID;
    const workingtimeID = req.params.workingtimeID;
    if (!workingtimeID || !userID) {
        return res.status(400).json({ status: 400, message: 'Missing parameter workingtimeID or userID.' });
    }

    try {
        return res.status(200).json({ status: 200,  message: "Succesfully GET workingtime" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.postWorkingTimesByUserID = async function (req, res, next) {
    const userID = req.params.userID;

    if (!userID) {
        return res.status(400).json({ status: 400, message: 'Missing parameter userID.' });
    }

    try {
        return res.status(200).json({ status: 200,  message: "Succesfully POST workingtime" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.putWorkingTimesById = async function (req, res, next) {
    const id = req.params.id;
    
    if (!id) {
        return res.status(400).json({ status: 400, message: 'Missing parameter id.' });
    }

    try {
        return res.status(200).json({ status: 200,  message: "Succesfully PUT workingtime" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.deleteWorkingTimesById = async function (req, res, next) {
    const id = req.params.id;

    if (!id) {
        return res.status(400).json({ status: 400, message: 'Missing parameter id.' });
    }

    try {
        return res.status(200).json({ status: 200,  message: "Succesfully DELETE workingtime" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}