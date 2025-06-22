// src/App.js
import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Navbar   from './components/Layout/Navbar';
import Landing  from './components/Layout/Landing';
import Login    from './components/auth/Login';
import Register from './components/auth/Register';
import Alert    from './components/Layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-forms/CreateProfile';
import PrivateRoute from './components/Routing/PrivateRoute';
import EditProfile from './components/profile-forms/EditProfile';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import Profile from './components/profile/Profile';
import Profiles from './components/profiles/Profiles';
import './App.css';

import { Provider }      from 'react-redux';
import store             from './store';
import { loadUser }      from './actions/auth';
import setAuthToken      from './utils/setAuthToken';  // ← import here
 
// If a token exists, set it as a default header for all requests
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

// Layout for inner routes
const ContainerLayout = () => (
  <div className="container" style={{ marginTop: '5rem' }}>
    <Alert />
    <Outlet />
  </div>
);

const App = () => {
  // Dispatch loadUser once on mount
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);  // ← empty array so it only runs once

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />

          <Routes>
            {/* Landing stays full‑width */}
            <Route path="/" element={<Landing />} />

            {/* All other routes use the ContainerLayout wrapper */}
            <Route element={<ContainerLayout />}>
              <Route path="/register" element={<Register />} />
              <Route path="/login"    element={<Login />} />
              <Route path="/profiles"    element={<Profiles />} />
              <Route path="/profile/:id"    element={<Profile />} />
              <Route path="/dashboard" element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } />

              <Route path="/create-profile" element={
                <PrivateRoute>
                  <CreateProfile />
                </PrivateRoute>
              } />

              <Route path="/edit-profile" element={
                <PrivateRoute>
                  <EditProfile />
                </PrivateRoute>
              } />

              <Route path="/add-experience" element={
                <PrivateRoute>
                  <AddExperience />
                </PrivateRoute>
              } />

              <Route path="/add-education" element={
                <PrivateRoute>
                  <AddEducation />
                </PrivateRoute>
              } />
            </Route> 
          </Routes>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
