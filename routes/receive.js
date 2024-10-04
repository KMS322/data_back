const express = require("express");
const router = express.Router();
const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');
const dayjs = require("dayjs");


const convertToObjects = (data) => {
  return data.map(item => {
    const parts = item.split(', '); // 문자열을 쉼표로 분리
    const obj = {};
    
    parts.forEach(part => {
      const [key, value] = part.split(' : '); // 키와 값 분리
      obj[key.trim()] = value.trim(); // 객체에 추가
    });

    return obj;
  });
};

let dataArrs = [];
router.post("/arrs", async(req, res, next) => {
  try {
    const result = convertToObjects(req.body);
    dataArrs.push(...result);
    console.log("dataArrs.length : ", dataArrs);

    const header = ["no", "time", "red", "ir", "hr", "spo2", "createdAt"];
    
    // 데이터를 엑셀 형식으로 변환
    const formattedData = dataArrs.map((item, index) => ({
      no: index + 1,
      time: item.time,
      red: item.red,
      ir: item.ir,
      hr: item.HR,
      spo2: item.SPO2,
      createdAt: new Date().toISOString() // 현재 시간
    }));

    // 워크북과 시트 생성
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(formattedData, { header });

    // 시트를 워크북에 추가
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // 파일 경로 정의
    // const currentDay = dayjs().format("MMDDHHmm");
    const currentDay = dayjs().format("MMDD");
    const filePath = path.join(__dirname, `../public/datas/data_${currentDay}.xlsx`);

    // 엑셀 파일 저장
    XLSX.writeFile(workbook, filePath);
    res.status(200).json({ message: "Excel file created successfully", filePath });
    
  } catch(e) {
    console.error(e);
    next(e);
  }
})

router.get("/load", async(req, res, next) => {
  try {
    return res.status(200).json(dataArrs);
  } catch(e) {
    console.error(e);
    next(e);
  }
})

router.get("/down", async(req, res, next) => {
  try {


    // 성공 응답
  } catch(e) {
    console.error(e);
    next(e);
  }
})

module.exports = router;
