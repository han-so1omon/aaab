import { AppBar, Toolbar, Typography, makeStyles } from '@material-ui/core'
import MuiLink from '@material-ui/core/Link'
import GitHubIcon from '@material-ui/icons/GitHub'
import HomeIcon from '@material-ui/icons/Home'

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1
    },
    container: {
        justifyContent: 'space-around'
    }
}))

const Nav = () => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <AppBar position='fixed'>
                <Toolbar variant='regular' className={classes.container}>
                    <MuiLink
                        color='inherit'
                        href='https://errcsool.com'
                    >
                        <HomeIcon />
                    </MuiLink>
                    <MuiLink
                        color='inherit'
                        href='https://errcsool.com/portfolio/aaab'
                    >
                        <Typography variant='h6'>
                            AAAB
                        </Typography>
                    </MuiLink>
                    <MuiLink
                        color='inherit'
                        href='https://github.com/han-so1omon/aaab'>
                        <GitHubIcon />
                    </MuiLink>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Nav
