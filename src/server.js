const express = require('express');
const server = express();
const nunjuks = require('nunjucks');

const proffys = [
    {
        name: "Diego Fernandes",
        avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4",
        whatsapp: "11947615187",
        bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
        subjectStr: "Quimica",
        cost: "20",
        weekday: [0],
        time_from: [720],
        time_to: [1200],
    },
    {
        name: "Otavio Baldan",
        avatar: "https://avatars2.githubusercontent.com/u/13969180?s=460&u=cc49b4b4987b6eee0a9b5bdecc319737ec5d646a&v=4",
        whatsapp: "11947615187",
        bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
        subjectStr: "Matemática",
        cost: "9999",
        weekday: [2],
        time_from: [0800],
        time_to: [1000],
    }
]

const subjects = [
    "Artes", 
    "Biologia",
    "Ciências",
    "Educação física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química",
]

const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
]

server.use(express.static("public"))
nunjuks.configure('src/views', {
    express: server,
    noCache: true,
})

function getSubject(index) {
    return subjects[+index-1]
}

function pageLanding(req, res) {
    return res.render('index.html');
}

function pageGiveClasses(req, res) {
    const data = req.query
    const isNotEmpty = Object.keys(data).length > 0
    if (isNotEmpty) {
        const index = data.subject
        data.subjectStr = getSubject(index)
        proffys.push(data)
        return res.redirect("/study")
    }
    return res.render('give-classes.html', { subjects, weekdays });
}

function pageStudy(req, res) {
    const filters = req.query
    return res.render('study.html', { proffys, filters, subjects, weekdays });
}

server.get("/", pageLanding);
server.get("/give-classes", pageGiveClasses)
server.get("/study", pageStudy)

server.listen(8080);