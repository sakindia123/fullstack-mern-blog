import Categories from "./Categories"
import Hero from "./Hero"
import Posts from "./Posts"
import Grid from '@mui/material/Grid';

const Home = () => {
    return (
        <>
            <Hero />
            <Grid container>
                <Grid item lg={2} xs={12} sm={2}>
                    <Categories />
                </Grid>
                <Grid container item xs={12} sm={10} lg={10}>
                    <Posts />
                </Grid>
            </Grid>
        </>
    )
}

export default Home