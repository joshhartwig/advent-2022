/*
  solution for advent of code day one
*/
const fs = require('fs')
let arrayOfNums: number[]
const result = fs.readFileSync('data.txt', 'utf8').split('\n')
arrayOfNums = result.map((x:any) => {
  if(Number.isNaN(parseInt(x))) return 0
  return parseInt(x)
})

let arrayOfSums: number[] = []
let total = 0

for(let i = 0; i < arrayOfNums.length; i++) {
  total += arrayOfNums[i]
  if(arrayOfNums[i] === 0) {
    arrayOfSums.push(total)
    total = 0;
  }
}
if(total !== 0) arrayOfSums.push(total)
arrayOfSums.sort((a,b) => b - a)

console.log(`Answer for part 1: ${arrayOfSums[0]}`)

/* 
  part two
*/

console.log(`Answer for part 2: ${arrayOfSums[0] + arrayOfSums[1] + arrayOfSums[2]}`)