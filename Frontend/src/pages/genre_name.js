
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/spinner";
import { auth } from "../firebase";

function MyComponent() {
  const [selectedtitle, setSelectedtitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]); // Data will hold titles
  const location = useLocation();
  const navigate = useNavigate();
  const genre_name = location.state?.name || "";

  const getData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://127.0.0.1:8000/get_genre_name/${genre_name}`
      );
      console.log("API response:", response.data);

      if (response && response.data) {
        const ebookTitles = response.data.ebook_titles;

        if (Array.isArray(ebookTitles)) {
          setData(ebookTitles);
        } else if (typeof ebookTitles === "object" && ebookTitles !== null) {
          setData(Object.values(ebookTitles));
          console.warn("ebook_titles was an object, converted to array.");
        } else if (typeof ebookTitles === "string") {
          setData([ebookTitles]);
          console.warn("ebook_titles was a string, wrapped in an array.");
        } else {
          console.error("Unexpected data type for ebook_titles:", typeof ebookTitles);
          setData([]);
        }
      } else {
        console.error("No data found in API response.");
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!auth.currentUser) {
      alert("You are not logged in. Please login");
      navigate("/login");
    } else {
      getData();
    }
  }, [genre_name]);

  const onSubmit = () => {
    if (!selectedtitle) {
      alert("Please select a card!");
    } else {
      navigate("/chap", { state: { name: selectedtitle } });
    }
  };

  return (
    <div className="container">
      <h1 className="title">Select Your Favorite Name</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="cards-container">
          {/* Render one card per title */}
          {Array.isArray(data) && data.length > 0 ? (
            data.map((title, index) => (
              <div
                key={index}
                className={`card ${selectedtitle === title ? "selected" : ""}`}
                onClick={() => setSelectedtitle(title)}
              >
                <h2>{title}</h2>
              </div>
            ))
          ) : (
            <p>No titles available.</p>
          )}
        </div>
      )}
      <button className="submit-button center" onClick={onSubmit}>
        Let’s select chapters
      </button>
      <style jsx>{`
  .container {
    display: flex;
    flex-direction: column;
    align-items: center; /* Centers children horizontally */
    justify-content: center; /* Centers children vertically */
    width: 80%;
    text-align: center;
    padding: 20px;
    margin: 0 auto; /* Centers the container on the page */
  }
  .title {
    font-size: 24px;
    margin-bottom: 20px;
  }
  .cards-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 20px;
    width: 100%; /* Ensures the grid stretches within the container */
    justify-content: center; /* Centers grid items */
    margin-bottom: 20px;
  }
  .card {
    width: 80%;
    margin-left: 10%;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #fff;
    cursor: pointer;
    transition: transform 0.3s, background-color 0.3s;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    text-align: center; /* Centers card content */
  }
  .card:hover {
    transform: scale(1.03);
    background-color: #f0f8ff;
  }
  .card.selected {
    background-color: #2f5233;
    color: #d4ffd9;
    transform: scale(1.05);
  }
  .submit-button {
    padding: 10px 20px;
    background-color: #76b947;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    margin-top: 20px; /* Adds space between cards and button */
  }
`}</style>

    </div>
  );
}

export default MyComponent;
