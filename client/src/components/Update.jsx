import UploadFileIcon from '@mui/icons-material/UploadFile';
import postImg from '../assets/post.jpg'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom"
import { getPost, updatePost, uploadFile } from "../api/Api"
import { Box, makeStyles, FormControl, InputBase, Button, TextareaAutosize } from '@material-ui/core'

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
    form: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 10
    },
    text: {
        flex: 1, //fullscreen input
        margin: '0 20px',
        fontSize: 30
    },
    textArea: {
        marginTop: 30,
        width: '100%',
        border: 'none',
        '&:focus-visible': {
            outline: 'none'
        },
        padding: 10,
        fontSize: 15
    }
}))

const initialVal = {
    title: '',
    description: '',
    picture: '',
    username: 'Sarthak',
    categories: 'All',
    date: new Date()
}

const Update = () => {
    const classes = useStyle()
    let { id } = useParams()
    let navigate = useNavigate()
    const [post, setPost] = useState(initialVal)
    const [file, setFile] = useState()

    useEffect(() => {
        const getImg = async () => {
            if (file) {
                console.log(file)
                const data = new FormData()
                data.append('name', file.name)
                data.append('file', file)
                const pic = await uploadFile(data)
                post.picture = pic.data
            }
        }
        getImg()
    }, [file])

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value })
    }

    const updateBlogPost = async () => {
        await updatePost(id, post)
        navigate(`/details/${id}`)
    }

    useEffect(() => {
        const fetchData = async () => {
            let data = await getPost(id)
            setPost(data)
        }
        fetchData()
    }, [id])

    return (
        <Box className={classes.container}>
            <img src={post.picture || postImg} alt='post' className={classes.image} />
            <FormControl className={classes.form}>
                <label htmlFor='fileUpload'>
                    <UploadFileIcon color='action' fontSize='large' />
                </label>
                <input
                    type="file"
                    id="fileUpload"
                    style={{ display: "none" }}
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <InputBase onChange={(e) => handleChange(e)} placeholder='Title' value={post.title} className={classes.text} name='title' />
                <Button onClick={() => updateBlogPost()} color='primary' variant='contained'>Update</Button>
            </FormControl>
            <TextareaAutosize minRows={5} placeholder='Enter text...' className={classes.textArea}
                onChange={(e) => handleChange(e)} value={post.description} name='description' />
        </Box>
    )
}

export default Update