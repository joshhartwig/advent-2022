// read in sample.txt and print out the contents
const fs = require('fs');
const { type } = require('os');
const data = fs.readFileSync('sample.txt').toString().split('\n')

const fileSystem = {
    contents: [],
    _currentWorkingDirectory: null,
    _prevWorkingDirectory: null,
  
    get currentWorkingDirectory() {
      return this._currentWorkingDirectory || this.contents;
    },
  
    set currentWorkingDirectory(val) {
      console.log(`setting currentworking directory from ${JSON.stringify(this._currentWorkingDirectory,filterCircular,2)} to 
        ${JSON.stringify(val,filterCircular,2)}`)
      this._currentWorkingDirectory = val;
    },
  
    get prevWorkingDirectory() {
      return this._prevWorkingDirectory || this.contents;
    },
  
    set prevWorkingDirectory(val) {
      this._prevWorkingDirectory = val;
    },

    get root() {
        return this.contents
    },

    add: function (val) {
        console.log(`attempting to add ${JSON.stringify(val,filterCircular,2)} to ${JSON.stringify(this.currentWorkingDirectory,filterCircular,2)}`)
        this.currentWorkingDirectory.push(val)
    }
  };

const filterCircular = (k,v) => {
    if(k === 'parent') return 'circular'
    return v
}

const parseInput = (input) => {

    for(let i = 0; i < input.length; i++) {
        if(input[i][0] === '$') {
            processCommand(input[i])
        }
        else {
            if(input[i].includes('dir'))    // add a directory to current working directory
            {
                let dirname = input[i].substring(3,input[i].length).toString().trim()
                fileSystem.add({
                    name: dirname,
                    contents: [],
                    parent: fileSystem.currentWorkingDirectory
                })
            }
            else {  // add files
                let spaceIdx = input[i].indexOf(' ')
                let size = input[i].substring(0,spaceIdx).toString().trim()
                let filename = input[i].substring(spaceIdx,input[i].length).toString().trim()
                fileSystem.add({
                    name: filename,
                    size: size,
                })
            }
        }
    }
}

function printFileSystem(fs, indent = '') {
    fs.contents.forEach(item => {
        if (item.hasOwnProperty('contents')) {
            // It's a directory
            console.log(`${indent}- ${item.name} (dir)`);
            printFileSystem(item, indent + '  ');
        } else {
            // It's a file
            console.log(`${indent}- ${item.name} (file, size=${item.size})`);
        }
    });
}

// takes in contents array and returns total size
function calculateDirSize(fs, parent) {
    let size = 0
    fs.contents.forEach(i => {
        if(i.hasOwnProperty('size')) {
            size += parseInt(i.size)
        }
        if(i.hasOwnProperty('contents')) {
            calculateDirSize(i, i.name)
        }
    })
    if(!parent) {
        parent = "root"
    }
    console.log(`${parent} - ${size}`)
}

// if $ls i need to add everything between the commands to the current working directory
const processCommand = (command) => {  
    if(command.includes('cd')) {
        let dir = command.slice(4).trim()
        if(dir === '/') { 
            console.log(`changing cwd: ${JSON.stringify(fileSystem.currentWorkingDirectory,filterCircular,2)} to root`)
            fileSystem.currentWorkingDirectory = fileSystem.root
        }
        else if(dir === '..') {
            let prevOfPrev
            if(!fileSystem.prevWorkingDirectory.prevWorkingDirectory) {
                prevOfPrev = fileSystem.prevWorkingDirectory.prevWorkingDirectory
            }
            fileSystem.currentWorkingDirectory = fileSystem.prevWorkingDirectory
            fileSystem.prevWorkingDirectory = prevOfPrev
        }
        else {
            // try and find the directory listed and change current working directory to it.
            let tmp = fileSystem.currentWorkingDirectory.find(obj => obj.name === dir) 
            if(tmp) {
                fileSystem.currentWorkingDirectory = tmp.contents;
            } else {
                console.log(`${dir} not found`)
            }
        }

    }
}

parseInput(data)
printFileSystem(fileSystem)
calculateDirSize(fileSystem)

