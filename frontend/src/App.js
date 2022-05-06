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


// function App(){

//     // const [user, setUser] = useState({name:"", email:""});
//     // const [error, setError] = useState("");

//     // const Login = details => {
//     //     setUser({
//     //         name: details.name, 
//     //         email: details.email
//     //     });
//     // }

//     // const Logout = () => {
//     //     setUser({name:"", email:""})
//     // }

//     return(
//         <>
//         <Navbar/>
//         {/* <Searchbar/> */}
//         {/* <div className='App'>
//             {(user.email !== "")? (
//                 <div className="welcome">
//                     <h2> Welcome <span>{user.name}</span></h2>
//                     <button onClick={Logout}> Logout </button>
//                 </div>
//             ):(
//                 <LoginForm Login={Login} error={error}/>
//             )}
//         </div> */}
//         </>
//     );
// }

export default App