import './App.css'
import Deposit from './components/Deposit'
import Profile from './components/Profile'
import Transfer from './components/Transfer'
import Withdraw from './components/Withdraw'
import Dashboard from './pages/Dashboard'
import LandingPage from './pages/LandingPage'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';


function App() {

  return (
    <BrowserRouter>
        {/*Navigation */}
        {/* <nav>
          <Link to="/">Signup</Link>
        </nav> */}

        {/*Routes */}
        <Routes>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/signin" element={<Signin/>}/>
          <Route path="/dashboard" element={<Dashboard/>}>
              <Route path="deposit" element={<Deposit/>} />
              <Route path='withdraw' element={<Withdraw/>} />
              <Route path='transfer' element={<Transfer/>}/>
              <Route path='profile' element={<Profile/>}/>
              
          </Route>
          <Route path="/landingpage" element={<LandingPage/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App
