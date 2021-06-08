const express = require("express");
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use(require("./routes/router"));

app.listen(3000);

console.log("Server start on port: 3000");
