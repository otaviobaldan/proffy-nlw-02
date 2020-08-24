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

function convertHoursToMinute(time) {
    const [hours, minutes] = time.split(":")
    return Number((hours * 60)) + Number(minutes)
}

function getSubject(index) {
    return subjects[+index-1]
}

module.exports = { 
    subjects, 
    weekdays, 
    getSubject,
    convertHoursToMinute
}