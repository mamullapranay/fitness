class GymClass {
    constructor(classType, time, maxCapacity) {
        this.classType = classType;
        this.userList = new Set();
        this.waitingList = new Set();
        this.startTime = time;
        this.maxCapacity = maxCapacity;
    }

    bookUser(name) {
        if (this.userList.has(name)) {
            return {
                statusCode: 400,
                messageTxt: "You are already booked"
            };
        } else if (this.waitingList.has(name)) {
            return {
                statusCode: 400,
                messageTxt: "You are waitlisted already"
            };
        } else if (this.userList.size < this.maxCapacity) {
            this.userList.add(name);
            return {
                statusCode: 200,
                messageTxt: "You have been booked"
            };
        } else {
            this.waitingList.add(name);
            return {
                statusCode: 200,
                messageTxt: "You have been waitlisted"
            };
        }
    }

    cancelUser(name) {
        if (this.userList.has(name)) {
            this.userList.delete(name);
            if (this.userList.size < this.maxCapacity && this.waitingList.size > 0) {
                let [waitingUser] = this.waitingList;
                this.waitingList.delete(waitingUser);
                this.userList.add(waitingUser);
            }
            return true;
        } else {
            return false;
        }
    }

    getClassState() {
        return {
            booked: Array.from(this.userList),
            waiting: Array.from(this.waitingList),
            capacity: this.maxCapacity,
            availableSlots: this.maxCapacity - this.userList.size
        };
    }
}

module.exports = GymClass;
