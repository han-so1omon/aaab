import Grid from '@material-ui/core/Grid'

import Nav from '../components/Nav'
import DataPusher from '../components/DataPusher'
import DataCollector from '../components/DataCollector'

const Index = () => {
    return (
        <Grid
            container
            justify="center"
            direction="column"
            alignItems="center"
            spacing={5}
        >
            <Grid item>
                <Nav/>
            </Grid>
            <Grid item>
                <DataCollector/>
            </Grid>
            <Grid item>
                <DataPusher/>
            </Grid>
        </Grid>
    )
}

export default Index
