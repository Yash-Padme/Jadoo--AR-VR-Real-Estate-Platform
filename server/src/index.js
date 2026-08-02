import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

const result = dotenv.config({
  path: "./.env",
});

// console.log(result);

const { default: connectDB } = await import("./db/index.js");
const { app, port } = await import("./app.js");

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running at: http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
