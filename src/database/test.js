const db = require('./db')
const createProffy = require("./createProffy")

db.then(async (db) => {
    proffyValue = {
        name: "Otavio Baldan",
        avatar: "https://avatars2.githubusercontent.com/u/13969180?s=460&u=cc49b4b4987b6eee0a9b5bdecc319737ec5d646a&v=4",
        whatsapp: "11947615187",
        bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
    }

    classValue = {
        subject: 02,
        cost: "9999",
    }

    classSchedules = [
        {
            weekday: 0,
            time_from: 700,
            time_to: 1200,  
        }    
        ,{
            weekday: 2,
            time_from: 800,
            time_to: 1000,  
        }
    ]

    await createProffy(db, { proffyValue, classValue, classSchedules })

    const selectedProffys = await db.all("SELECT * FROM proffys")
    // console.log(selectedProffys)

    const selectedClassesAndProffys = await db.all(`
        SELECT * FROM proffys p 
            INNER JOIN classes c on p.id = c.proffy_id
        WHERE p.id = 1
    `)
    // console.log(selectedClassesAndProffys)

    const selectedClassesSchedules = await db.all(`
        SELECT * FROM class_schedule cs 
        WHERE cs.class_id = 1
          AND cs.weekday = 0
          AND cs.time_from <= "700"
          AND cs.time_to > "700"
    `)
    console.log(selectedClassesSchedules)
})