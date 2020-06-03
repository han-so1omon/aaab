from faunadb import query as q
from faunadb.objects import Ref
from faunadb.client import FaunaClient
from http.server import BaseHTTPRequestHandler

# Checks for correct test key and runs test validation and loads into FaunaDB
# for associated test

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/plain')
        self.end_headers()

        self.wfile.write('<h1>Hi! validate</h1>')
        return
