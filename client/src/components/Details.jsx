import { Box, makeStyles, Typography } from "@material-ui/core"
import postImg from '../assets/post.jpg'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { Link, useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react'
import { getPost, deleteBlog } from "../api/Api"

const useStyle = makeStyles((theme) => ({
    image: {
        height: '50vh',
        width: '100%',
        objectFit: 'cover'
    },
    container: {
        padding: '0 100px',
        [theme.breakpoints.down('sm')]: {
            padding: 0
        }
    },
    icons: {
        float: 'right'
    },
    icon: {
        margin: 5,
        border: '1px solid grey',
        padding: 5,
        borderRadius: 5,
        cursor: 'pointer'
    },
    heading: {
        fontSize: 35,
        fontWeight: 600,
        textAlign: 'center',
        margin: 50
    },
    subHeading: {
        color: 'grey',
        display: 'flex',
        margin: 20,
        [theme.breakpoints.down('sm')]: {
            display: 'block'
        },
        link: {
            textDecoration: 'none',
            color: 'inherit'
        }
    }
}))

const Details = () => {
    const classes = useStyle()
    const [post, setPost] = useState({})
    let { id } = useParams()
    let navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            let data = await getPost(id)
            setPost(data)
        }
        fetchData()
    }, [])

    const deletePost = async () => {
        await deleteBlog(post._id)
        navigate('/')
    }

    return (
        <Box className={classes.container}>
            <img src={post.picture || postImg} alt='post' className={classes.image} />
            <Box className={classes.icons}>
                <Link to={`/update/${post._id}`} className={classes.link}>
                    <EditIcon className={classes.icon} color='primary' />
                </Link>
                <DeleteIcon onClick={() => deletePost()} className={classes.icon} color='error' />
            </Box>

            <Typography className={classes.heading}>{post.title}</Typography>

            <Box className={classes.subHeading}>
                <Link className={classes.link} to={`/?username=${post.username}`} >
                    <Typography >Author: <span style={{ fontWeight: 600 }}>{post.username}</span> </Typography>
                </Link>
                <Typography style={{ marginLeft: 'auto' }}>{new Date(post.date).toLocaleDateString()}</Typography>
            </Box>

            <Typography style={{ margin: 20 }}>{post.description}</Typography>
        </Box>
    )
}

export default Details