const express = require("express");
const cors = require("cors");
const path = require("path");
const receiveRouter = require("./routes/receive");
const app = express();

app.use(
  cors({
    origin: [
      "http://localhost",
      "http://192.168.0.5",
      "fe80::4009:75ff:fe3c:200",
      "http://192.168.219.103",
      "http://211.188.52.135",
    ],
    credentials: true,
  })
);

// 요청 크기 제한을 없애거나 매우 크게 설정
app.use(express.json({ limit: "Infinity" }));
app.use(express.urlencoded({ limit: "Infinity", extended: true }));

app.use("/receive", express.static(path.join(__dirname, "public", "datas")));

app.get("/", (req, res) => {
  res.send("server on");
});

app.use("/receive", receiveRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`server on ${port}`);
});
