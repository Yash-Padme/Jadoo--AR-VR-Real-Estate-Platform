import dotenv from "dotenv";


// Load environment variables before importing modules that depend on them.
const result = dotenv.config({
  path: "./.env",
});

// console.log(result);

const { default: connectDB } = await import("./db/index.js");
const { app, port } = await import("./app.js");

// Start the HTTP server only after the database connection succeeds.
connectDB()
  .then(() => {
    // Begin accepting requests on the configured port.
    app.listen(port, () => {
      console.log(`Server is running at: http://localhost:${port}`);
    });
  })
  .catch((error) => {
    // Report database connection errors instead of starting an unusable server.
    console.log(error);
  });
