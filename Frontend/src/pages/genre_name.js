import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/spinner";
import { auth } from "../firebase";

function MyComponent() {
  const [selectedTitle, setSelectedTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]); 
  const location = useLocation();
  const navigate = useNavigate();
  const genreName = location.state?.name || "";

  const getData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://127.0.0.1:8000/get_genre_name/${genreName}`
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
  }, [genreName]);

  const onSubmit = () => {
    if (!selectedTitle) {
      alert("Please select a title!");
    } else {
      navigate("/chap", { state: { name: selectedTitle } });
    }
  };

  return (
    <div className="container">
      <h1 className="title">Select Your Favorite Title</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="table-container">
          {Array.isArray(data) && data.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Number</th>
                  <th>Title</th>
                  <th>Select</th>
                </tr>
              </thead>
              <tbody>
                {data.map((title, index) => (
                  <tr
                    key={index}
                    className={selectedTitle === title ? "selected" : ""}
                    onClick={() => setSelectedTitle(title)}
                  >
                    <td>{index + 1}</td>
                    <td>{title}</td>
                    <td>
                      {selectedTitle === title ? (
                        <span>Selected</span>
                      ) : (
                        <button>Choose</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
          align-items: center;
          justify-content: center;
          width: 80%;
          text-align: center;
          padding: 20px;
          margin: 0 auto;
        }
        .title {
          font-size: 24px;
          margin-bottom: 20px;
        }
        .table-container {
          width: 100%;
          margin-bottom: 20px;
          overflow-x: auto;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }
        th,
        td {
          padding: 10px;
          text-align: center;
          border: 1px solid #ccc;
        }
        tr:hover {
          background-color: #f0f8ff;
        }
        tr.selected {
          background-color: #2f5233;
          color: #d4ffd9;
        }
        button {
          padding: 8px 16px;
          background-color: #76b947;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .submit-button {
          margin-top: 20px;
        }
      `}</style>
    </div>
  );
}

export default MyComponent;
