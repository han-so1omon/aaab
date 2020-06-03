package data

// Checks for correct keys and loads test data into FaunaDB

import (
	"fmt"
	fauna "github.com/fauna/faunadb-go"
	"net/http"
)

func Handler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "<h1>Hi! data loader</h1>")
}
