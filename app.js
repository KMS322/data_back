const express = require("express");
const cors = require("cors");
const receiveRouter = require("./routes/receive")
const app = express();

app.use(
  cors({
    origin: [
      "http://localhost",  
      "http://192.168.0.5",
      "fe80::4009:75ff:fe3c:200",
      "http://192.168.192.165",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.send("server on");
});

app.use("/receive", receiveRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`server on ${port}`);
});
