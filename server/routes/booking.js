const express = require('express');
const router = express.Router();
const classMap = require('../classMap');

router.post('/book', (req, res) => {
    const { classType, name } = req.query;

    if (!classMap.has(classType)) {
        return res.status(400).json({ messageTxt: "This class type does not exist" });
    }

    if (new Date() > classMap.get(classType).startTime) {
        return res.status(400).json({ messageTxt: "Sorry the class has already started" });
    }

    const booking = classMap.get(classType).bookUser(name);
    return res.status(booking.statusCode).json({ messageTxt: booking.messageTxt });
});

module.exports = router;
