package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
)

func main() {
	f, e := os.Open("data.txt")
	if e != nil {
		panic(e)
	}

	defer f.Close()

	var lines []string //stores our lines
	var scores []int   // stores our scores
	var roundTwoScores []int

	s := bufio.NewScanner(f)
	for s.Scan() {
		lines = append(lines, s.Text())
	}

	if err := s.Err(); err != nil {
		log.Fatalf("failed to open text file.")
	}

	for _, line := range lines {
		scores = append(scores, returnScore(string(line[0]), string(line[2])))
		roundTwoScores = append(roundTwoScores, returnScoreAltered(string(line[0]), string(line[2])))
	}

	sum := 0
	for _, score := range scores {
		sum += score
	}
	fmt.Printf("The sum for round 1 is: %v \n", sum)

	/********* round two ********/
	roundTwoSum := 0
	for _, score := range roundTwoScores {
		roundTwoSum += score
	}
	fmt.Printf("The sum for round 2 is: %v \n", roundTwoSum)

}

// first part of the puzzle
func returnScore(computerKey string, playerKey string) int {
	score := 0
	switch {
	case playerKey == "X" && computerKey == "A":
		score += 4 //draw + X = 4
	case playerKey == "X" && computerKey == "B":
		score += 1 //lose + 1
	case playerKey == "X" && computerKey == "C":
		score += 7 //win
	case playerKey == "Y" && computerKey == "A":
		score += 8 // p2 v r = w6
	case playerKey == "Y" && computerKey == "B":
		score += 5 // p v p = d3 + 2
	case playerKey == "Y" && computerKey == "C":
		score += 2 //lose + 2
	case playerKey == "Z" && computerKey == "A":
		score += 3 //lose + 3 s v r
	case playerKey == "Z" && computerKey == "B":
		score += 9 //win s v p = w6 + 3
	case playerKey == "Z" && computerKey == "C":
		score += 6 //draw s v s = d3 + 3
	}
	return score
}

// this is for the second part of the puzzle
func returnScoreAltered(computerKey string, playerKey string) int {
	score := 0
	switch {
	case playerKey == "X" && computerKey == "A":
		score += 3 //lose to rock = s3 + 0
	case playerKey == "X" && computerKey == "B":
		score += 1 //lose to paper = r1 + 0
	case playerKey == "X" && computerKey == "C":
		score += 2 //lose to scissors = p2 + 0
	case playerKey == "Y" && computerKey == "A":
		score += 4 // draw to rock = r1 + 3
	case playerKey == "Y" && computerKey == "B":
		score += 5 // draw to paper = p2 + 3
	case playerKey == "Y" && computerKey == "C":
		score += 6 // draw to scissors = s3 + 3
	case playerKey == "Z" && computerKey == "A":
		score += 8 // win to rock = p2 + 6
	case playerKey == "Z" && computerKey == "B":
		score += 9 //win to paper = s3 + 6
	case playerKey == "Z" && computerKey == "C":
		score += 7 // win to scissors = r1 + 6
	}
	return score
}
