package main

// Checks for correct test key and checks associated test

import (
	"fmt"
	fauna "github.com/fauna/faunadb-go"
	"net/http"
)

func Handler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "<h1>Hi! test status</h1>")
}
