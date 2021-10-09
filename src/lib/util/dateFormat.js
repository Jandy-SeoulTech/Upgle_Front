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
