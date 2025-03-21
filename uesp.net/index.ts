import express from "express";
import helmet from "helmet";
import fs from "node:fs";
import util from "node:util"
const app = express();
const port = 3000;

app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'", "'en.uesp.net'", "'en.m.uesp.net'"],
        }
    },
    crossOriginResourcePolicy: {
        policy: "cross-origin"
    },
    xDownloadOptions: false
}))

app.use(function (req, res, next) {
    console.log(`${new Date()} -- ${req.method} ${req.url} -- ${util.inspect(req.host, true, null)}`)
    res.header("Access-Control-Allow-Origin", "*");
    next()
})

app.get("/js", (_req, res) => {
    const js = fs.readFileSync("./dist/app.js", { encoding: "utf-8" })
    res.send(js)
})

app.get("/css", (_req, res) => {
    const css = fs.readFileSync("./dist/style.css", { encoding: "utf-8" })
    res.header("Content-Type", "text/css")
    res.send(css)
})

app.options("/css", (_req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Content-Length, X-Requested-With");
    res.send(200);
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})