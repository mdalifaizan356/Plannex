import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"; 


import Home from './pages/public/Home';
import PublicLayout from './layout/public/PublicLayout';
import SignUp from './pages/auth/SignUp';
import SignIn from './pages/auth/SignIn';
import ForgetPass from './pages/auth/ForgetPass';

import PNF from './pages/auth/PNF';

import DashLayout from './layout/dashboard/DashLayout';
import EditProfile from './pages/dashboard/EditProfile';
import ChangePass from './pages/dashboard/ChangePass';
import ShowBoard from './pages/dashboard/ShowBoard';
import ManageBoard from './pages/dashboard/ManageBoard';




function App() { 
  return (
    <BrowserRouter>
              <Routes>
               <Route path="/" element={<PublicLayout />}>
               <Route index element={<Home />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/signin" element={<SignIn />} />
                  <Route path="/forgetpass" element={<ForgetPass />} />
                  {/* <Route path="/recoverpass" element={<RecoverPass />} /> */}
                </Route>

                {/* <Route path="/dashboard" element={name?<DashLayout />:<SignIn/>}> */}
                <Route path="/dashboard" element={<DashLayout />}>
                  {/* <Route index element={<ShowBoard />} /> */}
                  <Route path="editprofile" element={<EditProfile />} /> 
                  <Route path="changepass" element={<ChangePass />} />
                  <Route path="showboard" element={<ShowBoard />} />
                  <Route path="manageboard/:id" element={<ManageBoard/>} />
                </Route>
                <Route path="*" element={<PNF />} />
              </Routes> 
    </BrowserRouter>
  );
}

export default App;