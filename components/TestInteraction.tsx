import { useContext, useState } from 'react'
import { Paper, Button } from '@material-ui/core'
import { getRandomBoxMeuller, getRandomInt, getRandomArbitrary, getRandomID } from '../lib/sampler'

import { AppDispatchContext} from './AppStateProvider'

const TestInteraction = () => {
    const [numTests, setNumTests] = useState(0)
    const dispatch = useContext(AppDispatchContext)

    function getRandomDatasetParams() {
        let min = getRandomArbitrary(0, 1)
        let max = getRandomArbitrary(0, 1)
        while (max <= min) {
            max = getRandomArbitrary(0, 1)
        }
        let skew = getRandomArbitrary(0, 1)

        return { min: min, max: max, skew: skew }
    }

    function randomData() {
        let a:number[] = []
        let b:number[] = []

        let aParams = getRandomDatasetParams()
        let bParams = aParams
        bParams.min *= getRandomArbitrary(.97, 1.02)
        bParams.max *= getRandomArbitrary(.97, 1.02)
        bParams.skew *= getRandomArbitrary(.97, 1.02)

        for (let i=0; i<getRandomInt(10, 100); i++) {
            a.push(getRandomBoxMeuller(aParams.min, aParams.max, aParams.skew))
        }
        for (let i=0; i<getRandomInt(10, 100); i++) {
            b.push(getRandomBoxMeuller(bParams.min, bParams.max, bParams.skew))
        }

        let name = 'test_' + getRandomID(5)

        return { name: name, a: a, b: b }
    }

    async function generateSampleDatasets () {
        dispatch({
            type: 'SET_LOG_MSG',
            payload: '----------\nStarting test ' + numTests + ' \n----------'
        })
        setNumTests(numTests+1)
        let data = randomData()
        /*
        let data = {
            name: 'test',
            a: [1.26, 0.34, 0.70, 1.75, 50.57,
                1.55, 0.08, 0.42, 0.50, 3.20,
                0.15, 0.49, 0.95, 0.24, 1.37,
                0.17, 6.98, 0.10, 0.94, 0.38],
            b: [2.37, 2.16, 14.82, 1.73, 41.04,
                0.23, 1.32, 2.91, 39.41, 0.11,
                27.44, 4.51, 0.51, 4.50, 0.18,
                14.68, 4.66, 1.30, 2.06, 1.19]
        }
        let data = {
            name: 'test',
            a: [0.22, -0.87, -2.39, -1.79, 0.37,
                -1.54, 1.28, -0.31, -0.74, 1.72,
                0.38, -0.17, -0.62, -1.10, 0.30,
                0.15, 2.30, 0.19, -0.50, -0.09],
            b: [-5.13, -2.19, -2.43, -3.83, 0.50,
                -3.25, 4.32, 1.63, 5.18, -0.43,
                7.11, 4.87, -3.10, -5.81, 3.76,
                6.31, 2.58, 0.07, 5.76, 3.50]
        }
        */
        let url
        if (process.env.NEXT_PUBLIC_FUNCTIONS_BASE_URL) {
            url = process.env.NEXT_PUBLIC_FUNCTIONS_BASE_URL + '/api/test'
        } else {
            url = '/api/test'
        }
        const resp = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const jResp = await resp.json()

        dispatch({
            type: 'SET_TEST_ID',
            payload: { id: jResp.id, name: data.name }
        })
    }

    return (
        <Paper>
            <Button
                variant='contained'
                color='secondary'
                onClick={() => { generateSampleDatasets() }}
            >
                Generate sample datasets
            </Button>
        </Paper>
    )
}

export default TestInteraction
