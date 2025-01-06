import multer from "multer";

//Directory to save recordings
const storage = multer.diskStorage({
    destination: './recordings/',
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1];
        //The character ':' is not compatible with JSON, so it is replaced with '-'.
        const d = new Date().toISOString().replace(/[:.]/g, '-');
        cb(null, `${file.fieldname}-${d}.${ext}`);
    }
});

export const upload = multer({storage});