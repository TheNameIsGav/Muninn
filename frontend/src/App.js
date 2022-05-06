import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import CreateAccount from "./components/CreateAccount/accCreate";


function App(){
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<CreateAccount />} />
                <Route path="about" element={<About />} />
            </Routes>
        </div>
    )
}

function Home() {
    return (
      <>
        <main>
          <h2>Welcome to the homepage!</h2>
          <p>You can do this, I believe in you.</p>
        </main>
        <nav>
          <Link to="/about">About</Link>
        </nav>
      </>
    );
  }
  
  function About() {
    return (
      <>
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