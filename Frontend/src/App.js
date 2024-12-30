
import "./App.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../src/firebase";

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

function App() {
  const [selectedGenre, setSelectedGenre] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.currentUser) {
      alert("You are not logged in. Please login.");
      navigate("/login");
    }
  }, [navigate]);

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

  const genres = ["Fiction", "Horror", "Love", "Suspense", "Drama", "Adventure"];

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">Ebook Generator</h1>
        <img src="./menubar.png" alt="Menu" className="menu-icon" />
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

export default App;
