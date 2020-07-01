import { useContext, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

import { AppStateContext, AppDispatchContext } from './AppStateProvider'

const PlotDisplay = dynamic(import('../components/PlotDisplay'), {
    ssr: false
})

const DataCollector = () => {
    const dispatch = useContext(AppDispatchContext)
    const [datasets, setDatasets] = useState({})
    const {
        testID
    } = useContext(AppStateContext)

    async function fetchValidationData(id: string) {
        const resp = await fetch(process.env.NEXT_PUBLIC_FUNCTIONS_BASE_URL + '/api/validate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id, thresh: 0.2 })
        })
        const jResp = await resp.json()
        
        dispatch({
            type: 'SET_TEST_STATUS',
            payload: {
                id: jResp.id,
                aName: jResp.aName,
                bName: jResp.bName,
                thresh: jResp.thresh,
                d: jResp.d,
                same: jResp.same,
                msg: jResp.msg
            }
        })

        setDatasets({
            a: jResp.a,
            sortedA: jResp.sortedA,
            aName: jResp.aName,
            b: jResp.b,
            sortedB: jResp.sortedB,
            bName: jResp.bName,
            aEcdf: jResp.aEcdf,
            bEcdf: jResp.bEcdf,
            thresh: jResp.thresh,
            d: jResp.d
        })
    }

    useEffect(() => {
        if (testID) {
            fetchValidationData(testID.id)
        }
    }, [testID])

    return (
        <PlotDisplay datasets={datasets}/>
    )
}

export default DataCollector
