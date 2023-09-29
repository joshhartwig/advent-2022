const fs = require('fs')
const result = fs.readFileSync('data.txt','utf8').split('\n')

interface instruction   {
  count: number,
  to: number,
  from: number,
}

// takes in a string and returns an instruction set
const parseInstruction = (str: string) : { count: number, to: number, from: number } => {
  let c = 0
  let t = 0
  let f = 0

  if(str.length > 18) { // there is a larger number in the count
    let temp = str.substring(5,7)
    c = parseInt(temp)
    t = parseInt(str[18])
    f = parseInt(str[13])
  } else {
    c = parseInt(str[5])
    t = parseInt(str[17])
    f = parseInt(str[12])
  }
  
  return {
    count: c,
    to: t,
    from: f,
  }
}

const executeInstructionPartOne = (arr: string[][], ins: { count: number, to: number, from: number }) : void => {
  const arrayTo = arr[ins.to - 1]
  const arrayFrom = arr[ins.from - 1]
  let count = ins.count

  // go in reverse from on array for count
  for(let i = count; i > 0; i--) {
    let x = arrayFrom[arrayFrom.length - 1]
    arrayTo.push(x)
    arrayFrom.splice(arrayFrom.length - 1, 1)
  }
}

const executeInstructionPartTwo = (arr: string[][], ins: { count: number, to: number, from: number}) : void => {
  const arrayTo = arr[ins.to - 1]
  const arrayFrom = arr[ins.from - 1]
  
  let count = ins.count

  let removedElements = arrayFrom.splice(-count)
  arrayTo.push(...removedElements)
}

// search for the column guide 
const findColumnGuide = (strs: string[]) : number => {
  let count = 0
  for(let i = 0; i < strs.length; i++) {
    if(strs[i].includes('1')) {
      return i
    }
  }
  return 0
}

// return the last number it finds in the guide line (ex.. 9 is the amount of arrays we need)
const findLastNumberInLine = (str: string): number => {
  let count: number = 0
  for(let i = 0; i < str.length; i++) {
    if(parseInt(str[i])) {
      count = parseInt(str[i])
    }
  }
  return count
}

// creates a two dimension array from parsing the instructions at the top of the guide
const generateArraysFromGuide = (strs: string, startingRow: number, cols: number) : string[][] => {
  const arrays: string[][] = []
  let temp: string[] = []

  //loop through lengthwise starting at the bottom row
  for(let i = 1; i <= strs[startingRow].length; i += 4) {
    //reverse loop from starting row to 0 adding each element to an array if an element exists
    for(let j = startingRow - 1; j >= 0; j--) {
      if(strs[j][i] != " ") {
        temp.push(strs[j][i])
      }
    }
    arrays.push(temp)
    temp = []
  }
  return arrays
}

let r = findColumnGuide(result) // find the column guide
let instructionStart = r + 2; // the start of our instructions
let s = findLastNumberInLine(result[r]) // find the amount of the columns needed
let arrays = generateArraysFromGuide(result,r,s)  // generate arrays from our guide 


//loop through the instructions and process them
for(let i = instructionStart; i < result.length; i++) {
  let ins = parseInstruction(result[i])
  executeInstructionPartOne(arrays, ins)
}


let answer1 = ""
arrays.forEach( arr => {
  answer1 += arr[arr.length - 1]
})
console.log(`The answer for part one: ${answer1}`)

//loop through the instructions and process them
for(let i = instructionStart; i < result.length; i++) {
  let ins = parseInstruction(result[i])
  executeInstructionPartTwo(arrays, ins)
}


let answer2 = ""
arrays.forEach( arr => {
  answer2 += arr[arr.length - 1]
})
console.log(`The answer for part two: ${answer2}`)