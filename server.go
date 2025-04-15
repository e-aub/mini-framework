package main

import (
	"log"
	"net/http"
	"os"
)

func main() {
	fs := http.FileServer(http.Dir("."))

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		path := "." + r.URL.Path
		file, err := os.Stat(path)
		if err != nil || file.IsDir() {
			buffer, _ := os.ReadFile("./index.html")
			w.Write(buffer)
			return
		}

		fs.ServeHTTP(w, r)
	})

	log.Printf("Server running on http://localhost%s\n", "3000")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
