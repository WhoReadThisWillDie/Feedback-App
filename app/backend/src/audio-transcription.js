import {pipeline} from '@huggingface/transformers'
import fs from 'fs'
import {decode} from 'wav-decoder'
import ffmpeg from 'fluent-ffmpeg'

// Download the Whisper model (if not already downloaded)
const model = await pipeline('automatic-speech-recognition', 'distil-whisper/distil-small.en', {
    dtype: 'fp32' // calculation data type
})

/**
 * Converts an audio file to 16kHz mono format
 * @param inputFilePath path to the input audio file
 * @param outputFilePath path to the output audio file
 * @returns {Promise<unknown>} promise with the path to the output file
 */
function convertTo16KHzMono(inputFilePath, outputFilePath) {
    return new Promise((resolve, reject) => {
        ffmpeg(inputFilePath)
            .toFormat('wav')
            .audioFrequency(16000)
            .audioChannels(1)
            .output(outputFilePath)
            .on('end', () => resolve(outputFilePath))
            .on('error', (err) => reject(err))
            .run()
    })
}

/**
 * Reads and decodes a WAV file
 * @param filePath path to the WAV file
 * @returns {Promise<{channelData: *, sampleRate: *}>} Promise with the decoded WAV file data
 */
async function readWavFile(filePath) {
    const buffer = fs.readFileSync(filePath)
    const decodedWav = await decode(buffer)
    return {sampleRate: decodedWav.sampleRate, channelData: decodedWav.channelData[0]}
}

/**
 * Slices an audio file into chunks of a specified length
 * @param channelData audio file data
 * @param sampleRate sample rate of the audio file
 * @param chunkLength desired chunk length in seconds
 * @returns {*[]} array of audio chunks
 */
function sliceAudio(channelData, sampleRate, chunkLength) {
    const chunkSize = sampleRate * chunkLength
    const chunks = []
    for (let i = 0; i < channelData.length; i += chunkSize) {
        chunks.push(channelData.slice(i, i + chunkSize))
    }
    return chunks
}

/**
 * Transcribes an audio file using the Whisper model.
 * If the audio file does not match the required format, it will be automatically converted to 16kHz mono.
 * @param filePath path to the audio file
 * @returns {Promise<string>} Promise with the transcribed text
 */
export async function transcribeAudio(filePath) {
    const tempFilePath = './recordings/converted.wav'
    await convertTo16KHzMono(filePath, tempFilePath)

    const decodedData = await readWavFile(tempFilePath)
    const channelData = decodedData.channelData

    let transcriptionResult = ''
    for (const chunk of sliceAudio(channelData, 16000, 30)) {
        const result = await model(chunk)
        transcriptionResult += result.text
    }

    fs.unlink(filePath, (err) => {
        if (err) console.error('ERROR: Error deleting temp file:', err)
    })
    fs.unlink(tempFilePath, (err) => {
        if (err) console.error('ERROR: Error deleting converted temp file:', err)
    })

    return transcriptionResult.trim()
}