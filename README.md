# cron-expression-parser
# Description
This code helps is parsing the cron expression in the below format as a command line argument
```
"<minute> <hour> <day of month> <month> <day of week> <command>"
```

## pre-requisites
- Install Git
- Install NodeJS 16

## Steps to run
- clone the repository on the machine
- cd to the repository
- Run the command "node index.js <Input>" on the terminal

### TODO:
  - Handling JAN-DEC and SUN-SAT for month and day of week
  - The code assumes that the inputs are integers wherever the numbers are expected. So, additional validations needs to be added, if required
