// src/App.js
import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Navbar   from './components/Layout/Navbar';
import Landing  from './components/Layout/Landing';
import Login    from './components/auth/Login';
import Register from './components/auth/Register';
import Alert    from './components/Layout/Alert';
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
            </Route>
          </Routes>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
