import readline from 'readline';
import fs, { mkdir } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filepath = join(__dirname, 'file', 'todo_data.txt');
// console.log(filepath);


let todo_Task = [];

const showTaskStatus = () => {
    console.log(chalk.bgYellow.black(`\nOption: 1. Add Your Task`));
    console.log(chalk.bgYellow.black(`Option: 2. Delete Your Task`));
    console.log(chalk.bgYellow.black(`Option: 3. Review Your Task`));
    console.log(chalk.bgYellow.black(`Option: 4. Exit Here ...`));

    rl.question((chalk.bgBlue.white.bold("\nChoose an Option: ")), handleOption);
}

const handleOption = (option) => {
    if (option === '1') {
        rl.question((chalk.bgBlue.white.bold("\nEnter Your Task You Want: ")), (task) => {
            todo_Task.push(task);
            fs.writeFileSync(filepath, `${todo_Task.map((currTask, index) => {
                return `\n${index + 1}. ${currTask}`
            })}`)
            console.log('\nTask has been added: ', task);
            showTaskStatus()
        })
    }

    else if (option === '2') {
        rl.question("\nEnter the number of task which you want to be deleted: ", (taskNumber)=>{
            const updatedTask=todo_Task.filter((currTask, index)=>{
                return (index+1)!=taskNumber;
            })
            todo_Task=updatedTask
            fs.writeFileSync(filepath, `${todo_Task.map((currTask, index) => {
                return `\n${index + 1}. ${currTask}`
            })}`)
            console.log('\nTask has been deleted:');
            showTaskStatus()

        })
    }

    else if (option === '3') {
        console.log((chalk.bgGreen.white('\n Here are all task: ')));
        todo_Task.forEach((currTask, index) => {
            console.log(`${index + 1}. ${currTask}`);
        })
        showTaskStatus();
    }
    else if (option === '3') {
        console.log('Good Bye! Have a nice day!...');
        rl.close();
    }
    else {
        console.log('You have chosen incorrect option. Try again...');
        showTaskStatus();
    }
}

showTaskStatus();
