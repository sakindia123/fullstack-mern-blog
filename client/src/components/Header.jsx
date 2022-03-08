import { AppBar, Toolbar, makeStyles, Typography } from '@material-ui/core'
import { Link } from "react-router-dom"

const useStyle = makeStyles({
    component: {
        background: '#2E3B55',
        color: 'white'
    },
    container: {
        justifyContent: 'center',
        '&  >*': {
            padding: 20,
            color: 'black',
            textDecoration: 'none'
        }
    },
    link: {
        textDecoration: 'none',
        color: 'inherit'
    }
})

const Header = () => {
    const classes = useStyle()
    return (
        <AppBar className={classes.component} >
            <Toolbar className={classes.container}>
                <Link className={classes.link} to='/'>
                    <Typography>Home</Typography>
                </Link>
                <Link className={classes.link} to='/'>
                    <Typography>About</Typography>
                </Link>
                <Link className={classes.link} to='/'>
                    <Typography>Contact Us</Typography>
                </Link>
                <Link className={classes.link} to='/'>
                    <Typography>Login</Typography>
                </Link>
            </Toolbar>
        </AppBar>
    )
}

export default Header