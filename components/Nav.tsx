import { AppBar, Toolbar } from '@material-ui/core'
import styled from 'styled-components'

const A = styled.a`
    text-decoration: none;
    color: #FFFFFF;
`

const Nav = () => {
    return (
        <AppBar position="fixed">
            <Toolbar variant="dense">
                <A href="https://errcsool.com/portfolio/ab-test-service">
                    AAAB
                </A>
            </Toolbar>
        </AppBar>
    )
}

export default Nav
