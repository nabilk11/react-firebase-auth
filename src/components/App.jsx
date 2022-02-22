import Signup from "./Signup";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap'
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from "./Dashboard";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import Home from "./Home";
import ForgotPassword from "./ForgotPassword";


function App() {
 
  return (
    <AuthProvider>
      <Container className='d-flex align-items-center justify-content-center'
      style={{ minHeight: "100vh"}} >
      <div className="w-100" style={{ maxWidth: "400px"}}>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/dashboard" element={<Dashboard/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </Router>
      </div>
      </Container>
    </AuthProvider>
  );
}

export default App;
