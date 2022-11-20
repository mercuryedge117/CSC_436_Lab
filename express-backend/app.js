var express = require("express");

require('dotenv').config();

var app = express();

require("./setupMongo")();

app.use(express.json());

// middleware function here to append a trace header to a request
// app.use(function (req, res, next) {
//   req.traceId = uuidv4();
//   next();
// });

app.use("/auth", require("./routes/auth"));
app.use("/todo", require("./routes/todo"));

module.exports = app;