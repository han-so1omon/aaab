import { AppBar, Toolbar } from '@material-ui/core'

const Nav = () => {
    return (
        <AppBar position="fixed">
            <Toolbar variant="dense">
                <a href="https://errcsool.com/portfolio/aaab">
                    AAAB
                </a>
                <style jsx>{`
                    a {
                        text-decoration: none;
                        color: #FFFFFF;
                    }

                    a:hover {
                        text-decoration: underline;
                    }
                `}</style>
            </Toolbar>
        </AppBar>
    )
}

export default Nav
