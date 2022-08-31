package main

import (
	"bufio"
	"errors"
	"fmt"
	"os"
	"path/filepath"
	"strings"
	"sync"
)

type Line struct {
	number  int
	content string
}

func expandPaths(paths []string) []string {
	var ret []string
	for _, path := range paths {
		if expandedPaths, err := filepath.Glob(path); err == nil {
			ret = append(ret, expandedPaths...)
		}
	}
	return ret
}

func containLines(path string, find string) ([]Line, error) {
	file, err := os.Open(path)
	if err != nil {
		return []Line{}, fmt.Errorf("'%s', 파일을 읽어오는 데 실패했습니다.", path)
	}
	defer func() {
		file.Close()
	}()

	scanner := bufio.NewScanner(file)
	lines := []Line{}
	for i := 1; scanner.Scan(); i += 1 {
		txt := scanner.Text()
		if strings.Contains(txt, find) {
			lines = append(lines, Line{number: i, content: txt})
		}
	}
	return lines, nil
}

func main() {
	if len(os.Args) < 3 {
		panic(errors.New("인수는 2개 이상이어야 합니다."))
	}
	word, paths := os.Args[1], os.Args[2:]

	containMap := make(map[string][]Line)
	expandedPaths := expandPaths(paths)
	var wg sync.WaitGroup
	wg.Add(len(expandedPaths))
	for _, path := range expandedPaths {
		go func(path string) {
			lines, err := containLines(path, word)
			if err != nil {
				panic(err)
			}
			containMap[path] = lines
			wg.Done()
		}(path)
	}
	wg.Wait()

	for path, lines := range containMap {
		fmt.Println(path)
		fmt.Println("------------------------------")
		for _, line := range lines {
			fmt.Printf("\t%d\t%s\n", line.number, line.content)
		}
		fmt.Println("------------------------------")
		fmt.Println()
	}
}
