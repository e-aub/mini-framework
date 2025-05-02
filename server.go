package main

import (
	"net/http"
	"os"
)

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fileContent, err := os.ReadFile("./todo-mvc/index.html")
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		w.Header().Set("Content-Type", "text/html")
		_, err = w.Write(fileContent)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	})

	http.Handle("/framework/", http.StripPrefix("/framework", (http.FileServer(http.Dir("./framework")))))
	http.Handle("/assets/", http.StripPrefix("/assets", (http.FileServer(http.Dir("./todo-mvc")))))
	http.ListenAndServe(":8000", nil)
}
