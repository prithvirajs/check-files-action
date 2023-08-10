const core = require('@actions/core');
const github = require('@actions/github');
const fs = require("fs");
const { connected } = require('process');

async function checkFileExistence(path) {
    return fs.promises.access(path, fs.constants.F_OK)
    .then(() => {
        core.info(`${path} exists`);
        return true;
    })
    .catch(() => {
        core.setFailed(`${path} does not exist`);
        return false;
    });
  }
  // create a function that checks if the file starts with a markdown header
async function checkFileStartsWithHeader(filePath) {
    return fs.promises.readFile(filePath, 'utf8')
    .then(fileContent => {

        // remove all empty lines ad the beginning of the file
        fileContent = fileContent.replace(/^\s*\n/gm, '');

        if (fileContent.startsWith('#')) {
            core.info(`File ${filePath} starts with a header`);
            return true;
        } else {
            core.setFailed(`File ${filePath} does not start with a header`);
            return false;
        }
    });
}


(async () => {
    try {
   
        checkFileExistence("README.md");
        checkFileExistence("LICENSE");
      checkFileStartsWithHeader("README.md");
        
    } catch (error) {
        core.setFailed(error.message);
    }
})();


