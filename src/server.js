const express = require('express');
const server = express();
const nunjuks = require('nunjucks');
const { pageLanding, pageGiveClasses, pageStudy, saveClasses } = require("./pages")

server.use(express.static("public"))
nunjuks.configure('src/views', {
    express: server,
    noCache: true,
})

server.use(express.urlencoded({ extended: true}))

server.get("/", pageLanding);
server.get("/give-classes", pageGiveClasses)
server.get("/study", pageStudy)
server.post("/save-classes", saveClasses)

server.listen(8080);