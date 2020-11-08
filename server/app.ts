import * as express from "express";
import * as createError from "http-errors";

import * as path from "path";
import * as cookieParser from "cookie-parser";
import * as logger from "morgan";
import * as compression from "compression";

import indexRouter from "./routes/index";
import usersRouter from "./routes/users";

const amountsRouter = require("./routes/amounts");
var foodslistRouter = require("./routes/foodslist");
var recipesRouter = require("./routes/recipes");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(compression());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "../build")));

app.use("/api/amounts", amountsRouter);
app.use("/api/users", usersRouter);
app.use("/api/foodslist", foodslistRouter);
app.use("/api/recipes", recipesRouter);
app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  console.error(err);
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
