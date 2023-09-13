const fs = require('fs')
const result = fs.readFileSync('data.txt','utf8').split('\n')

interface pairs {
  pairOneStart: number,
  pairOneEnd: number,
  pairTwoStart: number,
  pairTwoEnd: number
}

const splitStrIntoPairs = (str: string): pairs => {
  const [left, right] = str.split(',')
  
  const [pair1A, pair1B] = left.split('-')
  const [pair2A, pair2B] = right.split('-')

  const pair1ANum = parseInt(pair1A.toString())
  const pair1BNum = parseInt(pair1B.toString())
  
  const pair2ANum = parseInt(pair2A.toString())
  const pair2BNum = parseInt(pair2B.toString())

  
  return {
    pairOneStart: pair1ANum,
    pairOneEnd: pair1BNum,
    pairTwoStart: pair2ANum,
    pairTwoEnd: pair2BNum
  }
}

// checks if there is an overlap between the pairs of numbers, if there is return true
const checkIfOverlap = (pairs: pairs) : boolean => {
  //create array for first pair
  const arr1: number[] = []
  const arr2: number[] = []
  // create a range of numbers
  for (let i = pairs.pairOneStart; i <= pairs.pairOneEnd; i++) {
    arr1.push(i)
  }

  for (let i = pairs.pairTwoStart; i <= pairs.pairTwoEnd; i++) {
    arr2.push(i)
  }
  
  let result = false;
  result = arr1.some(e => arr2.indexOf(e) >= 0) || arr2.some(e => arr1.indexOf(e) >= 0)

  // if the lowest num of grouping 1 is greater then or equal to group 2 num 1
  // and high num of group 1 is not greater then true

  return result;
} 

let scores = 0

result.forEach((s:string)=> {
  let pair = splitStrIntoPairs(s)
  if(checkIfOverlap(pair)) {
    console.log(`pair found with: ${s}`)
    scores++
  } else {
    console.log(`pair not found with: ${s}`)
  }
  
})

console.log(scores)
