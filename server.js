const express = require("express");
const multer = require('multer');
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, "MasterImage/View")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "MasterImage/View/html/index.html"));
});

const storage = multer.diskStorage({
  destination: './MasterImage/View/assets/uploads/',
  filename: (req, file, cb) => {
      cb(null,  file.originalname);
  }
});

const upload = multer({ storage });

app.post('/upload-endpoint', upload.single('image'), (req, res) => {
  if (!req.file) {
      return res.status(400).send("No file received");
  }
  
  console.log("File uploaded:", req.file.filename);
  res.status(200).send("File uploaded successfully.");
});

const PORT = 3000;
app.listen(PORT, () => console.log("Server running at http://localhost:" + PORT));