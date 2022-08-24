package main

import (
	"bufio"
	"fmt"
	"math/rand"
	"os"
	"time"
)

const (
	InitialMoney = 1000
	EarnMoney    = 500
	LoseMoney    = 100

	VictoryMoney  = 5000
	GameoverMoney = 0
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

	money := InitialMoney

	for money > GameoverMoney && money < VictoryMoney {
		fmt.Print("숫자(1~5)를 입력해주세요: ")
		input, err := inputInt()
		if err != nil || (input > 5 || input < 1) {
			fmt.Println("유효한 값을 입력해주세요.")
			continue
		}

		if input == (rand.Intn(5) + 1) {
			money += EarnMoney
			fmt.Println("축하합니다!")
		} else {
			money -= LoseMoney
			fmt.Println("아쉽네요...")
		}
		fmt.Println("잔액:", money)
	}

	if money >= VictoryMoney {
		fmt.Println("게임 오버...")
	} else if money <= GameoverMoney {
		fmt.Println("게임 승리!!!")
	}
}
