const fs = require('fs')
const result = fs.readFileSync('data.txt','utf8')
const patternOne = /^(?!.*(.).*\1).{4}$/
const patternTwo = /^(?!.*(.).*\1).{14}$/

const analyzePartOne = (data: string) => {
  let found = false;
  for(let i = 0; i < data.length; i++) {
    if(!found && i > 3) {
      let str = data[i - 3] + data[i - 2] + data[i - 1] + data[i] 
      if(patternOne.test(str)) {
        found = true
        console.log(`pattern one found is ${str} marker @ ${i + 1}`)
      }
      
    }
  }

}

const range = (lower: number, upper:number) : number[] => {
  let arr: number[] = []
  for(let i = lower; i <= upper; i++) {
    arr.push(i)
  }
  return arr
}

const analyzePartTwo = (data: string) => {
  let found = false;
  for(let i = 0; i < data.length; i++) {
    if(!found && i > 13) {
      let arr = range(i - 13, i)
      let str = ""
      let temp = arr.map(c => str += data[c])
      if(patternTwo.test(str)) {
        found = true
        console.log(`pattern two found is ${str} marker @ ${i + 1}`)
      }
      
    }
  }
}

analyzePartOne(result)
analyzePartTwo(result)