import Plot from 'react-plotly.js'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

const PlotDisplay = (props:any) => {
    function range(start:number, end:number) {
        let foo = []
        for (let i = start; i < end; i++) {
            foo.push(i)
        }
        return foo
    }

    let xA, xB
    if (props.datasets.a) { xA = range(0, props.datasets.a.length) }
    if (props.datasets.b) { xB = range(0, props.datasets.b.length) }

    return (
        <Grid
            container
            justify='center'
            direction='row'
            alignItems='center'
            spacing={5}
        >
            <Grid item>
                {props.datasets.a && props.datasets.b &&
                <Paper>
                    <Plot
                        data={[
                            {
                                x: xA,
                                y: props.datasets.a,
                                type: 'scatter',
                                mode: 'markers',
                                marker: { color: 'red'},
                                name: props.datasets.aName
                            },
                            {
                                x: xB,
                                y: props.datasets.b,
                                type: 'scatter',
                                mode: 'markers',
                                marker: { color: 'purple'},
                                name: props.datasets.bName
                            },
                        ]}
                        layout={{
                            width: 600,
                            height: 400,
                            title: '<b>Datasets</b>',
                            yaxis: {
                                type: 'log',
                                autorange: true
                            }
                        }}
                    />
                </Paper>
                }
            </Grid>
            <Grid item>
                {props.datasets.sortedA && props.datasets.sortedB &&
                <Paper>
                    <Plot
                        data={[
                            {
                                x: xA,
                                y: props.datasets.sortedA,
                                type: 'scatter',
                                mode: 'lines+markers',
                                marker: { color: 'red'},
                                name: props.datasets.aName
                            },
                            {
                                x: xB,
                                y: props.datasets.sortedB,
                                type: 'scatter',
                                mode: 'lines+markers',
                                marker: { color: 'purple'},
                                name: props.datasets.bName
                            },
                        ]}
                        layout={{
                            width: 600,
                            height: 400,
                            title: '<b>Sorted Datasets</b>',
                            yaxis: {
                                type: 'log',
                                autorange: true
                            }
                        }}
                    />
                </Paper>
                }
            </Grid>
            <Grid item>
                { props.datasets.aEcdf && props.datasets.bEcdf &&
                    props.datasets.sortedA && props.datasets.sortedB &&
                <Paper>
                    <Plot
                        data={[
                            {
                                x: props.datasets.sortedA,
                                y: props.datasets.aEcdf,
                                type: 'scatter',
                                mode: 'lines+markers',
                                marker: { color: 'red' },
                                line: {
                                    shape: 'hv'
                                },
                                name: props.datasets.aName
                            },
                            {
                                x: props.datasets.sortedB,
                                y: props.datasets.bEcdf,
                                type: 'scatter',
                                mode: 'lines+markers',
                                marker: { color: 'purple'},
                                line: {
                                    shape: 'hv'
                                },
                                name: props.datasets.bName
                            },
                        ]}
                        layout={{
                            width: 600,
                            height: 400,
                            title: '<b>Empirical CDF</b>',
                            xaxis: {
                                type: 'log',
                                autorange: true
                            }
                        }}
                    />
                </Paper>
                }
            </Grid>
            <Grid item>
                { props.datasets.d && props.datasets.thresh && 
                <Paper>
                    <Plot
                        data={[
                            {
                                type: 'bar',
                                x: [props.datasets.thresh],
                                y: ['test'],
                                orientation: 'h',
                                name: 'max allowable'
                            },
                            {
                                type: 'bar',
                                x: [props.datasets.d],
                                y: ['test'],
                                orientation: 'h',
                                name: 'D statistic'
                            }
                        ]}
                        layout={{
                            width: 600,
                            height: 250,
                            title: `<b>Same dataset?\t${
                                props.datasets.d < props.datasets.thresh
                                ? 'YES!' : 'NO!'
                            }</b>`
                        }}
                    />
                </Paper>
                }
            </Grid>
        </Grid>
    )
}

PlotDisplay.propTypes = {
    a: PropTypes.arrayOf(PropTypes.number),
    b: PropTypes.arrayOf(PropTypes.number),
    sortedA: PropTypes.arrayOf(PropTypes.number),
    sortedB: PropTypes.arrayOf(PropTypes.number),
    aEcdf: PropTypes.arrayOf(PropTypes.number),
    bEcdf: PropTypes.arrayOf(PropTypes.number),
    thresh: PropTypes.number,
    d: PropTypes.number
}

export default PlotDisplay
