const { subjects, weekdays, getSubject, convertHoursToMinute } = require("./utils/format")
const Database = require("./database/db")

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

async function pageStudy(req, res) {
    const filters = req.query

    if (!filters.subject || !filters.weekday || !filters.time) {
        return res.render('study.html', { filters, subject, weekdays });
    }
    const subject = filters.subject
    const convertedTime = convertHoursToMinute(filters.time)
    const query = `
        SELECT * FROM proffys p 
            INNER JOIN classes c on p.id = c.proffy_id
        WHERE EXISTS ( 
                SELECT 1 FROM class_schedule cs 
                WHERE cs.class_id = c.id
                    AND cs.weekday = ${filters.weekday}
                    AND cs.time_from <= ${convertedTime}
                    AND cs.time_to > ${convertedTime}
            )
        AND c.subject = "${filters.subject}"
    `

    try {
        const db = await Database;
        const proffys = await db.all(query)
        proffys.map(proffy => {
            proffy.subjectStr = getSubject(proffy.subject)
        })
        return res.render('study.html', { proffys, filters, subjects, weekdays });
    } catch(error) {
        console.log(error)
    }
}

async function saveClasses(req, res) {
    const createProffy = require("./database/createProffy");
    const { name, avatar, whatsapp, bio } = req.body
    const proffyValue = {
        name,
        avatar,
        whatsapp,
        bio
    }

    const { subject, cost } = req.body
    const classValue = {
        subject,
        cost,
    }

    const classSchedules = req.body.weekday.map((weekday, index) => {
        return {
            weekday,
            time_from: convertHoursToMinute(String(req.body.time_from[index])),
            time_to: convertHoursToMinute(String(req.body.time_to[index]))
        }
    })

    try {
        const db = await Database;
        await createProffy(db, { proffyValue, classValue, classSchedules })

        let queryString = "?subject=" + req.body.subject
        queryString += "&weekday=" + req.body.weekday[0]
        queryString += "&time=" + req.body.time_from[0]

        return res.redirect("/study" + queryString)
    } catch(error) {
        console.log(error)
    }
}

module.exports = {
    pageLanding,
    pageGiveClasses,
    pageStudy,
    saveClasses
}