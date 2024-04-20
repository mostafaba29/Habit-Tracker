const mongoose = require("mongoose");
const app = require("./app");

process.loadEnvFile(".env");

process.on("uncaughtException", err => {
  console.log("UNCAUGHT EXCEPTION! Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true
  })
  .then(() => console.log("Connected To The Database"));

const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
  console.log(`App Running On Port ${port} ...`);
});

process.on("unhandledRejection", err => {
  console.log("UNHANDLED REJECTION! Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on("SIGTERM", () => {
  console.log("SIGTERM RECEIVED. Shutting down gracefully");
  server.close(() => {
    console.log("Process terminated!");
  });
});
