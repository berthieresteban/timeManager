exports.getClocksById = async function (req, res, next) {
    const userID = req.params.userID;

    if (!userID) {
        return res.status(400).json({ status: 400, message: 'Missing parameter userID.' });
    }

    try {
        return res.status(200).json({ status: 200,  message: "Succesfully GET clock" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.postClockById = async function (req, res, next) {
    const userID = req.params.userID;

    if (!userID) {
        return res.status(400).json({ status: 400, message: 'Missing parameter userID.' });
    }

    try {
        return res.status(200).json({ status: 200,  message: "Succesfully POST clock" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
