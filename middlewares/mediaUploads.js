import multer from "multer";

const path = "uploads";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${Date.now()}-${
        file.fieldname + "." + file.originalname.split(".").pop()
      }`
    );
  },
});

export const upload = multer({ storage });
