function createEmployeeRecord(array) {
  const newEmployeeRecord = {
    'firstName': array[0],
    'familyName': array[1],
    'title': array[2],
    'payPerHour': array[3],
    'timeInEvents': [],
    'timeOutEvents': []
  }
  return newEmployeeRecord;
};

function createEmployeeRecords(nestedArray) {
  return nestedArray.map(createEmployeeRecord);
}

function createTimeInEvent(employeeRecord, timeIn){
  const timeInObject = parseTime(timeIn, 'TimeIn');
  employeeRecord.timeInEvents.push(timeInObject);
  return employeeRecord;
}

function createTimeOutEvent(employeeRecord, timeOut){
  const timeOutObject = parseTime(timeOut, 'TimeOut');
  employeeRecord.timeOutEvents.push(timeOutObject);
  return employeeRecord;
}

function parseTime(timeString, eventType) {
  const date = timeString.split(' ')[0];
  const hour = parseInt(timeString.split(' ')[1], 10);
  const parsedTime = {
    'type': eventType,
    'year': parseInt(date.split('-')[0]),
    'month': parseInt(date.split('-')[1]),
    'day': parseInt(date.split('-')[2]),
    'hour': hour,
    'date': date,
    'sort': timeString
  }
  return parsedTime
}

function hoursWorkedOnDate(employeeRecord, date) {
  const inEvents = employeeRecord.timeInEvents;
  const outEvents = employeeRecord.timeOutEvents;
  const inRecord = findDate(inEvents, date);
  const outRecord = findDate(outEvents, date);
  if (inRecord || outRecord === null) return 0;
  return (outEvents[outRecord].hour - inEvents[inRecord].hour) / 100;
}

function findDate(timeEvents, date) {
  for (let i = 0; i < timeEvents.length; i++) {
    if (timeEvents[i].date === date) return i;
  }
  return null;
}

function wagesEarnedOnDate(employeeRecord, date) {
  return employeeRecord.payPerHour * hoursWorkedOnDate(employeeRecord, date);
}

function allWagesFor(employeeRecord) {
  let wageTotal = 0;
  for (let i = 0; i < employeeRecord.timeInEvents.length; i++) {
    wageTotal = wageTotal + ((employeeRecord.timeOutEvents[i].hour - employeeRecord.timeInEvents[i].hour) / 100)
  }
  return wageTotal * employeeRecord.payPerHour;
}

function calculatePayroll(employeeArray) {
  let payrollTotal = 0;
  for (let i = 0; i < employeeArray.length; i++) {
    payrollTotal = payrollTotal + allWagesFor(employeeArray[i]);
  }
  return payrollTotal;
}
