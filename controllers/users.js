exports.getUsers = async function (req, res, next) {
    const username = req.param('username');
    const email = req.param('email');

    if (!email || !username) {
        return res.status(400).json({ status: 400, message: 'Missing parameter email or username.' });
    }

    try {
        return res.status(200).json({ status: 200,  message: "Succesfully GET user" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.getUsersById = async function (req, res, next) {
    const userID = req.params.userID;

    if (!userID) {
        return res.status(400).json({ status: 400, message: 'Missing parameter userID.' });
    }

    try {
        return res.status(200).json({ status: 200,  message: "Succesfully GET user" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.postUsers = async function (req, res, next) {
    try {
        return res.status(200).json({ status: 200,  message: "Succesfully POST user" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.putUsersById = async function (req, res, next) {
    const userID = req.params.userID;

    if (!userID) {
        return res.status(400).json({ status: 400, message: 'Missing parameter userID.' });
    }

    try {
        return res.status(200).json({ status: 200,  message: "Succesfully PUT user" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.deleteUsersById = async function (req, res, next) {
    const userID = req.params.userID;

    if (!userID) {
        return res.status(400).json({ status: 400, message: 'Missing parameter userID.' });
    }

    try {
        return res.status(200).json({ status: 200,  message: "Succesfully DELETE user" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}