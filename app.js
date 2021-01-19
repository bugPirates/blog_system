const express = require("express");
const app = express();
const _PORT = 3000;
const path = require("path");
const bodyParser = require("body-parser");
const index  =require("./routes/index");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.urlencoded({ extended: true}));

app.use("/", index);

app.listen(_PORT, () => {
    console.log("Server Listening on port 3000");
})