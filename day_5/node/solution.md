# Day 5 solution

I've decided to start documenting my solutions to the "Advent of Code 2022". For this challenge, as well as all previous ones, I've primarily utilized Typescript and Node, with occasional ventures into GO.

# Part 1

In the first part of the solution, our task is to read in a file and parse it into an array of arrays, like the following example:

```typescript
    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3
```

To assist with this task, I created several functions. The initial function identifies the column guide, which provides instructions on how to parse the array. As every file begins with a '1', and it's the only line starting with '1', we'll locate the line number containing it.

```typescript
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
```

Having identified the line number, we can process it with another function that parses the final number in that line. This subsequently builds a matching number of arrays within our main array.

```typescript
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
```

The approach here is straightforward. Since we know the position of each letter in the array, we can walk upwards to position 0, collecting each letter and adding it to our current array. Upon completion, this array is then pushed into the main array. As a result, your structure might look something like:

```typescript
[
  [ 'D' ],
  [ 'N', 'C' ],
  [ 'Z', 'M', 'P' ]
]
```

The next phase involves parsing the instructions. Typically, these are in the format:

```typescript
  move 2 from 5 to 9
```

By extracting the data between 'e' and 'f' and converting that into a number, then between 'm' and 't', and finally after 'o', we can create a structure resembling:

```typescript
{
  from: 5,
  to: 9,
  amount: 2
}
```

This indicates a movement of 2 elements from position 5 to 9. With this structure in place, we simply loop through the remaining file contents, enacting these instructions using the following function:

```typescript
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
```

# Part 2

The second part largely mirrors the first. The key distinction is ensuring that the order remains consistent. This can be easily achieved using ES6 syntax:

```typescript
const executeInstructionPartTwo = (arr: string[][], ins: { count: number, to: number, from: number}) : void => {
  const arrayTo = arr[ins.to - 1]
  const arrayFrom = arr[ins.from - 1]
  
  let count = ins.count

  let removedElements = arrayFrom.splice(-count)
  arrayTo.push(...removedElements)
}
```

## Summary

This was a fun challenge. I am no pro at parsing text files. I am glad there are patterns to that text that make it easy to parse. There are probably countless ways to improve this and quite a few ways I could have made it more effecient (I can actually think of a few now:). I noticed many others try to shoot for the smallest amount of code. I went the route of creating functions because I intend to leverage jest to test. I just got a bit lazy with this one.

-JH