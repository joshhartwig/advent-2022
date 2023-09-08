package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {

	//get our data from a file into a slice
	// iterate through each of the lines and get the numeric value of each and add it to scores
	// calc the total scores
	data := getFile("data.txt")
	var scores []int // stores our scores
	for _, line := range data {
		left, right := splitString(line)
		diff := findSameChar(left, right)
		scores = append(scores, assignValueToChar(diff))
	}

	finalScore := sumSlice(scores)

	fmt.Println(finalScore)

}

// adds are of our numbers together
func sumSlice(numbers []int) int {
	total := 0
	for _, num := range numbers {
		total += num
	}
	return total
}

// checks both strings and determines if there is a matching char between the two
func findSameChar(str1, str2 string) string {
	freq1 := make(map[rune]bool)
	freq2 := make(map[rune]bool)
	var commons []rune

	for _, char := range str1 {
		freq1[char] = true
	}

	for _, char := range str2 {
		if freq1[char] && !freq2[char] {
			commons = append(commons, char)
			freq2[char] = true
		}
	}
	return string(commons[0]) // prob bad idea but we know from the guide there should only be one
}

// create a function that reads from file and puts each line into slice
func getFile(path string) []string {
	var data []string
	f, e := os.Open(path)
	if e != nil {
		panic(e)
	}
	defer f.Close()

	s := bufio.NewScanner(f)
	for s.Scan() {
		data = append(data, s.Text())
	}

	return data
}

// splits our string in two
func splitString(str string) (string, string) {
	length := len(str)
	mid := length / 2

	left := str[:mid]
	right := str[mid:]

	return left, right
}

// takes in a char and returns a numeric value
func assignValueToChar(str string) int {
	charMap := make(map[string]int)
	for r := 'a'; r <= 'z'; r++ {
		charMap[string(r)] = int(r - 'a' + 1)
	}
	for r := 'A'; r <= 'Z'; r++ {
		charMap[string(r)] = int(r - 'A' + 27)
	}
	return charMap[str]
}
