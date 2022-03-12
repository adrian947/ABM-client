
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SignIn } from "../pages/auth/SignIn";
import AuthLayout from './../Layout/AuthLayout';
import { Register } from './../pages/auth/Register';
import { GridMovements } from '../pages/GridMovements';
import { PrivateRoute } from './../Layout/PrivateRoute';


const RoutesAPP = () => {
  return (
    <Router>
      <Routes> 
      <Route path='/' element={<AuthLayout />} >
      <Route index element={<SignIn />} />
      <Route path='register' element={<Register />} />




      </Route>       
        <Route path='/' element={<PrivateRoute />} >
          <Route path='/movements' element={<GridMovements />} />
        </Route>
        
      </Routes>
    </Router>
  );
};

export default RoutesAPP;
