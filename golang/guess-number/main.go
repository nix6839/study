package main

import (
	"bufio"
	"fmt"
	"math/rand"
	"os"
	"time"
)

var stdin = bufio.NewReader(os.Stdin)

func inputInt() (int, error) {
	var input int
	_, err := fmt.Scanln(&input)
	if err != nil {
		stdin.ReadString('\n')
	}
	return input, err
}

func main() {
	rand.Seed(time.Now().UnixNano())
	randomNumber := rand.Intn(100)

	var tryCount int
	for {
		tryCount += 1
		fmt.Print("숫자값을 입력하세요:")
		guessNumber, err := inputInt()
		if err != nil {
			fmt.Println("숫자만 입력하세요.")
			continue
		}

		if guessNumber == randomNumber {
			fmt.Println("숫자를 맞췄습니다. 축하합니다. 시도한 횟수:", tryCount)
			break
		} else if guessNumber > randomNumber {
			fmt.Println("입력하신 숫자가 더 큽니다.")
		} else {
			fmt.Println("입력하신 숫자가 더 작습니다.")
		}
	}
}
