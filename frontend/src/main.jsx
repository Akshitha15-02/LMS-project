import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import CreateCourse from './pages/CreateCourse'
import CoursePage from './pages/CoursePage'
import Login from './pages/Login'
import Register from './pages/Register'
import './styles.css'

function Header(){
  const token = localStorage.getItem('token');
  const name = localStorage.getItem('name');
  const logout = ()=> {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    window.location.href = '/';
  };
  return (
    <header className="site-header">
      <div className="container">
        <h1><Link to="/">ModernLMS</Link></h1>
        <nav>
          <Link to="/create">Create Course</Link>
          {!token ? <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </> : <>
            <span className="muted">Hi, {name}</span>
            <button onClick={logout} className="btn small">Logout</button>
          </>}
        </nav>
      </div>
    </header>
  )
}

function App(){
  return (
    <BrowserRouter>
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateCourse />} />
          <Route path="/course/:id" element={<CoursePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')).render(<App />);
