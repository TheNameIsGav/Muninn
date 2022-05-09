import * as React from "react";
import {useEffect} from 'react';
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import CreateAccount from "./components/CreateAccount/accCreate";
import LoginForm from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import Navbar from "./components/Navbar/Navbar";


function App(){

  useEffect(() => {
    document.title = "Muninn"
  })

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<CreateAccount />} />
                <Route path="login" element={<LoginForm /> }/>
                <Route path="about" element={<About />} />
                <Route path="profile" element={<Profile /> } />
                <Route path="search" element={<Navbar />} />
            </Routes>
        </div>
    )
}
  
  function About() {
    return (
      <>
        document.title = "Muninn"
        <main>
          <h2>Who are we?</h2>
          <p>
            That feels like an existential question, don't you
            think?
          </p>
        </main>
        <nav>
          <Link to="/">Home</Link>
        </nav>
      </>
    );
  }


export default App