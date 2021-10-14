export function getDateString(date) {
  const now = new Date();
  const ret = new Date(date);
  if (
    now.getFullYear() === ret.getFullYear() &&
    now.getDate() === ret.getDate() &&
    now.getMonth() === ret.getMonth()
  ) {
    return `${ret.getHours().toString().padStart(2, '0')}:${ret
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;
  } else {
    return `${ret.getFullYear()}.${ret.getMonth() + 1}.${ret.getDate()}`;
  }
}

export function getCommentDateString(createdAt, updatedAt) {
  return !updatedAt ? getDateString(createdAt) : getDateString(updatedAt) + ' (수정됨)';
}

export const getChatDate = (date) => {
  var nowHour = date.getUTCHours();
  var nowMt = date.getUTCMinutes();
  var nowYear = date.getUTCFullYear();
  var nowMonth = date.getUTCMonth() + 1;
  var nowDate = date.getUTCDate();

  console.log(date, nowHour, nowMt);
  if (nowHour < 12 && nowHour >= 0) {
    return 'AM ' + nowHour + ':' + nowMt + ' ( ' + nowYear + '.' + nowMonth + '.' + nowDate + ' )';
  } else if (nowHour >= 12 && nowHour < 24) {
    return (
      'PM ' + (nowHour - 12) + ':' + nowMt + ' ( ' + nowYear + '.' + nowMonth + '.' + nowDate + ' )'
    );
  }
};
