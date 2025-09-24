import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Form from './pages/Form';
import End from './pages/End';
import ModifyForm from './pages/ModifyForm';
import CreateQuestion from './pages/CreateQuestion';
import UpdateQuestion from './pages/UpdateQuestion';

function App(){
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/modifyForm' element={<ModifyForm />}></Route>
                <Route path='/createQuestion' element={<CreateQuestion/>} ></Route>
                <Route path='/updateQuestion' element={<UpdateQuestion/>} ></Route>
                <Route path='/form' element={<Form />} />
                <Route path='/end' element={<End/>}></Route>
            </Routes>
        </Router>
    )
}
export default App;