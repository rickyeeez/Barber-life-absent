require("dotenv").config();
const path = require("path"); // Node.js path module

const express = require("express");
const mongoose = require("mongoose");
const mongoString = process.env.DATABASE_URL;
const routes = require("./routes/routes");
mongoose.connect(mongoString);
const database = mongoose.connection;
const fs = require("fs");
database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
const dataFilePath = path.join(__dirname, "public", "data.json");
app.post("/updateData", (req, res) => {
  const newData = req.body;

  // Baca file JSON yang ada
  fs.readFile(dataFilePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error reading file" });
    }

    // Parse data JSON yang ada
    let jsonData = JSON.parse(data);

    // Periksa apakah data dengan uniq yang sama sudah ada
    const existingDataIndex = jsonData.findIndex(
      (item) => item.uniq === newData.uniq
    );
    if (existingDataIndex !== -1) {
      // Update data yang sudah ada
      jsonData[existingDataIndex] = newData;
    } else {
      // Tambahkan data baru
      jsonData.push(newData);
    }

    // Tulis kembali data ke file JSON
    fs.writeFile(
      dataFilePath,
      JSON.stringify(jsonData, null, 2),
      "utf8",
      (err) => {
        if (err) {
          return res.status(500).json({ message: "Error writing file" });
        }
        res.json({ message: "Data updated successfully" });
      }
    );
  });
});
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use("/api", routes);
app.listen(3000, () => {
  console.log(`Server Started at http://localhost:${3000}`);
});
