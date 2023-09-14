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