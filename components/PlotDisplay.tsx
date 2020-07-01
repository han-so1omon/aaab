import Plot from 'react-plotly.js'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'

const PlotDisplay = (props) => {
    function range(start, end) {
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
            justify="center"
            direction="column"
            alignItems="center"
            spacing={5}
        >
            <Grid item>
                {props.datasets.a && props.datasets.b &&
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
                        width: 640,
                        height: 480,
                        title: "Datasets",
                        yaxis: {
                            type: 'log',
                            autorange: true
                        }
                    }}
                />
                }
                {props.datasets.sortedA && props.datasets.sortedB &&
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
                        width: 640,
                        height: 480,
                        title: "Sorted Datasets",
                        yaxis: {
                            type: 'log',
                            autorange: true
                        }
                    }}
                />
                }
                { props.datasets.aEcdf && props.datasets.bEcdf &&
                    props.datasets.sortedA && props.datasets.sortedB &&
                <Plot
                    data={[
                        {
                            x: props.datasets.sortedA,
                            y: props.datasets.aEcdf,
                            type: 'scatter',
                            mode: 'lines+markers',
                            marker: { color: 'red' },
                            name: props.datasets.aName
                        },
                        {
                            x: props.datasets.sortedB,
                            y: props.datasets.bEcdf,
                            type: 'scatter',
                            mode: 'lines+markers',
                            marker: { color: 'purple'},
                            name: props.datasets.bName
                        },
                    ]}
                    layout={{
                        width: 640,
                        height: 480,
                        title: "Empirical CDF",
                        xaxis: {
                            type: 'log',
                            autorange: true
                        }
                    }}
                />
                }
                { props.datasets.d && props.datasets.thresh && 
                <Plot
                    data={[
                        {
                            type: 'indicator',
                            mode: 'gauge+number+delta',
                            gauge: { shape: 'bullet' },
                            delta: { reference: props.datasets.thresh },
                            value: props.datasets.d,
                            domain: { x: [0, 1], y: [0, 1] }
                        }
                    ]}
                    layout={{
                        width: 640,
                        height: 250,
                        title: 'D statistic vs threshold',
                    }}
                />
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
