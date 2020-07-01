import { makeStyles } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'

import Nav from '../components/Nav'
import DataPusher from '../components/DataPusher'
import DataCollector from '../components/DataCollector'

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.default
    }
}))

const Index = () => {
    const classes = useStyles()

    return (
        <Grid
            container
            justify='center'
            direction='column'
            alignItems='center'
            spacing={10}
            className={classes.root}
        >
            <Grid item>
                <Nav />
            </Grid>
            <Grid item>
                <DataCollector />
            </Grid>
            <Grid item>
                <DataPusher />
            </Grid>
        </Grid>
    )
}

export default Index
