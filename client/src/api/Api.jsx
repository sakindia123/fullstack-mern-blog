import axios from 'axios'
const url = 'http://localhost:5000'

export const createPost = async (post) => {
    try {
        return await axios.post(`${url}/create`, post)
    } catch (err) {
        console.log('Create error:', err)
    }
}

export const getAllPosts = async (param) => {
    try {
        let res = await axios.get(`${url}/posts${param}`)
        return res.data
    } catch (err) {
        console.log('Fetch error:', err)
    }
}

export const getPost = async (id) => {
    try {
        let res = await axios.get(`${url}/post/${id}`)
        return res.data
    } catch (err) {
        console.log('Get post error:', err)
    }
}

export const updatePost = async (id, post) => {
    try {
        return await axios.put(`${url}/update/${id}`, post);
    } catch (err) {
        console.log('Update error:', err)
    }
}

export const deleteBlog = async (id) => {
    try {
        await axios.delete(`${url}/delete/${id}`)
    } catch (err) {
        console.log('Delete error:', err)
    }
}

export const uploadFile = async (post) => {
    try {
        return await axios.post(`${url}/file/upload`, post)
    } catch (error) {
        console.log('Error while calling uploadFile API ', error)
    }
}