import Grid from 'gridfs-stream'
import mongoose from 'mongoose'
import postModel from '../models/postSchema.js'
const url = 'http://localhost:5000'

export const createPost = async (req, res) => {
    let post = new postModel(req.body)
    try {
        await post.save()
        res.status(200).res('blog post saved!')
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const getAllPosts = async (req, res) => {
    let author = req.query.username //for search
    let category = req.query.categories
    try {
        if (author)
            var posts = await postModel.find({ username: author })//obj:variable
        else if (category)
            var posts = await postModel.find({ categories: category })
        else
            var posts = await postModel.find({})
        res.status(200).json(posts)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const getPost = async (req, res) => {
    try {
        let post = await postModel.findById(req.params.id)
        res.status(200).json(post)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const updatePost = async (req, res) => {
    try {
        await postModel.findByIdAndUpdate(req.params.id, { $set: req.body })
        res.status(200).res('Post updated!')
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const deleteBlog = async (req, res) => {
    const id = req.params.id
    try {
        await postModel.findByIdAndRemove(id).exec()
        res.status(200).res('Deleted!')
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const uploadImg = async (req, res) => {
    try {
        if (!req.file)
            return res.status(404).json('Image not found')
        const imgUrl = `${url}/file/${req.file.filename}`
        res.status(200).json(imgUrl)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

let gfs, gridFSBucket;
const conn = mongoose.connection;
conn.once('open', () => {
    gridFSBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'fs'
    });
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('fs');
})

export const getImg = async (request, response) => {
    try {
        const file = await gfs.files.findOne({ filename: request.params.filename });
        const readStream = gridFSBucket.openDownloadStream(file._id);
        readStream.pipe(response);
    } catch (err) {
        response.status(500).json({ error: err.message })
    }
}