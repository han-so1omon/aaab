from gql import gql, Client
from gql.transport.requests import RequestsHTTPTransport
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import os

# Setup flask app
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# Setup graphql client
client = Client(
    transport=RequestsHTTPTransport(
        url='https://graphql.fauna.com/graphql',
        headers={'Authorization': 'Bearer '+os.environ['FAUNA_SECRET']}),
    fetch_schema_from_transport=True)
    #schema=schema)

@app.route('/api/test', methods=['OPTIONS', 'POST'])
@cross_origin()
def handleTest():
    data = request.get_json()

    testSetupMutation = gql('''
        mutation {{
            createTest(
                data: {{
                    a: {{
                        create: {{
                            name: "{aName}_A"
                            data: {aData}
                        }}
                    }}
                    b: {{
                        create: {{
                            name: "{bName}_B"
                            data: {bData}
                        }}
                    }}
                }}
            ) {{
                _id
                a {{
                    name
                    data
                }}
                b {{
                    name
                    data
                }}
            }}
        }}
    '''.format(aName=data['name'],
               aData=data['a'],
               bName=data['name'],
               bData=data['b']))

    res = client.execute(testSetupMutation)
    res = res['createTest']

    return jsonify({
        'id': res['_id'],
        'a': res['a'],
        'b': res['b'],
        'msg': 'Successfully entered datasets'
    })
