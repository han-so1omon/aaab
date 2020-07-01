from gql import gql, Client
from gql.transport.requests import RequestsHTTPTransport
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import os
import numpy as np

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

# Setup numpy float formatter for printing to graphql strings in proper format
floatFormatter = '{:.2f}'.format
np.set_printoptions(formatter={'float_kind': floatFormatter})


@app.route('/api/validate', methods=['OPTIONS', 'POST'])
@cross_origin()
def handleValidate():
    data = request.get_json()

    validateQuery = gql('''
        query {{
            findTestByID(id: {id}) {{ 
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
    '''.format(id=data['id']))

    res = client.execute(validateQuery)
    res = res['findTestByID']

    a = res['a']['data']
    b = res['b']['data']

    sortedA, sortedB, aEcdf, bEcdf, d = kolgomorovSmirnov(
        a,
        b)

    same = d <= data['thresh']

    validateMutation = gql('''
        mutation {{
            updateTest(
                id: {id}
                data: {{
                    aEcdf: {{
                        create: {{
                            name: "{aEcdfName}_ECDF"
                            data: {aEcdfData}
                        }}
                    }}
                    bEcdf: {{
                        create: {{
                            name: "{bEcdfName}_ECDF"
                            data: {bEcdfData}
                        }}
                    }}
                    thresh: {thresh}
                    d: {d}
                    same: {same}
            }})
        }}
    '''.format(id=data['id'],
               aEcdfName=res['a']['name'],
               aEcdfData=aEcdf,
               bEcdfName=res['b']['name'],
               bEcdfData=bEcdf,
               thresh=data['thresh'],
               d=d,
               same=same))

    return jsonify({
        'id': data['id'],
        'aName': res['a']['name'],
        'a': a,
        'sortedA': sortedA.tolist(),
        'bName': res['b']['name'],
        'b': b,
        'sortedB': sortedB.tolist(),
        'aEcdf': aEcdf.tolist(),
        'bEcdf': bEcdf.tolist(),
        'thresh': data['thresh'],
        'd': d,
        'same': bool(same),
        'msg': 'Successfully performed dataset validation'
    })


def kolgomorovSmirnov(a, b):
    sortedA = np.sort(a)
    sortedB = np.sort(b)
       
    sortedA_CDF = ecdf(sortedA)
    sortedA_ECDF = np.array([sortedA_CDF(x) for x in sortedA])

    sortedB_CDF = ecdf(sortedB)
    sortedB_ECDF = np.array([sortedB_CDF(x) for x in sortedB])

    d = dStatistic(sortedA, sortedB, sortedA_ECDF, sortedB_ECDF)

    return sortedA, sortedB, sortedA_ECDF, sortedB_ECDF, d


def ecdf(x):
    x = np.sort(x)
    def result(v):
        return np.searchsorted(x, v, side='right') / x.size
    return result
 

# NOTE: in order to use this function in the general case,
# we should normalize the concatenated a::b dataset
def dStatistic(a, b, a_ecdf, b_ecdf):
    def new_idx(arr1, arr2, arr1_idx, arr2_idx):
        if arr1_idx >= len(arr1)-1 and arr2_idx >= len(arr2-1):
            return arr1_idx, arr2_idx
        elif arr1_idx >= len(arr1)-1:
            return arr1_idx, arr2_idx+1
        elif arr2_idx >= len(arr2)-1:
            return arr1_idx+1, arr2_idx
         
        eps = 0.0005
        diff = arr1[arr1_idx] - arr2[arr2_idx]
        
        if np.abs(diff) < eps:
            return arr1_idx+1, arr2_idx+1
        elif diff < 0:
            return arr1_idx+1, arr2_idx
        else:
            return arr1_idx, arr2_idx+1
        
    a_idx = 0
    b_idx = 0
    d = -np.Inf
    while True:
        # set d to new max distance between ecdf functions
        d = np.maximum(d, np.abs(a_ecdf[a_idx]-b_ecdf[b_idx]))
        
        # break if reached the end of the arrays
        if a_idx >= len(a)-1 and b_idx >= len(b)-1:
            break
        
        # walk through arrays
        (a_idx, b_idx) = new_idx(a, b, a_idx, b_idx)
    
    return d


'''
control1 = np.array([0.22, -0.87, -2.39, -1.79, 0.37,
                     -1.54, 1.28, -0.31, -0.74, 1.72,
                     0.38, -0.17, -0.62, -1.10, 0.30,
                     0.15, 2.30, 0.19, -0.50, -0.09])
data1 = np.array([-5.13, -2.19, -2.43, -3.83, 0.50,
                  -3.25, 4.32, 1.63, 5.18, -0.43,
                  7.11, 4.87, -3.10, -5.81, 3.76,
                  6.31, 2.58, 0.07, 5.76, 3.50])
control2 = np.array([1.26, 0.34, 0.70, 1.75, 50.57,
                     1.55, 0.08, 0.42, 0.50, 3.20,
                     0.15, 0.49, 0.95, 0.24, 1.37,
                     0.17, 6.98, 0.10, 0.94, 0.38])
data2 = np.array([2.37, 2.16, 14.82, 1.73, 41.04,
                  0.23, 1.32, 2.91, 39.41, 0.11,
                  27.44, 4.51, 0.51, 4.50, 0.18,
                  14.68, 4.66, 1.30, 2.06, 1.19])
'''
