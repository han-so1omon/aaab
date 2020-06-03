package sessions

// Generates three keys: (1) session key, (2) stream A key, (3) stream B key and
// loads them into FaunaDB

import (
	"fmt"
	fauna "github.com/fauna/faunadb-go"
	"net/http"
)

func Handler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "<h1>Hi! new test</h1>")
}
