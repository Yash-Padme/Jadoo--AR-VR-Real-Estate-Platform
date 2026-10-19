// Import the Multer library for handling `multipart/form-data`.
import multer from "multer";

// Configure disk storage for Multer.
// This specifies where uploaded files will be temporarily stored on the server.
const storage = multer.diskStorage({
  // Define the destination directory for uploaded files.
  // Files will be stored in the './public/temp' folder.
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  // Define the filename for uploaded files.
  // A unique name is generated using a timestamp and a random number to prevent collisions.
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

// Export the Multer upload middleware, configured with the defined storage.
// This middleware can be used in routes to process file uploads.
export const upload = multer({ storage: storage });
