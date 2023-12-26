// See https://aka.ms/new-console-template for more information

using System.IO;

string path = "test.txt";
List<int> sizes = new();  //store our totals

using (StreamReader sr = new StreamReader(path))
{
  string? line;
  var temp = 0;
  while ((line = sr.ReadLine()) != null)
  {
    if (line != "") // if line is not empty add it to temp
    {
      var number = Int32.Parse(line);
      temp += number;
    }
    else
    {  // we found an empty line
      sizes.Add(temp);  // add our totals to the list
      temp = 0; // reset temp
    }
  }
}

// Answer for Part One
sizes = sizes.OrderBy(i => i).ToList();
Console.WriteLine($"Part One: The largest is {sizes[sizes.Count - 1]}");

// Answer for Part Two
int total = sizes.OrderByDescending(i => i).Take(3).Sum();
Console.WriteLine($"Part Two: The sum of the largest 3 is {total}");
