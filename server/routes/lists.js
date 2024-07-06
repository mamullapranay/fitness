const express = require('express');
const router = express.Router();
const classMap = require('../classMap'); // Import the class map

router.get('/getLists', (req, res) => {
    const { classType } = req.query;

    if (!classMap.has(classType)) {
        return res.status(400).json({ messageTxt: "This class type does not exist" });
    }

    const gymClass = classMap.get(classType);
    const classState = gymClass.getClassState();
    return res.status(200).json(classState);
});

module.exports = router;
