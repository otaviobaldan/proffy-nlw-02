module.exports = async function (db, { proffyValue, classValue, classSchedules }) {
    const insertedProffy = await db.run(`
        INSERT INTO proffys (
            name,
            avatar,
            whatsapp,
            bio
        ) VALUES (
            "${proffyValue.name}",
            "${proffyValue.avatar}",
            "${proffyValue.whatsapp}",
            "${proffyValue.bio}"
        );
    `)

    const proffyId = insertedProffy.lastID

    const insertedClass = await db.run(`
        INSERT INTO classes (
            subject,
            cost,
            proffy_id
        ) VALUES (
            "${classValue.subject}",
            "${classValue.cost}",
            ${proffyId}
        );
    `);

    const classId = insertedClass.lastID

    const insertedClassSchedules = classSchedules.map((classSchedule) => {
        return db.run(`
            INSERT INTO class_schedule (
                class_id,
                weekday,
                time_from,
                time_to
            ) VALUES (
                ${classId},
                ${classSchedule.weekday},
                ${classSchedule.time_from},
                ${classSchedule.time_to}
            );
        `)
    })

    await Promise.all(insertedClassSchedules)
}