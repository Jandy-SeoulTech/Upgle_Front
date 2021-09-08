export function getDateString(date) {
    const now = new Date();
    const ret = new Date(date);
    if (now.getFullYear() === ret.getFullYear() && now.getDate() === ret.getDate() && now.getMonth() === ret.getMonth()) {
        return `${ret.getHours()}:${ret.getMinutes()}`;
    }
    else {
        return `${ret.getFullYear()}.${ret.getMonth() + 1}.${ret.getDate()}`;
    }
};