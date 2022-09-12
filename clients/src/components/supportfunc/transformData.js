export function transformUsers(users) {
    if (!users.length) return [];
    const totalDaysInMonth = getNumberOfDaysInAMonth(users[0].Days[0].Date)
    const transformatedUsers = users.map((item) => {
        return {
            fullName: item.Fullname,
            id: item.id,
            duration: func(item.Days, totalDaysInMonth),
        }
    }).map((item) => {
        return {
            ...item,
            totalDuration: accumDuration(item.duration),
        }
    })
    console.log(transformatedUsers)

    return transformatedUsers;
}

function getNumberOfDaysInAMonth(date) {
    const currentYear = new Date(date).getFullYear();
    const currentMonth = new Date(date).getMonth();
    const currentDay = new Date(date).getDate();
    const currentDate = new Date(currentYear, currentMonth, currentDay)
    const nextDate = new Date(currentYear, currentMonth + 1, currentDay)
    return Math.round((nextDate - currentDate) / 1000 / 3600 / 24);
}

function func(days, totalDaysInMonth) {
    let arr = [];
    let j = 0;
    for (let i = 0; i < totalDaysInMonth; i++) {
        if (days[j] !== undefined && i + 1 == new Date(days[j].Date).getDate()) {
            arr.splice(i, 1, getDurationVisit(days[j].Start, days[j].End))
            j++;
        } else {
            arr.splice(i, 1, 0);
        }
    }
    return arr;
}

function getDurationVisit(start, end) {
    const arrStart = start.split("-");
    const arrEnd = end.split("-");
    const date1 = new Date(0, 0, 0, ...arrStart);
    const date2 = new Date(0, 0, 0, ...arrEnd);
    const delta = date2 - date1;
    return delta;
}

function accumDuration(arr) {
    return arr.reduce((acc, item) => acc + item, 0)
}