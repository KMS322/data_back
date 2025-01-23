const express = require("express");
const router = express.Router();
const XLSX = require("xlsx");
const path = require("path");
const fs = require("fs");
const dayjs = require("dayjs");

const convertToObjects = (data) => {
  return data.map((item) => {
    const parts = item.split(", "); // 문자열을 쉼표로 분리
    const obj = {};

    parts.forEach((part) => {
      const [key, value] = part.split(" : "); // 키와 값 분리
      obj[key.trim()] = value.trim(); // 객체에 추가
    });

    return obj;
  });
};

router.post("/arrs", async (req, res, next) => {
  try {
    const dataArrs = req.body;
    console.log("dataArrs : ", dataArrs.length);

    const header = [
      "no",
      "time",
      "red",
      "ir",
      // "hr",
      // "spo2",
      // "temp",
      "createdAt",
    ];

    // 파일 경로 정의
    const currentDay = dayjs().format("MMDD");
    const filePath = path.join(
      __dirname,
      `../public/datas/data_${currentDay}.xlsx`
    );

    let existingData = [];
    if (fs.existsSync(filePath)) {
      console.log("File exists, reading existing data");

      // 파일이 존재할 경우, 기존 데이터를 읽어온다
      const workbook = XLSX.readFile(filePath);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      existingData = XLSX.utils.sheet_to_json(worksheet);
    }

    // 새로운 데이터 포맷
    const formattedData = dataArrs
      .map((item, index) => {
        if (item.red > 500) {
          return {
            no: existingData.length + index + 1, // 기존 데이터 길이를 기준으로 번호 매기기
            time: item.time,
            red: item.red,
            ir: item.ir,
            createdAt: dayjs().format("YYYYMMDD-HH:mm:ss"), // 현재 시간
          };
        }
        return null; // 조건에 맞지 않으면 null 반환
      })
      .filter((item) => item !== null);

    // 기존 데이터와 새로운 데이터를 병합
    const mergedData = existingData.concat(formattedData);

    // 워크북과 시트 생성
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(mergedData, { header });

    // 시트를 워크북에 추가
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      console.log("Directory does not exist, creating");
      fs.mkdirSync(dir, { recursive: true });
    }

    // 엑셀 파일 덮어쓰기
    XLSX.writeFile(workbook, filePath);
    console.log("Excel file updated successfully");

    res
      .status(200)
      .json({ message: "Excel file updated successfully", filePath });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.get("/load", async (req, res, next) => {
  try {
    const currentDay = dayjs().format("MMDD");
    const filePath = path.join(
      __dirname,
      `../public/datas/data_${currentDay}.xlsx`
    );

    // 파일이 존재하는지 확인
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "File not found" });
    }

    // 엑셀 파일 읽기
    const workbook = XLSX.readFile(filePath);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];

    // 데이터 추출, 헤더 제외
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    // jsonData 배열 반환
    res.status(200).json(jsonData);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.get("/down", async (req, res, next) => {
  try {
    // 성공 응답
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
