import * as React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "../components/spinner";
import databaseapi from "../api/databaseapi";
import { auth } from "../firebase";
function Output() {
  const [loading, setLoading] = useState(true);
  const [chapterList, setChapterList] = useState([]);
  const [rawData, setRawData] = useState([]);
  const [completeChapterListProcessing, setCompleteChapterListProcessing] =
    useState([]);
  const [contents, setContents] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (rawData.length > 0) {
      const resp = rawData;
      var i = 0;
      var finalData = [];
      var chapData = [];
      var processingChap =
        completeChapterListProcessing.length > i
          ? completeChapterListProcessing[i].name
          : "COMP_RSANFIO_FNIECMAOOE_NO_MATHCNCEM";
      var ind = 1;
      for (var val of resp) {
        var val_arr = val.split(/[\n]+/);
        for (var subdata of val_arr) {
          console.log(
            subdata,
            processingChap,
            completeChapterListProcessing,
            subdata.toLowerCase().startsWith("chapter"),
            subdata.toLowerCase().includes(processingChap.toLowerCase())
          );
          if (
            subdata.toLowerCase().startsWith("chapter") &&
            subdata.toLowerCase().includes(processingChap.toLowerCase())
          ) {
            if (chapData && chapData.length > 0) {
              finalData.push(chapData);
            }
            chapData = [];
            chapData.push({ id: ind, type: "chapter", data: subdata });
            ind++;
            i++;
            processingChap =
              completeChapterListProcessing.length > i
                ? completeChapterListProcessing[i].name
                : "COMP_RSANFIO_FNIECMAOOE_NO_MATHCNCEM";
          } else if (
            subdata.toLowerCase().startsWith("subsection") &&
            subdata.toLowerCase().includes(processingChap.toLowerCase())
          ) {
            chapData.push({ id: ind, type: "subtitle", data: subdata });
            ind++;
            i++;
            processingChap =
              completeChapterListProcessing.length > i
                ? completeChapterListProcessing[i].name
                : "COMP_RSANFIO_FNIECMAOOE_NO_MATHCNCEM";
          } else {
            chapData.push({ id: ind, type: "data", data: subdata });
            ind++;
          }
        }
      }
      if (chapData && chapData.length > 0) {
        finalData.push(chapData);
      }
      console.log(finalData);
      setContents(finalData);
    }
  }, [chapterList, completeChapterListProcessing, rawData]);

  const getData = async () => {
    const resp = await databaseapi.get("/gen_chapters", {
      ebook_name: location.state.name,
      chap_nos: location.state.chapterNumber,
      subno: location.state.subsectionNumber,
    });
    console.log("chapters resp = ", resp);
    console.log("type = ", typeof resp);
    console.log("resp.data = ", resp.data);
    console.log("type = ", typeof resp.data);
    console.log("resp.data.data = ", resp.data.chapters);
    console.log("type = ", typeof resp.data.chapters);
    var data = resp.data.chapters;
    setRawData(data);
    setLoading(false);
  };

  useEffect(() => {
    // Load data from backend here
    setTimeout(() => {
      if (!auth.currentUser) {
        alert("You are not logged in. Please login");
        navigate("/login");
      } else {
        getData();
        var chapList = [];
        var compChapList = [];
        var prevList = location.state?.contents;
        prevList?.map((data) => {
          compChapList.push({ name: data[2], processed: false });
          if (data[1] === "chapter") {
            chapList.push(data[2]);
          }
        });
        setChapterList(chapList);
        setCompleteChapterListProcessing(compChapList);
      }
    }, 2000);
    setLoading(true);

    // setContents([
    //   [
    //     {
    //       id: "1",
    //       type: "chapter",
    //       data: "Chapter 1",
    //     },
    //     {
    //       id: "2",
    //       type: "subtitle",
    //       data: "Introduction to the chapter",
    //     },
    //     {
    //       id: "3",
    //       type: "data",
    //       data: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
    //     },
    //     {
    //       id: "4",
    //       type: "data",
    //       data: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
    //     },
    //     {
    //       id: "5",
    //       type: "subtitle",
    //       data: "Introduction to the chapter",
    //     },
    //     {
    //       id: "6",
    //       type: "data",
    //       data: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
    //     },
    //     {
    //       id: "7",
    //       type: "subtitle",
    //       data: "Introduction to the chapter",
    //     },
    //     {
    //       id: "8",
    //       type: "data",
    //       data: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
    //     },
    //   ],
    //   [
    //     {
    //       id: "1",
    //       type: "chapter",
    //       data: "Chapter 2",
    //     },
    //     {
    //       id: "2",
    //       type: "subtitle",
    //       data: "Introduction to the chapter",
    //     },
    //     {
    //       id: "3",
    //       type: "data",
    //       data: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
    //     },
    //     {
    //       id: "4",
    //       type: "data",
    //       data: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
    //     },
    //     {
    //       id: "5",
    //       type: "subtitle",
    //       data: "Introduction to the chapter",
    //     },
    //     {
    //       id: "6",
    //       type: "data",
    //       data: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
    //     },
    //     {
    //       id: "7",
    //       type: "subtitle",
    //       data: "Introduction to the chapter",
    //     },
    //     {
    //       id: "8",
    //       type: "data",
    //       data: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
    //     },
    //   ],
    // ]);
  }, []);

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
        {loading ? (
          <div>
            <Spinner />
          </div>
        ) : (
          <div className="content-container">
            <div
              className="left-banner"
              style={{ display: sidebarVisible ? "none" : "block" }}
            >
              <img
                src="./rightArrow.png"
                className="rightArrow"
                onClick={() => setSidebarVisible(true)}
              />
            </div>
            <div
              className="side-chapter-container"
              style={{ display: sidebarVisible ? "flex" : "none" }}
            >
              <div className="close-banner-button">
                <img
                  src="./rightArrow.png"
                  className="leftArrow"
                  onClick={() => setSidebarVisible(false)}
                />
              </div>
              {chapterList && chapterList.length > 0 ? (
                chapterList.map((data, index) => {
                  return (
                    <div
                      onClick={() => {
                        console.log(index);
                        setSelectedIndex(index);
                      }}
                      className="chapter-container"
                    >
                      <p className="chapter-data">{data}</p>
                    </div>
                  );
                })
              ) : (
                <div />
              )}
            </div>
            <div className="main-data-container">
              {contents && contents.length > 0 ? (
                contents[selectedIndex].map((data) => {
                  if (data.type === "chapter") {
                    return (
                      <div key={data.id} className="chapter-header">
                        <p className="chapter-title">{data.data}</p>
                      </div>
                    );
                  } else if (data.type === "subtitle") {
                    return (
                      <div key={data.id} className="subtitle-container">
                        <p className="subtitle-text">{data.data}</p>
                      </div>
                    );
                  } else {
                    return (
                      <div key={data.id} className="data-container">
                        <p className="data-text">{data.data}</p>
                      </div>
                    );
                  }
                })
              ) : (
                <div />
              )}
            </div>
          </div>
        )}
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
        }
        .div-2 {
          align-self: center;
          display: flex;
          // margin-top: 91px;
          width: 100%;
          max-width: 1762px;
          align-items: flex-start;
          justify-content: space-between;
          gap: 20px;
          padding-left: 3%;
          padding-right: 3%;
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
          max-width: 1783px;
          margin: 73px 0 0 103px;
          font: 500 64px/78% Overpass Mono, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        @media {
          .div-7 {
            max-width: 100%;
            font-size: 40px;
            margin-top: 40px;
          }
        }
        .div-8 {
          justify-content: center;
          color: #404040;
          align-self: center;
          max-width: 1659px;
          border-radius: 35px;
          background-color: #ebebeb;
          margin-top: 35px;
          width: 100%;
          padding: 22px 80px 22px 34px;
          font: 500 48px/104% Overpass Mono, -apple-system, Roboto, Helvetica,
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
          justify-content: center;
          color: #404040;
          align-self: center;
          max-width: 1659px;
          border-radius: 35px;
          background-color: #ebebeb;
          margin-top: 23px;
          width: 100%;
          padding: 22px 80px 22px 34px;
          font: 500 48px/104% Overpass Mono, -apple-system, Roboto, Helvetica,
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
          justify-content: center;
          color: #404040;
          align-self: center;
          max-width: 1659px;
          border-radius: 35px;
          background-color: #ebebeb;
          margin-top: 23px;
          width: 100%;
          padding: 22px 80px 22px 34px;
          font: 500 48px/104% Overpass Mono, -apple-system, Roboto, Helvetica,
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
          justify-content: center;
          color: #404040;
          align-self: center;
          max-width: 1659px;
          border-radius: 35px;
          background-color: #ebebeb;
          margin-top: 23px;
          width: 100%;
          padding: 22px 80px 22px 34px;
          font: 500 48px/104% Overpass Mono, -apple-system, Roboto, Helvetica,
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
          justify-content: center;
          color: #404040;
          align-self: center;
          max-width: 1659px;
          border-radius: 35px;
          background-color: #ebebeb;
          margin-top: 23px;
          width: 100%;
          padding: 22px 80px 22px 34px;
          font: 500 48px/104% Overpass Mono, -apple-system, Roboto, Helvetica,
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
          justify-content: center;
          color: #404040;
          align-self: center;
          max-width: 1659px;
          border-radius: 35px;
          background-color: #ebebeb;
          margin-top: 22px;
          width: 100%;
          padding: 21px 80px 31px 34px;
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
          margin: 63px 0 162px;
          padding: 21px 80px;
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
          margin-left: 95px;
          width: 778px;
          max-width: 100%;
          align-items: flex-start;
          justify-content: space-between;
          gap: 20px;
        }
        @media {
          .div-15 {
            flex-wrap: wrap;
          }
        }
        .div-16 {
          justify-content: center;
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
          justify-content: center;
          // align-items: center;
          border-radius: 35px;
          background-color: #ebebeb;
          display: flex;
          flex-direction: column;
          flex: 1;
          margin--top: 20px;
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
          // text-align: center;
          // align-self: center;
          margin--top: 20px;
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
        .content-container {
          margin-top: 3%;
          display: flex;
          height: 100%;
          justify-content: space-between;
        }
        .left-banner {
          width: 3%;
          height: 100%;
        }
        .rightArrow {
          width: 100%;
          height: 100%;
          cursor: pointer;
        }
        .close-banner-button {
          align-items: end;
          display: flex;
          justify-content: flex-end;
          border-bottom: 3px solid #094000;
        }
        .leftArrow {
          width: 50px;
          height: 50px;
          cursor: pointer;
        }
        .side-chapter-container {
          width: 20%;
          box-shadow: 5px 5px 5px #b1d8b7;
          z-index: 10;
          border-top-right-radius: 10px;
          border: 1px solid #094000;
          border-left: 0;
          position: absolute;
          background-color: #fff;
          flex-direction: column;
          height: 100%;
        }
        .chapter-container {
          height: 60px;
          border-bottom: 1px solid #094000;
          display: flex;
          align-items: center;
          cursor: pointer;
        }
        .chapter-container:hover {
          box-shadow: 1px 1px 10px #b1d8b7;
        }
        .chapter-data {
          padding-left: 1%;
          font-weight: bold;
          font-size: large;
        }
        .subtitle-data {
          padding-left: 8%;
          font-weight: 500;
          font-size: medium;
        }
        .main-data-container {
          width: 97%;
          background-color: #fff;
          height: 100%;
          border-top-left-radius: 20px;
          padding-left: 1%;
          padding-right: 1%;
          padding-bottom: 3%;
          overflow: scroll;
        }
        .chapter-header {
          margin-top: 2%;
          text-align: center;
        }
        .chapter-title {
          font-weight: bold;
          font-size: x-large;
        }
        .subtitle-container {
          margin-top: 2%;
        }
        .subtitle-text {
          font-weight: 500;
          font-size: large;
        }
        .data-container {
          text-align: justify;
          margin-top: 1%;
        }
        .data-text {
          font-size: medium;
        }
      `}</style>
    </>
  );
}

export default Output;
