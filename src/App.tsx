import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Form from './pages/Form';
import End from './pages/End';

function App(){
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/modForm'></Route>
                <Route path='/createQuestion'></Route>
                <Route path='/form' element={<Form />} />
                <Route path='/end' element={<End/>}></Route>
            </Routes>
        </Router>
    )
}
export default App;