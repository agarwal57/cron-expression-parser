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
        // range is just a number
        if (!isNaN(range)) {
            let value = parseInt(range);
            if (value >= minValue && value <= maxValue) {
                values.push(value);
            } else {
                throw new Error("Value not in range");
            }
        } else if (range == '*') { // the range is *
            for (let i = minValue; i <= maxValue; i++) {
                values.push(i);
            }
        } else if (range.includes('/')) { // possible formats are */num, (num-num)/num
            let rangeValues = range.split('/');
            if (rangeValues.length != 2 || isNaN(rangeValues[1])) {
                throw new Error("Invalid Step Expression");
            }

            let min, max;

            if (rangeValues[0] == '*') {
                min = minValue;
                max = maxValue;
            } else {
                let newRange = rangeValues[0].split('-');
                if (newRange.length != 2 || isNaN(newRange[0]) || isNaN(newRange[1])) {
                    throw new Error("Invalid Step Expression");
                }
                min = parseInt(newRange[0]);
                max = parseInt(newRange[1]);
            }

            // get the integer value in */num
            let step = parseInt(rangeValues[1]);

            // find all the values which are valid
            // and push in to values array
            while (min <= max) {
                values.push(min);
                min = min + step;
            }
        } else if (range.includes('-')) { // i.e., say from 1-5
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

// parse the minute field
try {
    cronFieldValues.minute = getValues(cronExpression[0],
        Constants.MINUTE.minValue, Constants.MINUTE.maxValue);
} catch(error) {
    console.log('minute: ' + error.message);
}

// parse the hour field
try {
    cronFieldValues.hour = getValues(cronExpression[1],
        Constants.HOUR.minValue, Constants.HOUR.maxValue);
} catch(error) {
    console.log('hour: ' + error.message);
}

// parse the day of month field
try {
    cronFieldValues.dayOfMonth = getValues(cronExpression[2],
        Constants.DAY_OF_MONTH.minValue, Constants.DAY_OF_MONTH.maxValue);
} catch(error) {
    console.log('dayOfMonth: ' + error.message);
}

// parse the month field
try {
    // Update the string values JAN-DEC to corresponding integer values i.e., 1-12
    cronExpression[3] = cronExpression[3].replace(/[a-z]{3}/gi, function(match) {
        match = match.toUpperCase();

        if (Constants.MonthAliases[match] === undefined) {
            throw new Error("Invalid Value");
        }

        return Constants.MonthAliases[match];
    });

    cronFieldValues.month = getValues(cronExpression[3],
        Constants.MONTH.minValue, Constants.MONTH.maxValue);
} catch(error) {
    console.log('month: ' + error.message);
}

// parse the day of week field
try {
    // Update the string values SUN-SAT to corresponding integer values i.e., 0-6
    cronExpression[4] = cronExpression[4].replace(/[a-z]{3}/gi, function(match) {
        match = match.toUpperCase();

        if (Constants.DayOfWeekAliases[match] === undefined) {
            throw new Error("Invalid Value");
        }

        return Constants.DayOfWeekAliases[match];
    });

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
