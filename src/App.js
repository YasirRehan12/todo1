import React, { useEffect } from 'react';
import Navbar from './components/navbar/Navbar.jsx';
import Home from './components/home/Home.jsx';
import Footer from './components/footer/Footer.jsx';
import About from './components/about/About.jsx';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Signup from './components/signup/Signup.jsx';
import Signin from './components/signin/Signin.jsx';
import Todo from './components/todo/Todo.jsx';
import { useDispatch } from 'react-redux';
import { authActions } from './store/index.js';




export const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const id = sessionStorage.getItem("id");
    if (id) {

      dispatch(authActions.login())
    }

  }, [])
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/todo' element={<Todo />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />

          {/* <Route  path='/signin' element={<About/>}/> */}

        </Routes>
      </Router>

      <Footer />
    </div>
  )
}

export default App