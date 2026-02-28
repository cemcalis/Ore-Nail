const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../data');
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

const getFilePath = (collection) => path.join(DATA_DIR, `${collection}.json`);

const readData = (collection) => {
    const filePath = getFilePath(collection);
    if (!fs.existsSync(filePath)) return [];
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(content);
    } catch (e) {
        console.error(`Error reading ${collection}:`, e);
        return [];
    }
};

const writeData = (collection, data) => {
    const filePath = getFilePath(collection);
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
        return true;
    } catch (e) {
        console.error(`Error writing ${collection}:`, e);
        return false;
    }
};

module.exports = { readData, writeData };
