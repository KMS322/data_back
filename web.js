const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 80;

app.use(express.static(path.join(__dirname, "build")));
app.use("/images", express.static(path.join(__dirname, "public", "images")));
app.use(
  "/thumbnails",
  express.static(path.join(__dirname, "public", "thumbnails"))
);
app.use("/popups", express.static(path.join(__dirname, "public", "popups")));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
