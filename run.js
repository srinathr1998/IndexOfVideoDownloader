import { existsSync, mkdirSync, createWriteStream } from "node:fs";
import { default as axios } from 'axios';
import { basename } from "node:path";
import { JSDOM } from 'jsdom';
import { cwd } from "node:process"


//create  folder if it does not exist
function checkFolderInOutput(OutputDirPath) {
    if (!existsSync(OutputDirPath)) {
        mkdirSync(OutputDirPath);
    }
}

function download(url, OutputDirPath) {
    return new Promise(async (resolve, reject) => {
        const { data } = await axios.get(url, {
            responseType: "stream",
        });
        const filename = basename(url);
        // adjust this according to os, below works for windows
        const pathFile = OutputDirPath + filename;
        const fileStream = createWriteStream(pathFile);
        data.pipe(fileStream);
        fileStream.on("error", (error) => {
            console.log(error);
            reject();
        });
        fileStream.on("finish", () => {
            fileStream.close();
            console.log("download complete for :", filename);
            resolve();
        });
    });
}

async function retrieveHtml(url) {
    const { data } = await axios.get(url, {
        responseType: "document",
    });
    return data;
}


function createDownloadQueue(html, url, formats) {
    let videoLinksArr = [];
    const dom = new JSDOM(html);
    dom.window.document.querySelectorAll("a").forEach(a => {
        formats.forEach((fmt) => {
            let href = a.href;
            // If href uses relative we need to add the main url
            if (!(href.indexOf('http://') === 0 || href.indexOf('https://') === 0)) {
                href = url + "/" + href;
            }
            if (href.endsWith(fmt)) {
                videoLinksArr.push(href);
            }
        }
        );
    });
    return videoLinksArr;
}

async function processPromisesBatch(videoLinksArr, batchLimit, download, OutputDirPath) {
    const length = videoLinksArr.length;
    for (let start = 0; start < length; start += batchLimit) {
        let end = start + batchLimit > length ? length : start + batchLimit;
        await Promise.allSettled(videoLinksArr
            .slice(start, end)
            .map(
                (link) => {
                    return (
                        download(link, OutputDirPath)
                    );
                }
            )
        );
    }
}
async function run(url, folder, batchLimit, formats) {
    try {
        const htmlResponse = await retrieveHtml(url);
        const videoLinksArr = createDownloadQueue(htmlResponse, url, formats);
        const OutputDirPath = cwd() + `\\Output\\${folder}\\`;
        checkFolderInOutput(OutputDirPath);
        await processPromisesBatch(videoLinksArr, batchLimit, download, OutputDirPath);
    }
    catch (error) {
        throw error;
    }
}

export default run;

