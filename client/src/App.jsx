import './App.css'
import { Box } from "@material-ui/core";
import Header from "./components/Header";
import Home from "./components/Home";
import Details from "./components/Details";
import Create from './components/Create';
import Update from './components/Update';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Box style={{ marginTop: 65 }}>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/details/:id' element={<Details />} />
                    <Route path='/create' element={<Create />} />
                    <Route path='/update/:id' element={<Update />} />
                </Routes>
            </Box>
        </BrowserRouter>
    );
}

export default App;