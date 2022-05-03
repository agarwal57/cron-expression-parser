// Data related to the Minute field in Cron expression
exports.MINUTE = {
    minValue: 0,
    maxValue: 59
}

// Data related to the Hour field in Cron expression
exports.HOUR = {
    minValue: 0,
    maxValue: 23
}

// Data related to the Day of Month field in Cron expression
exports.DAY_OF_MONTH = {
    minValue: 1,
    maxValue: 31
}

// Data related to the Month field in Cron expression
exports.MONTH = {
    minValue: 1,
    maxValue: 12
}

// Data related to the Day of Week field in Cron expression
exports.DAY_OF_WEEK = {
    minValue: 0,
    maxValue: 6
}

// Cron expression field padding
exports.FIELD_PADDING = 14;

exports.MonthAliases = {
    JAN: 1,
    FEB: 2,
    MAR: 3,
    APR: 4,
    MAY: 5,
    JUN: 6,
    JUL: 7,
    AUG: 8,
    SEP: 9,
    OCT: 10,
    NOV: 11,
    DEC: 12
}

exports.DayOfWeekAliases = {
    SUN: 0,
    MON: 1,
    TUE: 2,
    WED: 3,
    THU: 4,
    FRI: 5,
    SAT: 6
}