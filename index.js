// Your code here

const createEmployeeRecord = info => {
    const record = {
        firstName: info[0],
        familyName: info[1],
        title: info[2],
        payPerHour: info[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return record;
};

const createEmployeeRecords = array => array.map( employee => createEmployeeRecord(employee))

const createTimeInEvent = (employee, dateStamp) => {
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(dateStamp.split(' ')[1]),
        date: dateStamp.split(' ')[0]
        });
    return employee
};

const createTimeOutEvent = (employee, dateStamp) => {
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(dateStamp.split(' ')[1]),
        date: dateStamp.split(' ')[0]
        });
    return employee
};

const hoursWorkedOnDate = (employee, date) => {
    let timeIn = employee.timeInEvents.find( e => e.date === date)
    let timeOut = employee.timeOutEvents.find( e => e.date === date)
    let hours = parseInt(timeOut.hour - timeIn.hour)/100
    return hours
}

const wagesEarnedOnDate = (employee, date) => {
    return parseInt(hoursWorkedOnDate(employee, date) * employee.payPerHour);
};

const allWagesFor = employee => {
    const dates = employee.timeInEvents.map(e => e.date);
    return dates.reduce( (acc, i) => {
        acc += wagesEarnedOnDate(employee, i);
        return acc;
    }, 0);
};

const findEmployeeByFirstName = (array, firstName) => {
    return array.find(e => e.firstName === firstName)
}

const calculatePayroll = (array) => {
    const wages = array.map(e => allWagesFor(e))
    return wages.reduce( (acc, i) => {
        acc += i;
        return acc;
    }, 0)
}
