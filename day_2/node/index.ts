/*
  advent of code day 2
*/
const fs = require('fs')
let matches: string[][] = []
const scores: number[] = []
let temp: string[] = []

const result: [] = fs.readFileSync('data.txt', 'utf8').split('\n')

result.map((val,idx) => {
  temp.push(val)
  if(idx % 3 === 2) {
    matches.push([...temp])
    temp.length = 0
  }
})

const computeMatchScore = (match: string[]) : number => {
  let score: number = 0
  // iterate through each match 1st determine if we won, next determine what we won with
  match.forEach(m => {
    if(computeMatchDraw(m[0],m[2])) { //draw
      score += 3
    }
    else if(computeMatchWin(m[0],m[2])) { // win
      score += 6
    }
    if(m[2] === 'X') score += 1
    if(m[2] === 'Y') score += 2
    if(m[2] === 'Z') score += 3
  })
  return score;
}


const computeMatchWin = (aiScore: string, playerScore: string) : boolean => {
  //x for rock, y for paper, z for scissors and a for rock, b for paper, c for scissors
  if(playerScore === 'X' && aiScore === 'C') return true // rock beats scissors
  if(playerScore === 'Y' && aiScore === 'A') return true // paper only beats rock
  if(playerScore === 'Z' && aiScore === 'B') return true // scissors only beats paper
  return false  // we didnt win
}

// returns true if there is a draw
const computeMatchDraw = (aiScore: string, playerScore: string) : boolean => {
  //x:r 1, y:p 2, z:3 a:rock 1, b:p 2, c:s 3
  if(playerScore === 'X' && aiScore === 'A') return true
  if(playerScore === 'Y' && aiScore === 'B') return true
  if(playerScore === 'Z' && aiScore === 'C') return true
  return false;
}

matches.forEach((m) => {
  scores.push(computeMatchScore(m))
})

let final = scores.reduce((partialsum, a) => partialsum + a, 0)
// 6574 too low
// 11056 too low

console.log(final)



// CX BY CX 
// CX sc vs rock = lose = 0 + 1
// BY paper vs paper = draw = 3 + 2
// CX sc vs rock = lose = 0 + 1
