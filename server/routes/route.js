import express from 'express'
import { createPost, getAllPosts, getPost, updatePost, deleteBlog, uploadImg, getImg } from '../controllers/post.js'
import upload from '../controllers/upload_util.js'

let router = express.Router()
router.post('/create', createPost)
router.get('/posts', getAllPosts)
router.get('/post/:id', getPost)
router.put('/update/:id', updatePost)
router.delete('/delete/:id', deleteBlog)
router.post('/file/upload', upload.single('file'), uploadImg)
router.get('/file/:filename', getImg)

export default router