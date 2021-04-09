const fs = require("fs");
var path = require("path");
const twig = require("twig");
const json = require("json");

var paths = [];
function getDir(dir) {
    fs.readdirSync(dir).forEach((file) => {
        let fullPath = path.join(dir, file);
        if (fs.lstatSync(fullPath).isDirectory()) {
            getDir(fullPath);
        } else {
            paths.push(fullPath);
        }
    });
}

getDir("minecraft");
var data = fs.readFileSync("config.json");
var config = JSON.parse(data);

for (var server in config) {
    paths.forEach((file) => {
        twig.renderFile(file, config[server], (err, out) => {
            console.log(out);
        });
    });
}
