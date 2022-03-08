import { Grid } from "@material-ui/core"
import { Link, useLocation } from "react-router-dom"
import Post from "./Post"
import { useState, useEffect } from 'react'
import { getAllPosts } from "../api/Api"
import { v4 as uuidv4 } from 'uuid';

const Posts = () => {

    const [posts, setPosts] = useState([])
    let { search } = useLocation()

    useEffect(() => {
        const fetchData = async () => {
            let data = await getAllPosts(search)
            setPosts(data)
        }
        fetchData()
    }, [search])

    return (
        posts.map(post => (
            <Grid key={uuidv4()} item lg={3} sm={4} xs={12}>
                <Link to={`/details/${post._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Post post={post} />
                </Link>
            </Grid>
        ))
    )
}

export default Posts