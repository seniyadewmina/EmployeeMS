
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import './App.css'
import EmployeeEdit from './Components/Employee-List/EmployeeEdit'
import EmployeeList from './Components/Employee-List/EmployeeList'
import NavBar from './Components/NavBar/NavBar'
import Register from './Components/Register/Register'
import 'react-toastify/dist/ReactToastify.css';

function App() {
 
  return (
    <>
      <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <NavBar/>
      <Routes>
        <Route path="/Register" element={<Register/>} />
        <Route path="/" element={<EmployeeList/>} />
        <Route path="/Employee/:id" element={<EmployeeEdit/>} />
      </Routes>
      </BrowserRouter>                
   
    </> 
  )
}

export default App
