import { join } from 'path';
import { exists, writeFile, readFile } from '../util/fs.js';
import { types, getPage as _getPage } from '../util/network.js';

const CACHE = 'cache';
const DATA = 'data';

function subFolder(id) {
    id = ''+id;
    if(id.length<6)
        id = new Array(6-id.length).fill(0).join('')+id;

    return join(
        id.substring(0,id.length-4),
        id.substring(id.length-4,id.length-2)
    );
}

function extFilePath(...args) {
    const ext = args.pop();
    const baseName = args.pop();

    return join(...args.map(v=>''+v), `${baseName}.${ext}`);
}

function getCachePath(type, id, subType='default') {
    const pathType = type.replace('/','_');
    switch(type) {
        case types.BLOG:
        case types.CHARACTER:
        case types.EP:
        case types.GROUP:
        case types.GROUP_TOPIC:
        case types.INDEX:
        case types.PERSON:
        case types.SUBJECT:
        case types.SUBJECT_TOPIC:
        case types.USER:
            return extFilePath(
                CACHE,
                pathType,
                subFolder(id),
                id,
                subType,
                'html'
            );
        case types.GROUP_LIST:
        case types.INDEX_LIST:
            return extFilePath(
                CACHE,
                pathType,
                subType,
                'html'
            );
        default: return 'error_file';
    }
}

function getDataPath(type, id) {
    const pathType = type.replace('/','_');
    switch(type) {
        case types.BLOG:
        case types.CHARACTER:
        case types.EP:
        case types.GROUP:
        case types.GROUP_TOPIC:
        case types.INDEX:
        case types.PERSON:
        case types.SUBJECT:
        case types.SUBJECT_TOPIC:
        case types.USER:
            return extFilePath(
                DATA,
                pathType,
                subFolder(id),
                id,
                'json'
            );
        case types.GROUP_LIST:
        case types.INDEX_LIST:
            return extFilePath(
                DATA,
                pathType,
                'json'
            );
        default: return 'error_file';
    }
}

async function checkCache(type, id, subType='default') {
    return await exists(getCachePath(type, id, subType));
}

async function getPage(type, id, subType='default') {
    const cachePath = getCachePath(type, id, subType);
    if((await exists(cachePath))) {
        const cachePage = await readFile(cachePath, 'utf-8');
        if(cachePage) return cachePage;
    }

    const pageData = await _getPage(type, id, subType);
    if(pageData) await writeFile(cachePath, pageData);
    return pageData;
}

async function writeData(data, type, id, subType='default') {
    return await writeFile(
        getDataPath(type, id, subType),
        JSON.stringify(data)
    );
}

async function writeSpecialData(data, baseName) {
    return await writeFile(
        extFilePath(DATA, baseName, 'json'),
        JSON.stringify(data)
    );
}

async function readData(type, id, subType='default') {
    return JSON.parse(await readFile(
        getDataPath(type, id, subType),
        'utf-8'
    ));
}

export default { subFolder, extFilePath, getCachePath, getDataPath, getPage, readData, writeData, writeSpecialData, checkCache };