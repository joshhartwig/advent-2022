package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"sort"
	"strconv"
)

func main() {
	filename := "data.txt"

	var totals []int

	file, err := os.Open(filename)
	if err != nil {
		log.Println("failed opening file:", err)
		return
	}
	defer file.Close()

	total := 0
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			totals = append(totals, total)
			total = 0
		}

		num, err := strconv.Atoi(line)
		if err != nil {
			log.Println("failed to convert line to int:", err)
			continue
		}
		total += num
	}
	totals = append(totals, total)

	sort.Ints(totals)
	fmt.Println("The highest total:", totals[len(totals)-1]) // part 1

	// part 2
	sumOfThree := totals[len(totals)-1] + totals[len(totals)-2] + totals[len(totals)-3]
	fmt.Println("The sum of the three highest totals:", sumOfThree)
}
