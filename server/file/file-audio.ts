import type {Stats} from "node:fs";
import fileSystem from "node:fs/promises";
import path from "node:path";

import {getAudioDurationInSeconds} from "get-audio-duration";
import {Lame} from "node-lame";

import {getRandomString} from "../../www/util/string";
import {uploadFolder} from "./file-const";

type BitrateType = 8 | 16 | 24 | 32 | 40 | 48 | 56 | 64 | 80 | 96 | 112 | 128 | 144 | 160 | 192 | 224 | 256 | 320;
const bitRateList: Array<BitrateType> = [8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160, 192, 224, 256, 320];
const maxKiloBytesPerSecond: BitrateType = 128;

async function getAudioFileBitrate(fullFilePath: string): Promise<BitrateType> {
    const durationInSeconds = await getAudioDurationInSeconds(fullFilePath);
    const stats: Stats = await fileSystem.stat(fullFilePath);
    const {size: fileSize} = stats;
    const kiloBytes = fileSize / 128;

    const kiloBytesPerSecond: number = Math.ceil(Math.round(kiloBytes / durationInSeconds) / 16) * 16;

    return (
        bitRateList.find((bitRate: BitrateType): boolean => {
            return bitRate === kiloBytesPerSecond;
        }) ?? maxKiloBytesPerSecond
    );
}

// eslint-disable-next-line sonarjs/no-invariant-returns
export async function makeAudioFile(fullFilePath: string): Promise<string> {
    const audioFileName = `${getRandomString()}.mp3`;
    const outputPath = path.join(uploadFolder, audioFileName);
    const trackBitrate = await getAudioFileBitrate(fullFilePath);

    if (trackBitrate <= maxKiloBytesPerSecond) {
        await fileSystem.copyFile(fullFilePath, outputPath);

        return audioFileName;
    }

    const audioEncoder = new Lame({
        bitrate: maxKiloBytesPerSecond,
        output: outputPath,
        quality: 0,
    }).setFile(fullFilePath);

    await audioEncoder.encode().catch(console.info);

    return audioFileName;
}
