import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.min.js"
import {useState,useEffect} from "react"
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import StudentForm from './components/StudentForm'
import Students from './components/Students';
import StudentUpdateForm from './components/StudentUpdateForm';
import PersistLogin from './components/PersistLogin'
import Login from './components/pages/Login'
import SignUp from './components/pages/SignUp'
import Home from './components/pages/Home'
import Error404 from './components/pages/Error404'

function App() {
  

  return (
    <div className="App">
        <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route path={'/'} element={<PersistLogin/>}>
              <Route path={'/students/add/'}  element={<StudentForm/>} />
              <Route path={'/students/'}  element={<Students/>} />
              <Route path={'/students/update/:id/'}  element={<StudentUpdateForm/>} />
              <Route path={'/home/'}  element={<Home/>} />
              <Route path={'/signup/'}  element={<SignUp/>} />
              <Route path={'/login/'}  element={<Login/>} />
            </Route>
            <Route path={'*'}  element={<Error404/>} />
          </Routes>

        </BrowserRouter>
    </div>
  );
}

export default App;
