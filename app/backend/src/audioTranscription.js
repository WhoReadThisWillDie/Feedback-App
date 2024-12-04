import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';
import wav from 'wav';
import vosk from 'vosk';
import {Readable} from 'stream';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MODEL_PATH = path.resolve(__dirname, '../vosk-model-en-us-0.22');

if (!fs.existsSync(MODEL_PATH)) {
    console.error('Model not found. Please check the path.');
    process.exit(1);
}

vosk.setLogLevel(0);
const model = new vosk.Model(MODEL_PATH);

async function processAudio(filePath) {
    const resolvedFilePath = path.resolve(filePath)
    if (!fs.existsSync(resolvedFilePath)) {
        throw Error('File not found. Please check the path.');
    }

    return new Promise((resolve, reject) => {
        const wavReader = new wav.Reader();
        const wavReadable = new Readable().wrap(wavReader);

        wavReader.on('format', async ({ audioFormat, sampleRate, channels }) => {
            if (audioFormat !== 1 || channels !== 1) {
                reject(new Error('Audio file must be WAV format mono PCM.'));
            }

            const recognizer = new vosk.Recognizer({ model, sampleRate });

            try {
                for await (const data of wavReadable) {
                    recognizer.acceptWaveform(data);
                }
                const result = recognizer.finalResult().text;
                resolve(result);
            } catch (err) {
                reject(err);
            } finally {
                recognizer.free();
            }
        });

        fs.createReadStream(resolvedFilePath, { highWaterMark: 4096 }).pipe(wavReader);
    });
}

export async function transcribeAudio(filePath) {
    try {
        return await processAudio(filePath)
    } catch (err) {
        console.error('Error during processing:', err.message);
    }
}