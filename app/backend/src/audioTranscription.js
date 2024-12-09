import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import wav from 'wav';
import vosk from 'vosk';
import { Readable } from 'stream';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MODEL_PATH = path.resolve(__dirname, '../vosk-model-en-us-0.22');

if (!fs.existsSync(MODEL_PATH)) {
    console.error('Model not found. Please check the path.');
    process.exit(1);
}

// set to negative value to disable logs
vosk.setLogLevel(0);
const model = new vosk.Model(MODEL_PATH);

async function processAudio(filePath) {
    const resolvedFilePath = path.resolve(filePath);
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
            let result = ''

            try {
                for await (const data of wavReadable) {
                    if (recognizer.acceptWaveform(data)) {
                        let text = recognizer.result().text
                        result += text.charAt(0).toUpperCase() + text.slice(1) + ". ";
                        recognizer.reset()
                    }
                }

                let text = recognizer.finalResult().text
                result += text.charAt(0).toUpperCase() + text.slice(1) + ".";
                resolve(result);
            } catch (err) {
                reject(err);
            } finally {
                recognizer.free();
            }
        });

        // creates a read stream with maximum 4kb of data passed to the reader until it processes it
        fs.createReadStream(resolvedFilePath, { highWaterMark: 4096 }).pipe(wavReader);
    });
}

/**
 * Transcribes the audio file located at the given file path using Vosk speech recognition model
 * @param filePath The path to the audio file to be transcribed.
 * @returns {Promise<unknown>} A promise with the transcribed text or undefined if an error occurs
 */
export async function transcribeAudio(filePath) {
    try {
        return await processAudio(filePath);
    } catch (err) {
        console.error('Error during processing:', err.message);
    }
}
