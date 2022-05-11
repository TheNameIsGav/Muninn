import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const location = useLocation();
  const navigate = useNavigate();

  const [input, setInput] = useState("");
  const [user, setUser] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/api/search_game/" + input)
      .then((res) => res.text())
      .then((text) => {
        try {
          var game = JSON.parse(text);
          navigate("/search", { replace: true, state: { game } });
        } catch (e) {
          setInput("");
          alert("No game found");
        }
      });
  };

  //   const searchItem = (e) => {
  //     e.preventDefault();
  //     console.log("Search for item after enter works");

  //     fetch("/api/search_game/" + searchTerm)
  //       .then((res) => res.text())
  //       .then((text) => {
  //         try {
  //           var val = JSON.parse(text);
  //           setGame(val);
  //         } catch (e) {
  //           alert("That game appears to not exist");
  //         }
  //       });
  //   };

  useEffect(() => {
    if (location.state !== null) {
      setUser(location.state.userVal.username);
    }
  });

  return (
    <div className="topnav">
      <div>
        <nav>
          <Link to="/login"> Logout </Link>
        </nav>
      </div>
      <div>Welcome: {user}</div>
      <div id="search-container">
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
        </form>
      </div>
    </div>
  );
}

export default Profile;
