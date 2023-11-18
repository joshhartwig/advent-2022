// read in sample.txt and print out the contents
const fs = require('fs')
const data = fs.readFileSync('sample.txt').toString().split('\n')


/*
iterate through each line of the file
if $ is found, then process the command
 - if ls then process until next command is hit and add each item that is a a file to the object as a new object
- fs contents can contain other objects. fs.contents.a.contents etc and a files array that contains {name: size:}

*/

const fileSystem = {
    contents: [],
    get root() { 
        return this.contents
    },
    currentWorkingDirectory: null,
    prevWorkingDirectory: this.root
}
const parseInput = (input) => {
    cmdStart = 0
    cmdEnd = 0
    
    for(let i = 0; i < input.length; i++) {
        if(input[i][0] === '$') {
            processCommand(input[i])
        }
        else {
            // add each of the files or folders to the current working directory
        }
        

    }
}

const processCommand = (command) => {  
    if(command.includes('cd')) {
        let dir = command.slice(4).trim()
        if(dir === '/') { 
            fileSystem.currentWorkingDirectory = fileSystem.root
        }
        else if(dir === '..') {
            fileSystem.currentWorkingDirectory = fileSystem.prevWorkingDirectory
        }
        else {
            // try and find the directory listed and change current working directory to it.
            let tmp = fileSystem.currentWorkingDirectory?.contents?.find(obj => obj.name === dir) 
            console.log(`tmp ${tmp} and dir ${dir}`)
        }

    }
}

fileSystem.contents.push({name:'d', contents:[], parent: fileSystem.currentWorkingDirectory})
parseInput(data)

