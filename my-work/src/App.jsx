import Home from "./pages/Home";
import Contact from "./pages/Contact"
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

export default function App(){
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/contact-info" element={<Contact />} />
            </Routes>
        </Router>
    )

}