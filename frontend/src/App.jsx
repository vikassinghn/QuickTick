import React from 'react';
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import Footer from './components/footer/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/signup/Signup';
import Signin from './components/signin/Signin';
import Todo from './components/todo/Todo';

const App = () => {
  return (
    <div id="root">
      <Router>
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/todo" element={<Todo />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/signin" element={<Signin />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
