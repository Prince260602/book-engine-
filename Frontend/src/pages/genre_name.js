import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/spinner";
import axios from "axios";
import databaseapi from "../api/databaseapi";
import { auth } from "../firebase";
function MyComponent() {
  const [selectedtitle, setSelectedtitle] = useState("");
  const [names, setNames] = useState(["", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  console.log(location);
  const genre_name = location.state.name;
  // const api_genre="/get_genre_name/funny"
  const getData = async () => {
    const response = await databaseapi.get(`/get_genre_name/${genre_name}`);
    // const response1 = await fetch('http://127.0.0.1:8000/get_genre_name/funny');
    // const resp = await response.json();
    // const response="sample"
    console.log("response ", response);
    console.log("response.data==", response.data.ebook_titles);
    // parse response to create an array
    let resp = response.data.ebook_titles;
    console.log("type = ", typeof resp);
    // respParse=JSON.parse("[" +response.data.ebook_titles+ "]");
    // respParse = JSON.parse(response.data.ebook_titles);
    var myArr = String(resp)
      .split()
      .map((resp) => {
        return String(resp);
      });
    console.log("array= ", myArr);
    let respArr = resp.split("\n");
    respArr = respArr
      .filter((item) => item.trim() !== "")
      .map((item) => item.replace(/^\d+\.\s*"([^"]*)"\s*$/, "$1").trim());
    console.log("respArr  = ", respArr);
    setNames(respArr);
    // var newArray = [response.data[0]]
    // console.log("array = ",{newArray})
    // setNames(newArray);
    setLoading(false);
  };

  useEffect(() => {
    // Need to call API here and get the names from the backend;
    setTimeout(() => {
      if (!auth.currentUser) {
        alert("You are not logged in. Please login");
        navigate("/login");
      } else {
        getData();
      }
    }, 2000);
    setLoading(true);
    // setNames([
    //   "A roadway to Mars",
    //   "A roadway to Mars 2",
    //   "A roadway to Mars 3",
    //   "A roadway to Mars 4",
    //   "A roadway to Mars 5",
    // ]);
  }, []);

  const navigate = useNavigate();

  const onSubmit = () => {
    console.log(selectedtitle);
    // navigate("/names",selectedGenre)
    if (!auth.currentUser) {
      alert("You are not logged in. Please login");
      navigate("/login");
    } else if (!selectedtitle) alert("Please select or input your book title!");
    else navigate("/chap", { state: { name: selectedtitle } });
  };

  return (
    <>
      <div className="div">
        <div className="div-2">
          <div className="div-3">
            <div className="div-4">
              <div className="column">
                <div className="div-5" />
              </div>
              <div className="column-2">
                <div className="div-6">Ebook Generator</div>
              </div>
            </div>
          </div>
          <img loading="lazy" src="./menubar.png" className="img" />
        </div>
        <div className="variable">
          <div className="div-7">Select your favourite name:</div>
          {loading ? (
            <div>
              <Spinner />
            </div>
          ) : (
            <>
              <div
                className="div-8 button"
                onClick={() => setSelectedtitle(names[0])}
                style={{
                  backgroundColor: selectedtitle == names[0] ? "#2F5233" : "",
                  color: selectedtitle === names[0] ? "#D4FFD9" : "",
                }}
              >
                {names[0]}
              </div>
              <div
                className="div-9 button"
                onClick={() => setSelectedtitle(names[1])}
                style={{
                  backgroundColor: selectedtitle == names[1] ? "#2F5233" : "",
                  color: selectedtitle === names[1] ? "#D4FFD9" : "",
                }}
              >
                {names[1]}
              </div>
              <div
                className="div-10 button"
                onClick={() => setSelectedtitle(names[2])}
                style={{
                  backgroundColor: selectedtitle == names[2] ? "#2F5233" : "",
                  color: selectedtitle === names[2] ? "#D4FFD9" : "",
                }}
              >
                {names[2]}
              </div>
              <div
                className="div-11 button"
                onClick={() => setSelectedtitle(names[3])}
                style={{
                  backgroundColor: selectedtitle == names[3] ? "#2F5233" : "",
                  color: selectedtitle === names[3] ? "#D4FFD9" : "",
                }}
              >
                {names[3]}
              </div>
              <div
                className="div-12 button"
                onClick={() => setSelectedtitle(names[4])}
                style={{
                  backgroundColor: selectedtitle == names[4] ? "#2F5233" : "",
                  color: selectedtitle === names[4] ? "#D4FFD9" : "",
                }}
              >
                {names[4]}
              </div>
              <div
                className="div-20 button"
                style={{
                  backgroundColor:
                    !names.includes(selectedtitle) && selectedtitle !== ""
                      ? "#2F5233"
                      : "",
                  color:
                    !names.includes(selectedtitle) && selectedtitle !== ""
                      ? "#D4FFD9"
                      : "",
                  marginTop: "25px",
                }}
              >
                <input
                  className="div-21 button"
                  style={{
                    backgroundColor:
                      !names.includes(selectedtitle) && selectedtitle !== ""
                        ? "#2F5233"
                        : "",
                    color:
                      !names.includes(selectedtitle) && selectedtitle !== ""
                        ? "#D4FFD9"
                        : "",
                  }}
                  onChange={(e) => setSelectedtitle(e.target.value)}
                  placeholder="Other"
                />
              </div>
            </>
          )}
        </div>

        <div className="div-14">
          <div className="div-15" onClick={onSubmit}>
            <div className="div-16">Let’s select chapters</div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .div {
          min-height: 100vh;
          background: linear-gradient(
            108deg,
            rgba(148, 201, 115, 0.1) 0%,
            rgba(177, 216, 183, 0.1) 100%
          );
          display: flex;
          flex-direction: column;
          padding-top: 3%;
          padding-left: 3%;
          padding-right: 3%;
        }
        .div-2 {
          align-self: center;
          display: flex;
          // margin-top: 91px;
          margin-bottom: 2%;
          width: 100%;
          max-width: 1762px;
          align-items: flex-start;
          justify-content: space-between;
          gap: 20px;
        }
        @media {
          .div-2 {
            max-width: 100%;
            flex-wrap: wrap;
            // margin-top: 40px;
          }
        }
        .div-3 {
          align-self: stretch;
          flex-grow: 1;
          flex-basis: auto;
        }
        @media {
          .div-3 {
            max-width: 100%;
          }
        }
        .div-4 {
          gap: 20px;
          display: flex;
        }
        @media {
          .div-4 {
            flex-direction: column;
            align-items: stretch;
            gap: 0px;
          }
        }
        .column {
          display: flex;
          flex-direction: column;
          line-height: normal;
          width: 33%;
          margin-left: 0px;
        }
        @media {
          .column {
            width: 100%;
          }
        }
        .div-5 {
          border-radius: 50%;
          display: flex;
          width: 160px;
          // height: 160px;
          flex-direction: column;
        }
        @media {
          .div-5 {
            // margin-top: 38px;
          }
        }
        .column-2 {
          display: flex;
          flex-direction: column;
          line-height: normal;
          width: 67%;
          margin-left: 20px;
        }
        @media {
          .column-2 {
            width: 100%;
          }
        }
        .div-6 {
          color: #000;
          max-width: 448px;
          margin: auto 0;
          font: 400 50px/100% Inter, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        @media {
          .div-6 {
            // margin-top: 40px;
            font-size: 40px;
          }
        }
        .img {
          aspect-ratio: 1.7;
          object-fit: contain;
          object-position: center;
          width: 75px;
          overflow: hidden;
          align-self: center;
          max-width: 100%;
          margin: auto 0;
        }
        .div-7 {
          color: #000;
          align-self: start;
          width: 100vw;
          margin-bottom: 2%;
          font: 500 64px/78% Overpass Mono, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .button {
          height: 60px;
          align-items: center;
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
        }
        @media {
          .div-7 {
            max-width: 100%;
            font-size: 40px;
            margin-top: 40px;
          }
        }
        .div-8 {
          color: #404040;
          align-self: center;
          max-width: 1659px;
          border-radius: 35px;
          background-color: #ebebeb;
          margin-top: 35px;
          width: 100%;
          font: 500 30px/104% Overpass Mono, -apple-system, Roboto, Helvetica,
            sans-serif;
          cursor: pointer;
        }
        @media {
          .div-8 {
            max-width: 100%;
            font-size: 40px;
            padding: 0 20px;
          }
        }
        .div-9 {
          color: #404040;
          align-self: center;
          max-width: 1659px;
          border-radius: 35px;
          background-color: #ebebeb;
          margin-top: 23px;
          width: 100%;
          font: 500 30px/104% Overpass Mono, -apple-system, Roboto, Helvetica,
            sans-serif;
          cursor: pointer;
        }
        @media {
          .div-9 {
            max-width: 100%;
            font-size: 40px;
            padding: 0 20px;
          }
        }
        .div-10 {
          color: #404040;
          align-self: center;
          max-width: 1659px;
          border-radius: 35px;
          background-color: #ebebeb;
          margin-top: 23px;
          width: 100%;
          font: 500 30px/104% Overpass Mono, -apple-system, Roboto, Helvetica,
            sans-serif;
          cursor: pointer;
        }
        @media {
          .div-10 {
            max-width: 100%;
            font-size: 40px;
            padding: 0 20px;
          }
        }
        .div-11 {
          color: #404040;
          align-self: center;
          max-width: 1659px;
          border-radius: 35px;
          background-color: #ebebeb;
          margin-top: 23px;
          width: 100%;
          font: 500 30px/104% Overpass Mono, -apple-system, Roboto, Helvetica,
            sans-serif;
          cursor: pointer;
        }
        @media {
          .div-11 {
            max-width: 100%;
            font-size: 40px;
            padding: 0 20px;
          }
        }
        .div-12 {
          color: #404040;
          align-self: center;
          max-width: 1659px;
          border-radius: 35px;
          background-color: #ebebeb;
          margin-top: 23px;
          width: 100%;
          font: 500 30px/104% Overpass Mono, -apple-system, Roboto, Helvetica,
            sans-serif;
          cursor: pointer;
        }
        @media {
          .div-12 {
            max-width: 100%;
            font-size: 40px;
            padding: 0 20px;
          }
        }
        .div-13 {
          color: #404040;
          align-self: center;
          max-width: 1659px;
          border-radius: 35px;
          background-color: #ebebeb;
          width: 100%;
          font: 500 48px/104% Overpass Mono, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .div-13::placeholder {
          color: #404040;
        }
        @media {
          .div-13 {
            max-width: 100%;
            font-size: 40px;
            padding: 0 20px;
          }
        }
        .div-14 {
          border-radius: 35px;
          background-color: #76b947;
          align-self: center;
          display: flex;
          width: 100%;
          max-width: 1589px;
          flex-direction: column;
        }
        @media {
          .div-14 {
            max-width: 100%;
            margin: 40px 0;
            padding: 0 20px;
          }
        }
        .div-15 {
          align-self: center;
          display: flex;
          width: 778px;
          max-width: 100%;
          align-items: flex-start;
          justify-content: space-between;
          height: 60px;
          align-items: center;
          display: flex;
          justify-content: center;
          cursor: pointer;
        }
        @media {
          .div-15 {
            flex-wrap: wrap;
          }
        }
        .div-16 {
          justify-content: center;
          align-items: center;
          display: flex;
          color: #094000;
          text-align: center;
          align-self: stretch;
          flex-grow: 1;
          flex-basis: auto;
          font: 500 48px/104% Overpass Mono, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        @media {
          .div-16 {
            max-width: 100%;
            font-size: 40px;
          }
        }
        .div-20 {
          // align-items: center;
          border-radius: 35px;
          background-color: #ebebeb;
          display: flex;
          flex: 1;
        }
        .div-21 {
          color: #404040;
          background-color: #ebebeb;
          //text-align: center;
          white-space: nowrap;
          border-radius: 35px;
          padding-left: 15px;
          font: 500 48px/104% Overpass Mono, -apple-system, Roboto, Helvetica,
            sans-serif;
          outline: 0;
        }
        .div-21::placeholder {
          color: #404040;
        }

        @media {
          .div-21 {
            font-size: 40px;
            white-space: initial;
          }
        }
        .img-2 {
          aspect-ratio: 5.36;
          object-fit: contain;
          object-position: center;
          width: 118px;
          stroke-width: 3px;
          stroke: #094000;
          overflow: hidden;
          align-self: center;
          max-width: 100%;
          margin: auto 0;
        }
      `}</style>
    </>
  );
}

export default MyComponent;
