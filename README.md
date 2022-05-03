# cron-expression-parser
# Description
This code helps is parsing the cron expression in the below format as a command line argument
```
"<minute> <hour> <day of month> <month> <day of week> <command>"
```
This parser evaluates only the standard formats as described at https://crontab.guru

Some example valid strings
```
* * * * * //  every minute
*/2 * * * * // every two minutes
0 * * * * // every hour
0 0 * * * // every day
0 0 * * 0 // every week
0 9-17 * * * // every hour from 9 through 17
0 0 * * 6,0 // every Saturday and Sunday
```

## pre-requisites
- Install Git
- Install NodeJS 16

## Steps to run
- clone the repository on the machine
- cd to the repository
- Run the command "node index.js <Input>" on the terminal

### Known Issues:
  - Doesnt handle cron expression for a field of the format (num-num)/num
  - The code assumes that the inputs are integers wherever the numbers are expected. So, additional validations needs to be added, if required
