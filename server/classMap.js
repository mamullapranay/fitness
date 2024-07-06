const GymClass = require('./gymClass');

const classMap = new Map();
let timePlus30 = new Date();
timePlus30.setMinutes(timePlus30.getMinutes() + 30);

classMap.set("yoga", new GymClass("yoga", new Date('2025-09-10'), 5));
classMap.set("gym", new GymClass("gym", timePlus30, 5));
classMap.set("dance", new GymClass("dance", new Date('1999-09-10'), 5));

module.exports = classMap;
