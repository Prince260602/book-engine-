import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../firebase";

function Chapnos() {
  const [selectedChap, setSelectedGenre] = useState("");
  const [selectedSub, setSelectedSub] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      if (!auth.currentUser) {
        alert("You are not logged in. Please login");
        navigate("/login");
      }
    }, 2000);
  }, []);

  const onSubmit = () => {
    if (!auth.currentUser) {
      alert("You are not logged in. Please login");
      navigate("/login");
    } else if (
      !selectedChap ||
      selectedChap === "" ||
      !selectedSub ||
      selectedSub === ""
    )
      alert("Please enter the number of chapters and subsections");
    else
      navigate("/content", {
        state: {
          name: location.state.name,
          chapterNumber: selectedChap,
          subsectionNumber: selectedSub,
        },
      });
  };
  const location = useLocation();

  return (
    <>
      <div className="div">
        <div className="div-2">
          <div className="div-3">
            <div className="div-4">
              <div className="div-5">
                <div className="column">
                  <div className="div-6" />
                </div>
                <div className="column-2">
                  <div className="div-7">Ebook Generator</div>
                </div>
              </div>
            </div>
            <img loading="lazy" src="./menubar.png" className="img" />
          </div>
          <div className="div-8">
            <input
              className="div-9"
              placeholder="Number of Chapters"
              onChange={(e) => {
                setSelectedGenre(e.target.value);
              }}
            />
          </div>
          <br></br>
          <div className="div-10">
            <input
              className="div-9"
              placeholder="Number of subsections"
              onChange={(e) => {
                setSelectedSub(e.target.value);
              }}
            />
          </div>

          <div className="div-22" onClick={onSubmit}>
            <div className="div-23">
              <p className="button-text">Get Chapters list</p>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .div {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 3%;
          padding-left: 3%;
          padding-right: 3%;
          min-height: 100vh;
          background: linear-gradient(
            108deg,
            rgba(148, 201, 115, 0.1) 0%,
            rgba(177, 216, 183, 0.1) 100%
          );
        }
        .div-2 {
          align-self: stretch;
          display: flex;
          width: 100%;
          flex-direction: column;
          padding: 91px 80px 43px 52px;
        }
        @media {
          .div-2 {
            max-width: 100%;
            padding: 0 20px;
          }
        }
        .div-3 {
          align-self: center;
          display: flex;
          width: 100%;
          max-width: 1762px;
          align-items: flex-start;
          justify-content: space-between;
          gap: 20px;
        }
        @media {
          .div-3 {
            max-width: 100%;
            flex-wrap: wrap;
          }
        }
        .div-4 {
          align-self: stretch;
          flex-grow: 1;
          flex-basis: auto;
        }
        @media {
          .div-4 {
            max-width: 100%;
          }
        }
        .div-5 {
          gap: 20px;
          display: flex;
        }
        @media {
          .div-5 {
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
        .div-6 {
          border-radius: 50%;
          display: flex;
          width: 160px;
          // height: 160px;
          flex-direction: column;
        }
        @media {
          .div-6 {
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
        .div-7 {
          color: #000;
          max-width: 448px;
          margin: auto 0;
          font: 400 50px/100% Inter, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        @media {
          .div-7 {
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
        .div-8 {
          color: #404040;
          //   align-self: center;
          // margin-top: 174px;
          max-width: 1783px;
          font: 500 14px/78% Overpass Mono, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .div-9::placeholder {
          color: #404040;
          font-size: 1.5rem;
        }
        @media {
          .div-8 {
            max-width: 100%;
            font-size: 40px;
            padding: 19px;
            margin-top: 40px;
          }
        }
        .div-9 {
          align-self: center;
          display: flex;
          margin-top: 100px;
          width: 80%;
          max-width: 1589px;
          align-items: flex-start;
          justify-content: space-between;
          gap: 20px;
          padding-bottom: 5px;
          outline: 0;
          background-color: transparent;
          border-bottom: 2px solid #000;
        }
        @media {
          .div-9 {
            max-width: 100%;
            flex-wrap: wrap;
            justify-content: center;
            margin-top: 40px;
          }
        }
        .div-10 {
          color: #404040;
          //   text-align: center;
          align-self: stretch;
          white-space: nowrap;
          justify-content: center;
          align-items: center;
          border-radius: 35px;
          //   background-color: #ebebeb;
          flex: 1;
          padding: 19px 71px;
          font: 500 48px/104% Overpass Mono, -apple-system, Roboto, Helvetica,
            sans-serif;
          cursor: pointer;
        }
        @media {
          .div-10 {
            font-size: 40px;
            white-space: initial;
            padding: 0 20px;
          }
        }
        .div-11 {
          justify-content: center;
          align-items: center;
          border-radius: 35px;
          background-color: #ebebeb;
          display: flex;
          flex-direction: column;
          flex: 1;
          padding: 19px 80px;
          cursor: pointer;
        }
        @media {
          .div-11 {
            padding: 0 20px;
          }
        }
        .div-12 {
          color: #404040;
          text-align: center;
          align-self: center;
          white-space: nowrap;
          font: 500 48px/104% Overpass Mono, -apple-system, Roboto, Helvetica,
            sans-serif;
          cursor: pointer;
        }
        @media {
          .div-12 {
            font-size: 40px;
            white-space: initial;
          }
        }
        .div-13 {
          justify-content: center;
          align-items: center;
          border-radius: 35px;
          background-color: #ebebeb;
          display: flex;
          flex-direction: column;
          flex: 1;
          padding: 19px 80px;
        }
        @media {
          .div-13 {
            padding: 0 20px;
          }
        }
        .div-14 {
          color: #404040;
          text-align: center;
          align-self: center;
          white-space: nowrap;
          font: 500 48px/104% Overpass Mono, -apple-system, Roboto, Helvetica,
            sans-serif;
          cursor: pointer;
        }
        @media {
          .div-14 {
            font-size: 40px;
            white-space: initial;
          }
        }
        .div-15 {
          color: #404040;
          text-align: center;
          align-self: stretch;
          white-space: nowrap;
          justify-content: center;
          align-items: center;
          border-radius: 35px;
          background-color: #ebebeb;
          flex: 1;
          padding: 19px 56px 19px 57px;
          font: 500 48px/104% Overpass Mono, -apple-system, Roboto, Helvetica,
            sans-serif;
          cursor: pointer;
        }
        @media {
          .div-15 {
            font-size: 40px;
            white-space: initial;
            padding: 0 20px;
          }
        }
        .div-16 {
          align-self: center;
          display: flex;
          margin-top: 90px;
          width: 100%;
          max-width: 1218px;
          align-items: flex-start;
          justify-content: space-between;
          gap: 20px;
        }
        .button-text {
          font-size: xx-large;
        }
        @media {
          .div-16 {
            max-width: 100%;
            flex-wrap: wrap;
            justify-content: center;
            margin-top: 40px;
          }
        }
        .div-17 {
          justify-content: center;
          align-items: center;
          border-radius: 35px;
          background-color: #ebebeb;
          display: flex;
          flex-direction: column;
          flex: 1;
          padding: 19px 80px;
        }
        @media {
          .div-17 {
            padding: 0 20px;
          }
        }
        .div-18 {
          color: #404040;
          text-align: center;
          align-self: center;
          white-space: nowrap;

          font: 500 48px/104% Overpass Mono, -apple-system, Roboto, Helvetica,
            sans-serif;
          cursor: pointer;
        }
        @media {
          .div-18 {
            font-size: 40px;
            white-space: initial;
          }
        }
        .div-19 {
          color: #404040;
          text-align: center;
          align-self: stretch;
          white-space: nowrap;
          justify-content: center;
          align-items: center;
          border-radius: 35px;
          background-color: #ebebeb;
          flex: 1;
          padding: 19px 41px 19px 42px;
          font: 500 48px/104% Overpass Mono, -apple-system, Roboto, Helvetica,
            sans-serif;
          cursor: pointer;
        }
        @media {
          .div-19 {
            font-size: 40px;
            white-space: initial;
            padding: 0 20px;
          }
        }
        .div-20 {
          justify-content: center;
          align-items: center;
          border-radius: 35px;
          // background-color:#ebebeb;
          display: flex;
          flex-direction: column;
          flex: 1;
          padding: 19px 80px;
        }
        @media {
          .div-20 {
            padding: 0 20px;
          }
        }
        .div-21 {
          color: #404040;
          background-color: #ebebeb;
          text-align: center;
          align-self: center;
          white-space: nowrap;
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
        .div-22 {
          justify-content: center;
          align-items: center;
          border-radius: 35px;
          background-color: #76b947;
          align-self: center;
          display: flex;
          margin-top: 111px;
          width: 100%;
          max-width: 1589px;
          flex-direction: column;
          padding: 19px 80px;
          cursor: pointer;
        }
        @media {
          .div-22 {
            max-width: 100%;
            margin-top: 40px;
            padding: 0 20px;
          }
        }
        .div-23 {
          display: flex;
          width: 50%;
          align-items: center;
          justify-content: center;
          height: 65px;
        }
        @media {
          .div-23 {
            flex-wrap: wrap;
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

export default Chapnos;
