const Constants = require('./utils/constants');

// comparator function to be used for
// numerical array sorting
const sortNumber = (a, b) => {
    return a - b;
}
/**
 * 
 * @param {string} expression expression for the cron for a particular field
 * @param {number} minValue minimum value for that field
 * @param {number} maxValue maximum value for that field
 * @returns array of possible values for that field
 */
const getValues = (expression, minValue, maxValue) => {
    let values = [];
    // different ranges will be separated by comma. So,
    // splitting the expression to get different ranges
    let initialRanges = expression.split(",");
    for (range of initialRanges) {
        // range is just an integer
        if (!isNaN(range)) {
            let value = parseInt(range);
            if (value >= minValue && value <= maxValue) {
                values.push(value);
            } else {
                throw new Error("Value not in range");
            }
        // if the value is a range like a-b
        } else if (range.includes('-')) {
            let rangeValues = range.split('-');
            if (rangeValues.length != 2
                || isNaN(rangeValues[0])
                || isNaN(rangeValues[1])) {
                throw new Error("Invalid range");
            }

            let min = parseInt(rangeValues[0]);
            let max = parseInt(rangeValues[1]);
            if (min > max || min < minValue || max > maxValue) {
                throw new Error("Invalid range");
            }

            // push all the values in the range
            for (let i = min; i <= max; i++) {
                values.push(i);
            }
        } else if (range.includes('/')) {
            let rangeValues = range.split('/');
            if (rangeValues.length != 2 || rangeValues[0] != '*' || isNaN(rangeValues[1])) {
                throw new Error("Invalid Step Expression");
            }

            // get the integer value in */num
            let max = parseInt(rangeValues[1]);

            // find all the values which are valid and push
            // in to values array
            for (let i = minValue; i <= maxValue; i++) {
                if (i % max == 0) {
                    values.push(i);
                }
            }
        } else if (range == '*') {
            for (let i = minValue; i <= maxValue; i++) {
                values.push(i);
            }
        } else {
            throw new Error("Invalid input");
        }
    }

    // remove duplicates and sort the array
    if (values.length > 1) {
        values = [...new Set(values)];
        values.sort(sortNumber);

    }
    return values;
}

let arguments = process.argv;
if (arguments.length < 3) {
    console.log("Missing Cron String");
    process.exit(0);
}

// Split the cron string to array (for different
// fields) so as to parse each field separately
let cronExpression = arguments[2].trim().split(/\s+/);

if (cronExpression.length != 6) {
    console.log("Invalid Inputs");
    console.log("Input Format: <minute> <hour> <dayOfMonth> <month> <dayOfWeek> <command>");
    process.exit(0);
}

let cronFieldValues = {};
cronFieldValues.command = cronExpression[5];
try {
    cronFieldValues.minute = getValues(cronExpression[0],
        Constants.MINUTE.minValue, Constants.MINUTE.maxValue);
} catch(error) {
    console.log('minute: ' + error.message);
}

try {
    cronFieldValues.hour = getValues(cronExpression[1],
        Constants.HOUR.minValue, Constants.HOUR.maxValue);
} catch(error) {
    console.log('hour: ' + error.message);
}

try {
    cronFieldValues.dayOfMonth = getValues(cronExpression[2],
        Constants.DAY_OF_MONTH.minValue, Constants.DAY_OF_MONTH.maxValue);
} catch(error) {
    console.log('dayOfMonth: ' + error.message);
}

try {
    cronFieldValues.month = getValues(cronExpression[3],
        Constants.MONTH.minValue, Constants.MONTH.maxValue);
} catch(error) {
    console.log('month: ' + error.message);
}

try {
    cronFieldValues.dayOfWeek = getValues(cronExpression[4],
        Constants.DAY_OF_WEEK.minValue, Constants.DAY_OF_WEEK.maxValue);
} catch(error) {
    console.log('dayOfWeek: ' + error.message);
}

if (Object.keys(cronFieldValues).length == 6) {
    console.log('minute'.padEnd(Constants.FIELD_PADDING),cronFieldValues.minute.join(' '));
    console.log('hour'.padEnd(Constants.FIELD_PADDING), cronFieldValues.hour.join(' '));
    console.log('day of month'.padEnd(Constants.FIELD_PADDING), cronFieldValues.dayOfMonth.join(' '));
    console.log('month'.padEnd(Constants.FIELD_PADDING), cronFieldValues.month.join(' '));
    console.log('day of week'.padEnd(Constants.FIELD_PADDING), cronFieldValues.dayOfWeek.join(' '));
    console.log('command'.padEnd(Constants.FIELD_PADDING), cronFieldValues.command);
}
