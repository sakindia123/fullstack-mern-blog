import { Table, TableBody, TableCell, TableHead, makeStyles, TableRow } from '@material-ui/core';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom"
import { v4 as uuidv4 } from 'uuid';

const useStyle = makeStyles({
    table: {
        border: '1px solid rgba(224, 224, 224, 1)'
    },
    write: {
        margin: 20,
        width: '90%',
        background: '#6495ED',
        color: '#fff',
        textDecoration: 'none'
    },
    link: {
        textDecoration: 'none',
        color: 'inherit'
    }
})

const categories = [
    'Music',
    'Movies',
    'Sports',
    'Tech',
    'Cars'
]

const Categories = () => {
    const classes = useStyle();
    return (
        <>
            <Link to='/create' className={classes.link}>
                <Button style={{ margin: 10 }} variant="contained" className={classes.write}>New Post</Button>
            </Link>

            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Link to={"/"} className={classes.link}>
                                All Categories
                            </Link>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody >
                    {categories.map(category => (
                        <TableRow key={uuidv4()}>
                            <TableCell>
                                <Link to={`/?categories=${category}`} className={classes.link}>
                                    {category}
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}

export default Categories