# cron-expression-parser
# Description
This code helps is parsing the cron expression in the below format as a command line argument
```
"<minute> <hour> <day of month> <month> <day of week> <command>"
```
This parser evaluates only the standard formats as described at https://crontab.guru

Some example valid strings
```
* * * * * <command> //  every minute
*/2 * * * * <command> // every two minutes
0 * * * * <command> // every hour
0 0 * * * <command> // every day
0 0 * * 0 <command> // every week
0 9-17 * * * <command> // every hour from 9 through 17
0 0 * * 6,0 <command> // every Saturday and Sunday
0 0 5 JAN-MAR * <command> // every 5th of Jan, Feb and March
1-59/2 * * * * <command> // every uneven minute
```

## pre-requisites
- Install Git
- Install NodeJS 16

## Steps to run
- clone the repository on the machine
- cd to the repository
- Run the command "node index.js <Input>" on the terminal
### Known Issues:
  - The code assumes that the inputs are integers wherever the numbers are expected. So, additional validations needs to be added, if required
