// ingest the layout of the crates from data.txt
//ingest the crate layout into a array of arrays with each element being represented
/*
    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
*/

const fs = require('fs')
const result = fs.readFileSync('data.txt','utf8').split('\n')

//find the line that contains a 1
//starting from one count upwards for every number ever 3 spaces until end
// 9 is the highest number create 9 arrays
// starting from 1st string
// start one space c then 3 nothing then 3 nothing keep 

// finds the starting row for the column count
const findColumnGuide = (strs: string[]) : number => {
  let count = 0
  for(let i = 0; i < strs.length; i++) {
    if(strs[i].includes('1')) {
      return i
    }
  }
  return 0
}

// will return the last number it finds in the line
const findLastNumberInLine = (str: string): number => {
  let count: number = 0
  for(let i = 0; i < str.length; i++) {
    if(parseInt(str[i])) {
      count = parseInt(str[i])
    }
  }
  return count
}

const generateArraysFromGuide = (strs: string[], rowEnd: number, cols: number) : string[][] => {
  const temp: string[][] = []

  // loop through all strings
  for(let i = 0; i < rowEnd; i++) {
    let counter = 1
    let str: string[] = []

    // loop through each individual char in string
    for(let c = 0; c < strs[i].length; c++) {
      
      // if the counter gets larger then the string reset
      if(counter >= strs[i].length) {
        counter = 1
      }

      // if this char is not an empty string, append it to str and add 4 to counter
      if(strs[i][counter] != "") {
        str.push(strs[i][counter])
        counter += 4
      }
    }
    temp.push(str)
  }
  return temp
} 

const generateArraysFromGuideV2 = (strs: string, startingRow: number, cols: number) : string[][] => {
  const arrays: string[][] = []
  let temp: string[] = []

  //loop through lengthwise starting at the bottom row
  for(let i = 1; i <= strs[startingRow].length; i += 4) {
    //reverse loop from starting row to 0 adding each element to an array if an element exists
    for(let j = startingRow; j > 0; j--) {
      temp.push(strs[j][i])
    }
    arrays.push(temp)
    temp = []
  }
  console.log(arrays)
  return arrays
}

let r = findColumnGuide(result)
let s = findLastNumberInLine(result[r])


generateArraysFromGuideV2(result,r,s)