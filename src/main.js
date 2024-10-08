import "./css/main.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_ARRS_REQUEST } from "./reducers/arr";
import dayjs from "dayjs";
import { WEB_URL } from "./constants";

const Main = () => {
  const [datas, setDatas] = useState();
  const dispatch = useDispatch();
  const { arrs } = useSelector((state) => state.arr);
  useEffect(() => {
    dispatch({
      type: LOAD_ARRS_REQUEST,
    });
  }, [datas]);
  const loadExcel = () => {
    dispatch({
      type: LOAD_ARRS_REQUEST,
    });

    // const filePath = `/public/datas/data_${dayjs().format("MMDD")}.xlsx`; // 파일 경로
    // fetch(filePath)
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error("Network response was not ok");
    //     }
    //     return response.blob(); // Blob 형태로 변환
    //   })
    //   .then((blob) => {
    //     const url = window.URL.createObjectURL(blob); // Blob URL 생성
    //     const a = document.createElement("a");
    //     a.href = url;
    //     a.download = `data_${dayjs().format("MMDD")}.xlsx`; // 다운로드할 파일 이름
    //     document.body.appendChild(a);
    //     a.click(); // 클릭 이벤트 발생
    //     a.remove(); // a 태그 제거
    //     window.URL.revokeObjectURL(url); // Blob URL 해제
    //   })
    //   .catch((error) => {
    //     console.error("Error downloading the file:", error);
    //   });

    const filePath = `${WEB_URL}/public/datas/data_${dayjs().format(
      "MMDD"
    )}.xlsx`; // 파일 경로
    const a = document.createElement("a");
    a.href = filePath; // 파일 경로
    a.download = `data_${dayjs().format("MMDD")}.xlsx`; // 다운로드할 파일 이름
    document.body.appendChild(a);
    a.click(); // 클릭 이벤트 발생
    a.remove(); // a 태그 제거
  };
  const showDatas = () => {
    dispatch({
      type: LOAD_ARRS_REQUEST,
    });
    setDatas(arrs);
  };
  return (
    <div className="main_container">
      <div className="btn_box">
        <button onClick={loadExcel}>데이터 다운</button>
        <button onClick={showDatas}>데이터 보기</button>
      </div>
      <div className="data_container">
        <p>데이터 갯수 : {datas?.length}</p>
        <div className="row_head row">
          <p>Time</p>
          <p>red</p>
          <p>ir</p>
          <p>HR</p>
          <p>Spo2</p>
          <p>Temp</p>
        </div>
        {datas?.map((data, index) => {
          return (
            <div className="row" key={index}>
              <p>{data.time}</p>
              <p>{data.red}</p>
              <p>{data.ir}</p>
              <p>{data.HR}</p>
              <p>{data.SPO2}</p>
              <p>{data.Temp}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Main;
