package main

import "testing"

func TestGetFile(t *testing.T) {
	got := getFile("data.txt")
	if len(got) == 0 {
		t.Errorf("getFile() returned an empty string")
		t.Fail()
	}
}
func TestSplitString(t *testing.T) {
	str := "rZTmmqbBrmBvSTCwDDtlwjqnqnnq"
	left, right := splitString(str)

	// not same length
	if len(left) != len(right) { // not equal length
		t.Fail()
	}

	// empty strings
	if left == "" || right == "" {
		t.Fail()
	}
}

func TestAssignValueToChar(t *testing.T) {
	a, B, Z := "a", "B", "Z"

	test_one := assignValueToChar(a)
	if test_one != 1 {
		t.Fail()
		t.Errorf("expected 1 got %v", test_one)
	}

	test_two := assignValueToChar(B)
	if test_two != 28 {
		t.Fail()
		t.Errorf("expected 28 got %v", test_two)
	}

	test_three := assignValueToChar(Z)
	if test_three != 52 {
		t.Fail()
		t.Errorf("expected 52 got %v", test_three)
	}
}

func TestFindSameChar(t *testing.T) {
	str1 := "ghijklmn"
	str2 := "abcefg"
	res := findSameChar(str1, str2)

	if res != "g" {
		t.Fail()
		t.Errorf("Expected g got %v", res)
	}
}
