import multer from "multer";

//Directory to save recordings
const storage = multer.diskStorage({
    destination: './recordings/',
    filename: (req, file, cb) => cb(null, "temp.wav"),
});

export const upload = multer({storage});