package main

import (
	"log"
	"net/http"
)

func main() {
	fs := http.FileServer(http.Dir("."))

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fs.ServeHTTP(w, r)
	})

	log.Printf("Server running on http://localhost%s\n", "3000")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
