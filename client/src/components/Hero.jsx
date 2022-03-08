import { makeStyles, Box, Typography } from '@material-ui/core'
import hero from '../assets/hero.jpg'

const useStyles = makeStyles({
    image: {
        background: `url(${hero}) center repeat-x`,
        width: '100%',
        height: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        '& :first-child': {
            fontSize: 65,
            color: '#FFFFFF',
            marginBottom: '2rem'
        }
    }
})


const Hero = () => {
    const classes = useStyles()
    return (
        <Box className={classes.image} >
            <Typography>Sarthak's Blog</Typography>
        </Box>
    )
}

export default Hero