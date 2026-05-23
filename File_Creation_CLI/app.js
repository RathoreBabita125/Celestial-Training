import readline from 'readline'
import fs from 'fs'
import path from 'path'

const rl=readline.createInterface({
    input:process.stdin,
    output:process.stdout
})

rl.question('Enter your file name: ',(fileName)=>{
    const filePath=`./files/${fileName}.txt`
    rl.question("Enter the content of file: ", (content)=>{
        fs.writeFile(filePath, content, (error)=>{
            if(!error){
                console.log('The file is successfully created');
                rl.close()
            }
            else{
                console.error('Something went wrong! ', error.message)
            }
        })
    })
})




