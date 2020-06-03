import dynamic from 'next/dynamic'
import { Container, Box, Grid } from '@material-ui/core'

import Nav from '../components/Nav'
import TactileSection from '../components/TactileSection'

const PlotDisplay = dynamic(import('../components/PlotDisplay'), {
    ssr: false
})


const Index = () => {
    return (
        <div>
            <Container>
                <Box my={4}>
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
                            <PlotDisplay/>
                        </Grid>
                        <Grid item>
                            <TactileSection/>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </div>
    )
}

export default Index
