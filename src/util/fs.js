/**
 * 文件操作
 */

import { readFile, writeFile as _writeFile, access, mkdir, rename } from 'fs/promises';
import { constants } from 'fs';
import { dirname } from 'path';

async function exists(path) {
    try {
        await access(path, constants.R_OK);
        return true;
    } catch(e) {
        return false;
    }
}

async function mkdirs(dirpath) {
    if((await exists(dirpath)))
        return true;
    await mkdirs(dirname(dirpath));
    try {
        return await mkdir(dirpath);
    } catch(e) {
        return true;
    }
}

async function writeFile(filePath, data) {
    await mkdirs(dirname(filePath));
    return await _writeFile(filePath, data);
}

async function moveFile(original, target) {
    await mkdirs(dirname(target));
    return await rename(original, target);
}

async function copyFile(original, target) {
    return await writeFile(
        target,
        await readFile(original)
    );
}

export { exists, mkdirs, writeFile, moveFile, copyFile, readFile };