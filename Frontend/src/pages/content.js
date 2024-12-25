import React, { useState, useEffect } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "../components/spinner";
import databaseapi from "../api/databaseapi";
import { auth } from "../firebase";

function Content(props) {
  const location = useLocation();
  const navigate = useNavigate();

  const [tableHeaders, setTableHeaders] = useState(["S.No", "Chapter List"]);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);

  //api function
  const getData = async () => {
    const reqData = {
      ebook_name: location.state.name,
      chap_nos: location.state.chapterNumber,
      subno: location.state.subsectionNumber,
    };
    const response = await databaseapi.put("/get_content", reqData);
    console.log("contents resp = ", response.data.contents);
    setTableData(response.data.contents);
    setLoading(false);
    return;
  };

  useEffect(() => {
    // Load Data from backend here
    setTimeout(() => {
      if (!auth.currentUser) {
        alert("You are not logged in. Please login");
        navigate("/login");
      } else {
        getData();
      }
    }, 2000);
    setLoading(true);

    // setTableData([
    //   [1, "chapter", "Chapter 1"],
    //   [2, "subsection", "Subsection 1"],
    //   [3, "subsection", "Subsection 2"],
    //   [4, "subsection", "Subsection 3"],
    //   [5, "chapter", "Chapter 2"],
    //   [6, "subsection", "Subsection 1"],
    //   [7, "subsection", "Subsection 2"],
    //   [8, "subsection", "Subsection 3"],
    // ]);
  }, []);

  const onSubmit = () => {
    if (!auth.currentUser) {
      alert("You are not logged in. Please login");
      navigate("/login");
    } else {
      navigate("/output", {
        state: {
          name: location.state?.name,
          chapterNumber: location.state?.chapterNumber,
          subsectionNumber: location.state?.subsectionNumber,
          contents: tableData,
        },
      });
    }
  };

  return (
    <>
      <div className="div">
        <div className="div-2">
          <div className="div-3">
            <div className="div-4">
              <div className="column-2">
                <div className="div-6">Ebook Generator</div>
              </div>
            </div>
          </div>
          <img loading="lazy" src="./menubar.png" className="img" />
        </div>
        <div className="div-7">
          <div className="div-8">
            <div className="column-3">
              <div className="div-9">
                <div className="div-10">NUMBER OF CHAPTERS: </div>
                <div className="div-11">{location?.state?.chapterNumber}</div>
              </div>
            </div>
            <div className="column-4">
              <div className="div-12">
                <div className="div-13">NUMBER OF SUBSECTIONS: </div>
                <div className="div-14">
                  {location?.state?.subsectionNumber}
                </div>
              </div>
            </div>
            <div className="column-5">
              <div className="div-15">
                <img loading="lazy" src="./edit.png" className="img-2" />
                <div className="div-16">Edit</div>
              </div>
            </div>
          </div>
        </div>
        {loading ? (
          <div>
            <Spinner />
          </div>
        ) : (
          <table className="table">
            <thead className="table-headers">
              <th className="table-sno-header">{tableHeaders[0]}</th>
              <th className="table-chapter-header">{tableHeaders[1]}</th>
            </thead>
            <tbody className="table-body">
              {tableData.map((data) => {
                return (
                  <tr className="table-row">
                    <td className="table-row-sno">{data[0]}</td>
                    <td
                      className={
                        data[1] === "chapter"
                          ? "table-row-chapter"
                          : "table-row-subsection"
                      }
                    >
                      {data[2]}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        <div className="div-62" onClick={onSubmit}>
          <div className="div-63">
            <div className="div-64">Generate Content</div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .div {
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
          min-height: 100vh;
        }
        .div-2 {
          //   align-self: center;
          display: flex;
          width: 100%;
          margin-bottom: 3%;
          max-width: 1762px;
          //   align-items: flex-start;
          justify-content: space-between;
          gap: 20px;
        }
        @media (max-width: 991px) {
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
        @media (max-width: 991px) {
          .div-3 {
            max-width: 100%;
          }
        }
        .div-4 {
          //   gap: 20px;
          display: flex;
        }
        @media (max-width: 991px) {
          .div-4 {
            flex-direction: column;
            align-items: stretch;
            gap: 0px;
          }
        }
        .column {
          display: flex;
          flex-direction: column;
          //   line-height: normal;
          width: 33%;
          margin-left: 0px;
        }
        @media (max-width: 991px) {
          .column {
            width: 100%;
          }
        }
        .div-5 {
          border-radius: 50%;
          display: flex;
          width: 160px;
          //   height: 160px;
          flex-direction: column;
        }
        @media (max-width: 991px) {
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
        @media (max-width: 991px) {
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
        @media (max-width: 991px) {
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
          border-radius: 20px;
          background-color: #b1d8b7;
          align-self: center;
          //   margin-top: 36px;
          width: 100%;
          max-width: 1648px;
          padding: 20px;
        }
        @media (max-width: 991px) {
          .div-7 {
            max-width: 100%;
            // padding-right: 20px;
          }
        }
        .div-8 {
          gap: 20px;
          display: flex;
        }
        @media (max-width: 991px) {
          .div-8 {
            flex-direction: column;
            align-items: stretch;
            gap: 0px;
          }
        }
        .column-3 {
          display: flex;
          flex-direction: column;
          line-height: normal;
          width: 36%;
          margin-left: 0px;
        }
        @media (max-width: 991px) {
          .column-3 {
            width: 100%;
          }
        }
        .div-9 {
          display: flex;
          width: 100%;
          max-width: 425px;
          align-items: flex-start;
          gap: 20px;
          margin: auto 0;
        }
        @media (max-width: 991px) {
          .div-9 {
            max-width: 100%;
            margin-top: 32px;
            flex-wrap: wrap;
          }
        }
        .div-10 {
          justify-content: center;
          color: #094000;
          align-self: start;
          font: 500 24px/156% Overpass Mono, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .div-11 {
          justify-content: center;
          color: #094000;
          text-decoration-line: underline;
          align-self: start;
          font: 500 24px/156% Overpass Mono, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .column-4 {
          display: flex;
          flex-direction: column;
          line-height: normal;
          width: 55%;
          margin-left: 20px;
        }
        @media (max-width: 991px) {
          .column-4 {
            width: 100%;
          }
        }
        .div-12 {
          display: flex;
          align-items: flex-start;
          margin: auto 0;
        }
        @media (max-width: 991px) {
          .div-12 {
            max-width: 100%;
            margin-top: 32px;
            flex-wrap: wrap;
          }
        }
        .div-13 {
          justify-content: center;
          color: #094000;
          align-self: start;
          font: 500 24px/156% Overpass Mono, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        @media (max-width: 991px) {
          .div-13 {
            max-width: 100%;
          }
        }
        .div-14 {
          justify-content: center;
          color: #094000;
          text-decoration-line: underline;
          align-self: start;
          margin-left: 2%;
          align-items: center;
          font: 500 24px/156% Overpass Mono, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .column-5 {
          display: flex;
          flex-direction: column;
          line-height: normal;
          width: 9%;
          margin-left: 20px;
        }
        @media (max-width: 991px) {
          .column-5 {
            width: 100%;
          }
        }
        .div-15 {
          display: flex;
          align-items: flex-start;
          gap: 13px;
          cursor: pointer;
        }
        @media (max-width: 991px) {
          .div-15 {
            margin-top: 40px;
          }
        }
        .img-2 {
          aspect-ratio: 1;
          object-fit: contain;
          object-position: center;
          width: 24px;
          overflow: hidden;
          align-self: stretch;
          max-width: 100%;
        }
        .div-16 {
          justify-content: center;
          color: #094000;
          align-self: center;
          margin: auto 0;
          font: 500 24px/156% Overpass Mono, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .div-17 {
          border: 1px solid #094000;
          background-color: #fff;
          align-self: center;
          display: flex;
          margin-top: 54px;
          width: 100%;
          max-width: 1648px;
          padding-bottom: 29px;
          flex-direction: column;
        }
        @media (max-width: 991px) {
          .div-17 {
            max-width: 100%;
            margin-top: 40px;
          }
        }
        .div-18 {
          border: 1px solid #094000;
          background-color: #76b947;
          align-self: center;
          display: flex;
          width: 100%;
          align-items: flex-start;
          justify-content: space-between;
          gap: 20px;
          padding: 14px 29px 14px 26px;
        }
        @media (max-width: 991px) {
          .div-18 {
            max-width: 100%;
            flex-wrap: wrap;
            justify-content: center;
            padding: 0 20px;
          }
        }
        .div-19 {
          justify-content: center;
          color: #fff;
          text-align: center;
          font: 500 30px/167% Overpass Mono, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .div-20 {
          justify-content: center;
          color: #fff;
          text-align: center;
          align-self: center;
          flex-grow: 1;
          flex-basis: auto;
          margin: auto 0;
          font: 500 30px/167% Overpass Mono, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .img-3 {
          aspect-ratio: 1;
          object-fit: contain;
          object-position: center;
          width: 40px;
          overflow: hidden;
          align-self: stretch;
          max-width: 100%;
        }
        .div-21 {
          align-self: start;
          display: flex;
          width: 301px;
          max-width: 100%;
          align-items: flex-start;
          justify-content: space-between;
          gap: 20px;
          margin: 9px 0 0 63px;
        }
        @media (max-width: 991px) {
          .div-21 {
            margin-left: 10px;
          }
        }
        .div-22 {
          align-self: stretch;
          display: flex;
          flex-direction: column;
        }
        .div-23 {
          justify-content: center;
          color: #000;
          text-align: center;
          align-self: stretch;
          font: 500 24px/208% Overpass Mono, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .div-24 {
          justify-content: center;
          color: #000;
          text-align: center;
          align-self: stretch;
          font: 500 24px/208% Overpass Mono, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .div-25 {
          justify-content: center;
          color: #000;
          text-align: center;
          align-self: stretch;
          font: 500 24px/208% Overpass Mono, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .div-26 {
          justify-content: center;
          color: #000;
          text-align: center;
          align-self: stretch;
          font: 500 24px/208% Overpass Mono, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .div-27 {
          justify-content: center;
          color: #000;
          text-align: center;
          align-self: stretch;
          font: 500 24px/208% Overpass Mono, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .div-28 {
          justify-content: center;
          color: #000;
          text-align: center;
          align-self: stretch;
          font: 500 24px/208% Overpass Mono, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .div-29 {
          justify-content: center;
          color: #000;
          text-align: center;
          align-self: stretch;
          font: 500 24px/208% Overpass Mono, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .div-30 {
          justify-content: center;
          color: #000;
          text-align: center;
          align-self: stretch;
          font: 500 24px/208% Overpass Mono, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .div-31 {
          justify-content: center;
          color: #000;
          text-align: center;
          align-self: stretch;
          font: 500 24px/208% Overpass Mono, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .div-32 {
          justify-content: center;
          color: #000;
          text-align: center;
          align-self: stretch;
          font: 500 24px/208% Overpass Mono, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .div-33 {
          justify-content: center;
          color: #000;
          text-align: center;
          align-self: stretch;
          font: 500 24px/208% Overpass Mono, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .div-34 {
          justify-content: center;
          color: #000;
          text-align: center;
          align-self: stretch;
          font: 500 24px/208% Overpass Mono, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .div-35 {
          justify-content: center;
          color: #000;
          text-align: center;
          align-self: stretch;
          font: 500 24px/208% Overpass Mono, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .div-36 {
          justify-content: center;
          color: #000;
          text-align: center;
          align-self: stretch;
          font: 500 24px/208% Overpass Mono, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .div-37 {
          justify-content: center;
          color: #000;
          text-align: center;
          align-self: stretch;
          font: 500 24px/208% Overpass Mono, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .div-38 {
          justify-content: center;
          color: #000;
          text-align: center;
          align-self: stretch;
          font: 500 24px/208% Overpass Mono, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .div-39 {
          justify-content: center;
          color: #000;
          text-align: center;
          align-self: stretch;
          font: 500 24px/208% Overpass Mono, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .div-40 {
          align-self: stretch;
          display: flex;
          flex-direction: column;
        }
        .div-41 {
          justify-content: center;
          color: #000;
          align-self: stretch;
          font: 500 24px/208% Overpass Mono, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .div-42 {
          align-self: stretch;
          display: flex;
          margin-top: 16px;
          padding-left: 54px;
          flex-direction: column;
        }
        @media (max-width: 991px) {
          .div-42 {
            padding-left: 20px;
          }
        }
        .div-43 {
          justify-content: center;
          color: #000;
          align-self: stretch;
          font: 500 20px/250% Overpass Mono, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .div-44 {
          justify-content: center;
          color: #000;
          align-self: stretch;
          font: 500 20px/250% Overpass Mono, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .div-45 {
          justify-content: center;
          color: #000;
          align-self: stretch;
          font: 500 20px/250% Overpass Mono, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .div-46 {
          justify-content: center;
          color: #000;
          align-self: stretch;
          font: 500 24px/208% Overpass Mono, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .div-47 {
          align-self: stretch;
          display: flex;
          margin-top: 17px;
          padding-left: 54px;
          flex-direction: column;
        }
        @media (max-width: 991px) {
          .div-47 {
            padding-left: 20px;
          }
        }
        .div-48 {
          justify-content: center;
          color: #000;
          align-self: stretch;
          font: 500 20px/250% Overpass Mono, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .div-49 {
          justify-content: center;
          color: #000;
          align-self: stretch;
          font: 500 20px/250% Overpass Mono, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .div-50 {
          justify-content: center;
          color: #000;
          align-self: stretch;
          font: 500 20px/250% Overpass Mono, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .div-51 {
          justify-content: center;
          color: #000;
          align-self: stretch;
          font: 500 24px/208% Overpass Mono, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .div-52 {
          align-self: stretch;
          display: flex;
          margin-top: 16px;
          padding-left: 54px;
          flex-direction: column;
        }
        @media (max-width: 991px) {
          .div-52 {
            padding-left: 20px;
          }
        }
        .div-53 {
          justify-content: center;
          color: #000;
          align-self: stretch;
          font: 500 20px/250% Overpass Mono, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .div-54 {
          justify-content: center;
          color: #000;
          align-self: stretch;
          font: 500 20px/250% Overpass Mono, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .div-55 {
          justify-content: center;
          color: #000;
          align-self: stretch;
          font: 500 20px/250% Overpass Mono, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .div-56 {
          justify-content: center;
          color: #000;
          align-self: stretch;
          font: 500 24px/208% Overpass Mono, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .div-57 {
          align-self: stretch;
          display: flex;
          margin-top: 16px;
          padding-left: 54px;
          flex-direction: column;
        }
        @media (max-width: 991px) {
          .div-57 {
            padding-left: 20px;
          }
        }
        .div-58 {
          justify-content: center;
          color: #000;
          align-self: stretch;
          font: 500 20px/250% Overpass Mono, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .div-59 {
          justify-content: center;
          color: #000;
          align-self: stretch;
          font: 500 20px/250% Overpass Mono, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .div-60 {
          justify-content: center;
          color: #000;
          align-self: stretch;
          font: 500 20px/250% Overpass Mono, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .div-61 {
          justify-content: center;
          color: #000;
          align-self: stretch;
          font: 500 24px/208% Overpass Mono, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .div-62 {
          cursor: pointer;
          border-radius: 35px;
          background-color: #76b947;
          align-self: center;
          display: flex;
          width: 100%;
          max-width: 1589px;
          flex-direction: column;
          margin: 47px 0 39px;
        }
        @media (max-width: 991px) {
          .div-62 {
            max-width: 100%;
            margin-top: 40px;
            padding: 0 20px;
          }
        }
        .div-63 {
          align-self: center;
          display: flex;
          max-width: 100%;
          align-items: center;
          justify-content: center;
          height: 65px;
        }
        @media (max-width: 991px) {
          .div-63 {
            flex-wrap: wrap;
          }
        }
        .div-64 {
          justify-items: center;
          align-items: center;
          display: flex;
          color: #094000;
          text-align: center;
          align-self: start;
          flex-grow: 1;
          flex-basis: auto;
          font: 500 48px/104% Overpass Mono, -apple-system, Roboto, Helvetica,
            sans-serif;
          height: 65px;
        }
        @media (max-width: 991px) {
          .div-64 {
            max-width: 100%;
            font-size: 40px;
          }
        }
        .img-4 {
          aspect-ratio: 5.36;
          object-fit: contain;
          object-position: center;
          width: 118px;
          stroke-width: 3px;
          stroke: #094000;
          overflow: hidden;
          align-self: start;
          margin-top: 11px;
          max-width: 100%;
        }
        .table {
          margin-top: 3%;
          margin-bottom: 2%;
          border: 1px solid #094000;
        }
        .table-headers {
          background-color: #76b947;
          color: #fff;
          border: 1px solid #094000;
          height: 40px;
        }
        .table-sno-header {
          width: 10%;
          border: 1px solid #094000;
        }
        .table-chapter-header {
          width: 90%;
          border: 1px solid #094000;
        }
        .table-body {
          border: 1px solid #094000;
        }
        .table-row-sno {
          text-align: center;
          border: 1px solid #094000;
        }
        .table-row-chapter {
          padding-left: 2%;
          border: 1px solid #094000;
        }
        .table-row-subsection {
          padding-left: 5%;
          border: 1px solid #094000;
        }
      `}</style>
    </>
  );
}

export default Content;
