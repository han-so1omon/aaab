import { Grid } from '@material-ui/core'

import TestInteraction from  './TestInteraction'
import MessageDisplay from  './MessageDisplay'

const TactileSection = () => {
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
                <MessageDisplay />
            </Grid>
        </Grid>
    )
}

export default TactileSection
