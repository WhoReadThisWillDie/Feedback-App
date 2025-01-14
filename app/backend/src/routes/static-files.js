import express from 'express';
import path from "path";
import {fileURLToPath} from "url";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.use("/recordings", express.static(path.join(__dirname, "../../recordings")));

export default router;