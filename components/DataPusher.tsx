import { useContext, useEffect, useState } from 'react'
import { Grid } from '@material-ui/core'

import TestInteraction from  './TestInteraction'
import MessageDisplay from  './MessageDisplay'
import { AppStateContext } from './AppStateProvider'

const DataPusher = () => {
    const [statusMsg, setStatusMsg] = useState('')
    const {
        testStatus
    } = useContext(AppStateContext)

    useEffect(() => {
        if (testStatus) {
            setStatusMsg('Test:  ID: ' + testStatus.id.toString() + '\n\ta: ' +
                testStatus.aName + '\n\tb: ' + testStatus.bName + '\n\tsame: ' +
                testStatus.same + '\n' + testStatus.msg)
        }
    }, [testStatus])

    return (
        <Grid
            container
            justify="center"
            direction="row"
            alignItems="center"
            spacing={5}
        >
            <Grid item>
                <TestInteraction />
            </Grid>
            <Grid item>
                <MessageDisplay newMsg={statusMsg}/>
            </Grid>
        </Grid>
    )
}

export default DataPusher
