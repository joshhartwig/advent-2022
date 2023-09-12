import { count } from "console"

const fs = require('fs')
const result = fs.readFileSync('data.txt','utf8').split('\n')

// this worked but was dumb
// const findCommonChar = (str1: string, str2: string) : string => {
//   const matches: string[] = []
//   for(let i = 0; i < str1.length; i++) {
//     if(str2.indexOf(str1[i]) !== -1 && matches.indexOf(str1[i]) === -1) {
//       matches.push(str1[i])
//     }
//   }
//   return matches[0] // we know from the test there is only a single char
// }

// takes in a string and returns a tuple with two equal length strings
const splitString = (str: string) : [string,string] => {
  const length = str.length
  let mid = length / 2
  const left = str.slice(0,mid)
  const right = str.slice(mid, length) 
  let splitString: [string, string] = [left,right]
  return splitString
}

// checks the char against a map of k:v pairs ex a = 1, b = 2 etc..
const assignValToChar = (str : string) : number => {
  let map = new Map<string,number>([])  // create a map to store the char and num value
  // lower case
  let count = 1
  for(let i = 97; i < 123; i++) {
    let char = String.fromCharCode(i)
    map.set(char,count)
    count++
  }

  for(let i = 65; i < 91; i++) {
    let char = String.fromCharCode(i)
    map.set(char,count)
    count++
  }
  
  return map.get(str) as number
}

const splitStringsGroups = (strs: string[], splitSize: number) : string[][] => {
  let container: string[][] = [] // create  a temp to hold our array of arrays
  let temp: string[] = []
  let count = 0
  strs.forEach((s: string) => {
    temp.push(s)
    count++
    if(count === splitSize) {
      count = 0
      container.push(temp)
      temp = [] // clear array
    }
    
  })
  return container
}
 
// rewrote function to optional for part two
const findCommonChars = (s1: string, s2: string, s3?: string) : string => {
  const set1 = new Set(s1)
  const set2 = new Set(s2)

  const result: string[] = []

  if(s3) {
    const set3 = new Set(s3)
    for(let char of set1) {
      if(set2.has(char) && set3.has(char)) result.push(char)
    } 
  } else {
    for(let char of set1) {
      if(set2.has(char)) result.push(char)
    }
  }
  return result[0]
}

/* 
part one
*/

let roundOneScores: number[] = []
// iterate through each of our strings in array result
result.forEach((str: string) => {
  const [str1, str2] = splitString(str)
  const common = findCommonChars(str1,str2)
  const val = assignValToChar(common)
  roundOneScores.push(val)
})

console.log(`part one answer: ${roundOneScores.reduce((prev,current) => prev + current)}`)

/*
part two
*/
let roundTwoScores: number[] = []
let splits = splitStringsGroups(result,3)
splits.forEach((arr) => {
  let char = findCommonChars(arr[0],arr[1],arr[2])
  const val = assignValToChar(char)
  roundTwoScores.push(val)
})

console.log(`part two answer: ${roundTwoScores.reduce((prev,current) => prev + current)}`)




