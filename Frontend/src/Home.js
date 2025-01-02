
import "./Home.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { auth } from "./firebase";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { signOut } from "firebase/auth";

const GenreButton = ({ genre, selectedGenre, onClick }) => {
  const isSelected = selectedGenre === genre;
  return (
    <div
      className={`genre-button ${isSelected ? "selected" : ""}`}
      onClick={() => onClick(genre)}
    >
      {genre}
    </div>
  );
};

function Home() {
  const [selectedGenre, setSelectedGenre] = useState("");
  const navigate = useNavigate();

  const onSubmit = () => {
    if (!auth.currentUser) {
      alert("You are not logged in. Please login.");
      navigate("/login");
    } else if (!selectedGenre) {
      alert("Please select a Genre");
    } else {
      navigate("/names", { state: { name: selectedGenre } });
    }
  };

  const handleLogOut = async () => {
    try {
      if (window.confirm("Sure you want to Log out?")) {
        await signOut(auth);
      }
    } catch (err) {
      alert("Something went wrong!");
    }
  }

  const genres = ["Fiction", "Horror", "Love", "Suspense", "Drama", "Adventure"];

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">Ebook Generator</h1>
        <div style={{ display: "flex" }}>
          {/* <img src="./menubar.png" alt="Menu" className="menu-icon" /> */}
          <FontAwesomeIcon
            title="Log Out"
            icon={faSignOut}
            size="2x"
            style={{ marginLeft: "30px", cursor: "pointer" }}
            onClick={handleLogOut}
          />
        </div>
      </header>
      <main>
        <h2>Which topic do you want to explore today?</h2>
        <div className="genre-buttons">
          {genres.map((genre) => (
            <GenreButton
              key={genre}
              genre={genre}
              selectedGenre={selectedGenre}
              onClick={setSelectedGenre}
            />
          ))}
          <div className="other-genre">
            <input
              type="text"
              placeholder="Other"
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
            />
          </div>
        </div>
        <button className="submit-button" onClick={onSubmit}>
          Generate Names
        </button>
      </main>
    </div>
  );
}

export default Home;
