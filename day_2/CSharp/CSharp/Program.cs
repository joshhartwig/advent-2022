// See https://aka.ms/new-console-template for more information



// a = r, b = p, c = s
// x = r, y = p, z = s
// score for shape selected 1 r, 2 p, 3 s
// + outcome = 0 lose, 3 draw, 6 win


string path = "data.txt";
int totalPartOne = 0;
int totalPartTwo = 0;

using (StreamReader sr = new StreamReader(path))
{
  string? line;
  while ((line = sr.ReadLine()) != null)
  {
    // iterate through each line and get the running totals
    var col1 = line[0];
    var col2 = line[2];

    totalPartOne += determineWinnerPartOne(col1, col2);
    totalPartTwo += determineWinnerPartTwo(col1, col2);
  }

}

int determineWinnerPartOne(char col1, char col2)
{
  int temp = 0;
  switch (col2)  // switch on my play
  {
    case 'X': // we have rock
      temp += 1;
      if (col1 == 'A') temp += 3; // draw: r = r
      if (col1 == 'B') break; // lose: r < p
      if (col1 == 'C') temp += 6; // win: r > s
      break;
    case 'Y':
      temp += 2;
      if (col1 == 'A') temp += 6; // win: p > r
      if (col1 == 'B') temp += 3; // draw: p = p
      if (col1 == 'C') break; // lose: p < s
      break;
    case 'Z':
      temp += 3;
      if (col1 == 'A') break; // lose: s < r
      if (col1 == 'B') temp += 6; // win: s > p
      if (col1 == 'C') temp += 3; // draw: s = s
      break;
  }
  return temp;
}

// part two says our column determines if we lose: x, draw: y, 
int determineWinnerPartTwo(char col1, char col2)
{
  int temp = 0;
  switch (col2)  // switch on my play
  {
    case 'X': // we need to lose
      if (col1 == 'A') temp += 3; // lose: +3 for scissors r > s
      if (col1 == 'B') temp += 1; // lose: +1 rock p > r
      if (col1 == 'C') temp += 2; // lose: +2 paper s > p
      break;
    case 'Y': // we need to draw
      temp += 3;  // +3 for draw
      if (col1 == 'A') temp += 1; // draw: +1 for rock r = r 
      if (col1 == 'B') temp += 2; // draw: +2 for paper p = p
      if (col1 == 'C') temp += 3; // draw: +3 fpr scissors s = s
      break;
    case 'Z': // we need to win
      temp += 6;
      if (col1 == 'A') temp += 2; // win: +2 for paper p > r
      if (col1 == 'B') temp += 3; // win: +3 for scissors s > p
      if (col1 == 'C') temp += 1; // win: +1 for rock r > s
      break;
  }
  return temp;
}

// part one
Console.WriteLine($"The total for part one is: {totalPartOne}");

//part two
Console.WriteLine($"The total for part one is: {totalPartTwo}");