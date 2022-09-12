export function getHeadTableCenter(totalDaysInMonth) {
    let headTable = [];
    for (let i = 0; i < totalDaysInMonth; i++) {
        headTable.push(i+1)
    }
    return headTable;
}