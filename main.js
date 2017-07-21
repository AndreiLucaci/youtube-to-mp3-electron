const {app, BrowserWindow} = require("electron");
const url = require("url");
const path = require("path");

let win;

function createWindow() {
    win = new BrowserWindow({width: 800, height: 600});
    win.loadURL(url.format({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file:",
        slashes: true
    }));
}

app.on("ready", createWindow);

//let parser = require("./js/youtube_url_parser.js");

//let url = "https://www.youtube.com/watch?v=72ToDilwCM8";

//let result = parser.parse(url);

//console.log(result.valid());
