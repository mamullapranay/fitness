const express = require('express');
const router = express.Router();
const classMap = require('../classMap');

router.post('/cancel', (req, res) => {
    const { classType, name } = req.query;

    if (!classMap.has(classType)) {
        return res.status(400).json({ messageTxt: "This class type does not exist" });
    }

    const timeAfter30 = new Date();
    timeAfter30.setMinutes(timeAfter30.getMinutes() + 30);
    if (timeAfter30 > classMap.get(classType).startTime) {
        return res.status(400).json({ messageTxt: "Sorry you can only cancel a class up to 30 min before the class starts" });
    }

    const cancellation = classMap.get(classType).cancelUser(name);
    if (cancellation) {
        return res.status(200).json({ messageTxt: "Successfully cancelled" });
    } else {
        return res.status(400).json({ messageTxt: "User is not booked in this class" });
    }
});

module.exports = router;
