import { Box, makeStyles, FormControl, InputBase, Button, TextareaAutosize } from '@material-ui/core'
import UploadFileIcon from '@mui/icons-material/UploadFile';
import image from '../assets/post.jpg'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { createPost, uploadFile } from '../api/Api';

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

const Create = () => {
    const classes = useStyle()
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

    const savePost = async () => {
        await createPost(post)
        navigate('/')
    }

    return (
        <Box className={classes.container}>
            <img src={image} alt='post' className={classes.image} />

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
                <InputBase onChange={(e) => handleChange(e)} placeholder='Title' className={classes.text} name='title' />
                <Button color='primary' variant='contained'
                    onClick={() => savePost()}>Publish</Button>
            </FormControl>

            <TextareaAutosize minRows={5} placeholder='Enter text...' name='description'
                onChange={(e) => handleChange(e)} className={classes.textArea} />
        </Box>
    )
}

export default Create